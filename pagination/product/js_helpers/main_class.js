export class main
{
   constructor(get_product) 
   {
      this.product = get_product
      this.popup__bg = document.querySelector('.popup__bg'); 
      this.popup = document.querySelector('.popup'); 
      this.open__popup_btn = document.querySelectorAll('.product__buy-btn'); 
      this.close_popup_button = document.querySelector('.close__popup'); 
   }
   get_product = async () => 
   {
        try {
            console.log(this.product)
            document.getElementById('product__images').insertAdjacentHTML('afterbegin', `
                    <img  src="${this.product['images']['main_images'][1]['url']}" class="product__main-image" />
                `)
            document.getElementById('product__name').textContent = this.product['main_info']['product_name']
            document.getElementById('product__price').textContent = this.product['main_info']['price'][0]['price'][0]['rub'] + '  рублей'
            this.product['selectors']['0']['choose'].forEach( ( size_selector,selector_index  ) => {
                 console.log(size_selector)
                 document.getElementById('product__size__select').insertAdjacentHTML(`afterbegin`, 
                    `
                      <option value="${size_selector['choose_name']}" id="${selector_index}">${size_selector['choose_name']}</option>
                    `
                 )
            });
        }
        catch(err) { 
            console.error(err)
        }
        
   }
   selector_change = async () => 
   {
        const size_selector = document.getElementById('product__size__select')
        const product = this.product;
        document.getElementById('product__size__select').addEventListener('change', function(event) 
        {
          document.getElementById('product__price').textContent = product['main_info']['price'][size_selector.options[size_selector.selectedIndex].id]['price'][0]['rub'] + '  рублей'
        })
   }
   open_popup = async () => 
   {
        this.open__popup_btn.forEach((button) => { 
        button.addEventListener('click', (e) => { 
            e.preventDefault(); 
            this.popup__bg.classList.add('active');
            this.popup.classList.add('active'); 
           })
        });
   }
   close_popup = async () => 
   {
     this.close_popup_button.addEventListener('click',() => { // Вешаем обработчик на крестик
            this.popup__bg.classList.remove('active'); 
            this.popup.classList.remove('active'); 
     });
     document.addEventListener('click', (e) => { 
     if(e.target === this.popup__bg) {
            this.popup__bg.classList.remove('active'); 
            this.popup.classList.remove('active'); 
        }
     });
   }
   is_sneakers = async () => 
   {
      if (this.product['main_info']['type'] == 'sneakers')
      {
          document.getElementById('inputs__write').insertAdjacentHTML('afterbegin', ` 
                        <div class="input__write">
                            <span class="product__select-info">Insole Size</span>
                            <input id="insole__size__input" type="number" placeholder="Write your insole size" class="product__input" />
                        </div>
            `)
      }
      else
      {
          document.getElementById('inputs__write').insertAdjacentHTML('afterbegin', ` 
                        <div class="input__write">
                            <span class="product__select-info">Weight</span>
                            <input id="insole__size__input" type="number" placeholder="Write your weight here" class="product__input" />
                        </div>
                        <div class="input__write">
                            <span class="product__select-info">Height</span>
                            <input id="insole__size__input" type="number" placeholder="Write your height here" class="product__input" />
                       </div>
            `)
      }
   }
   run = async () =>  {
     await this.get_product();
     await this.selector_change();
     await this.open_popup();
     await this.close_popup();
     await this.is_sneakers();
   }
}
