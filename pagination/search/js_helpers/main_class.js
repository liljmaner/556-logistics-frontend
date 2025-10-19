export class main
{
   search = async () => 
   {
        try { 
            const query_params = new URLSearchParams(window.location.search)
            console.log(query_params.get('search'))
            const response = await   fetch('http://556-logistics.ru:3200/api/products/search', { // почему каллбэки? Ну я пишу на скорую руку поэтому пол кода спизжено у чатагпт ( а точнее промисы и await )
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json',
            },
            'body': JSON.stringify({
               'string': query_params.get('search')
            })})
            
            const get_products = ( await response.json() ) ['description'];
            get_products.forEach(element => {
                console.log("element",element['_id'])
                document.getElementById('products__list').insertAdjacentHTML('afterbegin',`
                    <li id=${element['_id']} class="product__element">
                        <img class="product__img" src="${element['images']['card_images'][0]['url']}">
                        <div class="products__down-div">
                            <span class="product__main-info">${element['main_info']['product_name']}</span>
                            <span class="product__down-info">${element['main_info']['type']}</span>
                            <span class="product__price-info">${element['main_info']['price'][0]['price'][0]['rub']} р.</span>
                        </div>
                     </li>
                  `)
                document.getElementById(element['_id']).addEventListener('click',  function()  
                {
                   window.location.href = `http://127.0.0.1:5500/site/pagination/product/product.html?id=${this.id}`
                })
            })
        }
        catch(err) { 
            console.error(err)
        }
        
   }
   search_btn =  async () => 
   {
      console.log(document.getElementById('search__btn'));
      document.getElementById('search__btn').addEventListener('click', () => window.location.href = `http://127.0.0.1:5500/site/pagination/search/search.html?search=${document.getElementById('search__input').value}`)
   }
   run = async () =>  {
     await this.search();
     await this.search_btn();
   }
}
