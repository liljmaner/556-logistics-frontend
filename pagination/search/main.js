import {main } from './js_helpers/main_class.js';

const main_class = new main();
document.addEventListener('DOMContentLoaded', async () => {    
    document.getElementById('logo-img').addEventListener('click', () => window.location.href = 'http://556-logistics.ru/index.html')
    main_class.run();
})