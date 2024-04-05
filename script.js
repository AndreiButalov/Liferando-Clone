let basketArray = [];

let dish = [
    {
        'name': 'Schweineschnitzel "Jager Art"',
        'productInfo': '',
        'price': 18.90,
        'quantity': 1
    },

    {
        'name': 'Schweineschnitzel "Wiener Art"',
        'productInfo': '',
        'price': 17.90,
        'quantity': 1
    },

    {
        'name': 'Schweineschnitzel "Pfeffer"',
        'productInfo': '',
        'price': 18.90,
        'quantity': 1
    },
];

loadBaskes();

function render() {
    let post = document.getElementById("post_menu");
    post.innerHTML = '';

    for (let i = 0; i < dish.length; i++) {
        let element = dish[i];
        post.innerHTML += generatePostMenu(element, i);
    }

    renderBasket();
}


function generatePostMenu(element, i) {
    return `
        <div class="dish_name">
            <div>${element['name']}</div>
            <br>
            <div>${element['price'].toFixed(2)}</div>
            <div>${element['quantity']}</div>
            <button onclick="addDish(${i})">Add</button>
        </div>
        `;
}


function renderBasket() {

    let basket = document.getElementById('basket');
    basket.innerHTML = '';

    let totalPrice = document.getElementById('total_price');
    totalPrice.innerHTML = '';

    let result = 0;

    for (let i = 0; i < basketArray.length; i++) {

        let element = basketArray[i];       

        basket.innerHTML += /*html*/`
            <div class="basket_content">
                <div class="dish_basket_name">
                    <div>${element['quantity']}</div>
                    <div>${element['name']}</div>
                    <div>${element['price'].toFixed(2)}</div>
                </div>
                <div class="controls">                    
                    <button onclick="deleteDish(${i})">Delete</button> 
                </div>  
            </div>
            
        `;
    }

    if (result == 0) {
        totalPrice.innerHTML = 'Warenkorb ist leer';
    } else {
        totalPrice.innerHTML = /*html*/`
        <div>${result.toFixed(2)}</div>
        `;
    }
}


function addDish(i) {     

    if (basketArray.length == 0) {
        basketArray.push(dish[i]);
    } else {
        if (basketArray.indexOf(dish[i]) == -1) {
            basketArray.push(dish[i]);

        } else {            
            dish[i]['quantity']++
            // let sum = basketArray[i]['price'] 
            
            // basketArray[i]['price'] ++;
        }
    }
    saveBasket();
    render();
    renderBasket();
}


function deleteDish(i) {
    basketArray[i]['quantity'] = 1;
    basketArray.splice(i, 1);
    saveBasket()
    render();
    renderBasket();
}


function saveBasket() {
    let basketAsText = JSON.stringify(basketArray);
    localStorage.setItem('basket', basketAsText);
}


function loadBaskes() {
    let basketAsText = localStorage.getItem('basket');
    if (basketAsText) {
        basketArray = JSON.parse(basketAsText);
    }
}