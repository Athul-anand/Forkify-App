class SearchView{
#parentEl=document.querySelector('.search')
timeout;
delay=500;

getQuery(){
  const query=this.#parentEl.querySelector('.search__field').value
 return query
}
#clearInput(){
    this.#parentEl.querySelector('.search__field').value='';
}


addHandlerSearch(handler){
    this.#parentEl.addEventListener('input',function(){
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function(){
        const query1 =this.getQuery();
        handler(query1);
      }.bind(this), this.delay); 
  
    }.bind(this))
}
}
export default new SearchView();  