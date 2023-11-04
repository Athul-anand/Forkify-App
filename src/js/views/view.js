import icons from 'url:../../img/icons.svg';

export default class view{
    _data

    render(data){
        if(!data || (Array.isArray(data) && data.length===0)) return this.renderError();
        this._data=data;
        const markups=this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markups)

    }
    _clear(){
        this._parentElement.innerHTML='';
    }
    update(data){
        this._data=data;
        const newMarkups=this._generateMarkup();
        const newDom=document.createRange().createContextualFragment(newMarkups);
        const newElements= Array.from(newDom.querySelectorAll('*'))
        const currentElements=Array.from(this._parentElement.querySelectorAll('*'))

        //update part in dom
        newElements.forEach((newEl,i)=>{
            const curEl=currentElements[i];
           
            //update the text
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim()!==''){
                curEl.textContent=newEl.textContent
            }
            //update the attribute
            if(!newEl.isEqualNode(curEl)){
                
                Array.from(newEl.attributes).forEach(attr=>
                    curEl.setAttribute(attr.name,attr.value)
                    )
            }
        })
    }

     renderspinner(){
        const markup=`
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div> 
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
      }

      renderError(message=this._errorMessage){
        const markups=`
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markups)
      }

      renderMessage(message=this._message){
        const markups=`
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markups)
      }
}