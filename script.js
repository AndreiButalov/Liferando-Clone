let basketArray = [];

let dishSchnitzel = [
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

let dishBurger = [
    {
        'name': 'XL Burger',
        'productInfo': '',
        'price': 12.90,
        'quantity': 1
    },

    {
        'name': 'Vegi-Burger',
        'productInfo': '',
        'price': 10.90,
        'quantity': 1
    },

    {
        'name': 'Chili Cheese Burger',
        'productInfo': '',
        'price': 11.90,
        'quantity': 1
    }
];

let dishImg = [
    './img/schnipo-1837703_640.jpg',
    ''
]

loadBaskes();

function render() {
    let post = document.getElementById('post_menu');
    post.innerHTML = '';

    for (let i = 0; i < dishSchnitzel.length; i++) {
        let element = dishSchnitzel[i];
        post.innerHTML += generatePostMenu(element, i);
    }

    // for (let i = 0; i < dishBurger.length; i++) {
    //     let element = dishBurger[i];
    //     post.innerHTML += generatePostMenu(element, i);
    // }

    renderBasket();
}


function generatePostMenu(element, i) {
    return `
        <div class="dish_name">
            <div>${element['name']}</div>
            <br>
            <div>${element['price'].toFixed(2)}</div>
            <button onclick="addDish(${i})">Add</button>
        </div>
        `;
    }

    
function renderBasket() { 
    
    let basket = document.getElementById('basket');
    let totalPrice = document.getElementById('total_price');
    basket.innerHTML = '';
    totalPrice.innerHTML = 'Waren korb ist leer';
    let sum  = 0;
    let totalSum = 0;
    
    for (let i = 0; i < basketArray.length; i++) {      
        sum = basketArray[i]['price'] * basketArray[i]['quantity'];
        basket.innerHTML += generateBasket(sum, basketArray[i], i); 
        
        let value = +document.getElementById(`sum${i}`).innerText;
        totalSum += value;
        totalPrice.innerHTML = /*html*/`
            <div>${totalSum.toFixed(2)}</div>
            <button onclick="deleteAll()">Delete All</button>
            `;
    }
}


function generateBasket (sum, element, i) {
    return `
    <div class="basket_content">
        <div class="dish_basket_name">
            <div>${element['quantity']}</div>
            <div>${element['name']}</div>
            <div id="sum${i}">${sum.toFixed(2)}</div>
        </div>
        <div class="controls">
            <button onclick="plusDish(${i})">+</button>                    
            <button onclick="deleteDish(${i})">Delete</button> 
            <button onclick="minusDish(${i})">-</button> 
        </div>  
    </div>            
    `;
} 


function addDish(i) {
    // if(basketArray[i] === null) {
    //     basketArray.splice(i, 1)
    // }   
    if (basketArray.length == 0) {
        basketArray.push(dishSchnitzel[i]);
    } else {
        if (basketArray.indexOf(dishSchnitzel[i]) == -1) {
            basketArray.push(dishSchnitzel[i]);

        } else {            
            dishSchnitzel[i]['quantity']++     
        }
    }
    saveBasket();
    render();
    renderBasket();
}


function plusDish(i) {
    basketArray[i]['quantity']++     
    saveBasket();
    render();
    renderBasket();
}


function minusDish(i) {
    if (basketArray[i]['quantity'] > 1) {
        basketArray[i]['quantity']--  
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


function deleteAll() {
    localStorage.removeItem('basket')
    location.reload();
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