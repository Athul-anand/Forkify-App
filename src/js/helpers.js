import { async } from "regenerator-runtime";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const getJSON=async function(url){
    try{
     const fetchpro=fetch(url)
    const res=await Promise.race([fetch(url),timeout(10)]) ;
    const data=await res.json();
    if(!res.ok) throw new Error(`$data.message} ${res.status}`)
    return data;
    }
    catch(err){
        throw err;
    }
}

export const sendJSON=async function(url,uploadData){
  try{
    const fetchpro=fetch(url,{
      method:'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify(uploadData)
    })
  const res=await Promise.race([fetchpro,timeout(10)]) ;
  const data=await res.json();
  if(!res.ok) throw new Error(`$data.message} ${res.status}`)
  return data;
  }
  catch(err){
      throw err;
  }
}