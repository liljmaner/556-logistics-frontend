import {main } from './js_helpers/main_class.js';

document.addEventListener('DOMContentLoaded', async () => {    
    document.getElementById('logo-img').addEventListener('click', () => window.location.href = 'http://556-logistics.ru/index.html')
    const query_params = new URLSearchParams(window.location.search)
    console.log(query_params.get('id'))
    const response = await   fetch('http://556-logistics.ru:3200/api/products/get_by_id', { 
            'method': 'POST',
            'headers': {
              'Content-Type': 'application/json',
    },
    'body': JSON.stringify({
               'id': query_params.get('id')
    })})
    const get_product = ( await response.json() ) ['description']
    const main_class = new main(get_product);
    main_class.run(get_product);

})