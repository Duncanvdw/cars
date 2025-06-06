document.addEventListener('DOMContentLoaded', () => {
    loadJSON('https://www.carqueryapi.com/api/0.3/?cmd=getMakes&sold_in_us=1')
    .then(handleMakes);
}); 