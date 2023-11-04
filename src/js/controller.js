
import { async } from 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeview.js';
import searchView from './views/searchview.js'
import resultsView from './views/resultsview.js';
import paginationView from './views/paginationview.js';
import bookmarkview from './views/bookmarkview.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if(module.hot){
//   module.hot.accept();
// }

  const showRecipes=async function(){
  try{
    const id =window.location.hash.slice(1)
    console.log(id)
    if(!id) return;
    recipeView.renderspinner();
    
    resultsView.update(model.getSearchResultPage())
    bookmarkview.update(model.state.bookmarks)
    // loding recipe
    await model.loadRecipe(id)

  // rendering recipe
    recipeView.render(model.state.recipe)


  }catch(err){
  recipeView.renderError()

  }
}

const controlSearchResults =async function(query){
try{
    resultsView.renderspinner();
    
    if(!query) return;

    await model.loadSearchresult(query)
    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultPage())
    paginationView.render(model.state.search)
}catch(err){
  console.log(err)
}
}

const controlPagination=function(goto){
  resultsView.render(model.getSearchResultPage(goto))
  paginationView.render(model.state.search)
}


const controlServings=function(newServings){
  model.updateServings(newServings)
  

  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controladdBookmark=function(){

  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }else{
    
    model.deleteBookmark(model.state.recipe.id);
  }
  
    
  recipeView.update(model.state.recipe)

  bookmarkview.render(model.state.bookmarks)
}

const controlBookmarks=function(){
  bookmarkview.render(model.state.bookmarks)
}
const controlAddRecipe=async function(newRecipe){
 try{
  addRecipeView.renderspinner()
  await model.uploadRecipe(newRecipe)
  console.log(model.state.recipe)
  recipeView.render(model.state.recipe)
  addRecipeView.renderMessage()
  bookmarkview.render(model.state.bookmarks)
  window.history.pushState(null,'',`#${model.state.recipe.id}`)
  setTimeout(function(){
    addRecipeView.toggleWindow();
  },MODAL_CLOSE_SEC*1000)

 }
catch(err){
    console.error(err)
    addRecipeView.renderError(err.message)
}
}

const init=function(){
bookmarkview.addHandlerRender(controlBookmarks)
recipeView.addhandlerRender(showRecipes)
recipeView.addHandlerUpdateServings(controlServings)
recipeView.addHandlerBookmark(controladdBookmark)
searchView.addHandlerSearch(controlSearchResults)
paginationView.addhandleerClick(controlPagination)
addRecipeView._addHandlerUpload(controlAddRecipe)
}
init();

