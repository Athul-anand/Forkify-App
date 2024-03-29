import view from "./view.js";
import icons from 'url:../../img/icons.svg';

class ResultView extends view{
    _parentElement=document.querySelector('.results')
    _errorMessage='we could not find the recipe.please try again!'
    _message=''
   
    _generateMarkup(){
        console.log(this._data)
        return this._data.map(this._generateMarkupPreviw).join('')
       
    }
    _generateMarkupPreviw(result){
        const id=window.location.hash.slice(1)
        return `
        <li class="preview">
            <a class="preview__link ${result.id===id?'preview__link--active':''}" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="Test" />
                </figure>
            <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                
            </div>
            </a>
      </li> 
        `
    }
}

export default new ResultView();