import view from "./view.js";
import icons from 'url:../../img/icons.svg';

class Pagination extends view{
    _parentElement=document.querySelector('.pagination')


    addhandleerClick(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn=e.target.closest('.btn--inline')
            if(!btn) return;
            const goto=+btn.dataset.goto;
            handler(goto)
        })
    }

    _generateMarkup(){
        const currentpage=this._data.page;
        const numpages=Math.ceil(this._data.results.length/this._data.resultsPerPage);
      

        if(currentpage===1 && numpages>1){
            return `
            <button data-goto="${currentpage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentpage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
            `
        }
        if(currentpage===numpages && numpages>1){
            return `
            <button data-goto="${currentpage-1}"  class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentpage-1}</span>
            </button>
            `
        }
        if(currentpage<numpages){
            return `
            <button data-goto="${currentpage-1}"  class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentpage-1}</span>
            </button>
            <button data-goto="${currentpage+1}"  class="btn--inline pagination__btn--next">
            <span>Page ${currentpage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
            `
        }
        return '' //no other pages only one
    }
}

export default new Pagination();