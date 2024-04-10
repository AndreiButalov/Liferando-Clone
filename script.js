let basketArray = [];

let dishSchnitzel = [
    {
        'name': 'Schweineschnitzel "Jager Art"',
        'productInfo': `Großes, frisch paniertes Schweine-Schnitzel, 
                        goldgelb ausgebraten - mit unserer hausgemachten 
                        Champignonrahmsauce aus frischen Champignons (ca. 300g)`,
        'price': 18.90,
        'quantity': 1
    },

    {
        'name': 'Schweineschnitzel "Wiener Art"',
        'productInfo': `Großes, frisch paniertes Schweine-Schnitzel, 
                        goldgelb ausgebraten - mit Zitrone (ca. 300g)`,
        'price': 17.90,
        'quantity': 1
    },

    {
        'name': 'Schweineschnitzel "Pfeffer"',
        'productInfo': 'mit Pfefferrahmsauce',
        'price': 18.90,
        'quantity': 1
    },
];

let dishBurger = [   
    {
        'name': 'XL Burger',
        'productInfo': `mit 200g deutschen Premium Rindfleisch, Cheddar, 
                        Salat, Tomaten, Gurken, Zwiebeln, Haussauce, Barbecuesauce 
                        und frischem Brioche Brötchen`,
        'price': 12.90,
        'quantity': 1
    },

    {
        'name': 'Bacon-Burger',
        'productInfo': `mit 200g deutschem Premium Rindfleisch, Cheddar, 
                        Salat, Tomaten, Gurken, Zwiebeln, original Joppie Sauce, 
                        Bacon und frischem Brioche Brötchen`,
        'price': 10.90,
        'quantity': 1
    },

    {
        'name': 'Chili Cheese Burger',
        'productInfo': `mit 200g deutschem Premium Rindfleisch, 
                        Cheddar, Salat, Tomaten, Gurken, Zwiebeln, 
                        Cheese Style Sauce, Jalapenos und frischem 
                        Brioche Brötchen`,
        'price': 11.90,
        'quantity': 1
    }
];

let dishSalat = [
    {
        'name': 'Mozzarella Salat',
        'productInfo': 'mit frischen Tomaten, Basilikum und Mozzarella',
        'price': 9.50,
        'quantity': 1
    },

    {
        'name': 'Hühnerfleisch Salat',
        'productInfo': 'mit gemischtem Salat, Hühnerfleisch und frischer Paprika',
        'price': 9.00,
        'quantity': 1
    },

    {
        'name': 'Salat Caesars',
        'productInfo': 'gemischter Salat mit Putenbrust',
        'price': 9.50,
        'quantity': 1
    }
];


loadBaskes();

function render() {   
    
    renderDish(dishSalat, 'post_menu_salat');
    renderDish(dishSchnitzel, 'post_menu_schnitzel');
    renderDish(dishBurger, 'post_menu_burger');
    renderHiddenBasket();      
    renderBasket();
}

function renderDish(arr, id) {
    let post = document.getElementById(id);
    post.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        post.innerHTML += generatePostMenu(arr, element, i);
    }
}


function generatePostMenu(obj, element, i) {
    return `
        <div class="dish_name" onclick="addDish('${encodeURIComponent(JSON.stringify(obj))}', ${i})">
            <div class="product_name">${element['name']}</div>
            <div class="product_info">${element['productInfo']}</div>
            <div class="product_price">${element['price'].toFixed(2)} ${'€'}</div>            
            <button class="add_product">+</button>
        </div>
        `;
}


function renderBasket() { 

    let id = document.getElementById('sup');
    let basket = document.getElementById('basket');
    let totalPrice = document.getElementById('total_price');
    
    id.innerHTML = '';
    basket.innerHTML = '';
    totalPrice.innerHTML = 'Warenkorb ist leer';
    
    let sum = 0;
    let totalSum = 0;
    let totalQuantity = 0;
    
    for (let i = 0; i < basketArray.length; i++) {      
        sum = basketArray[i]['price'] * basketArray[i]['quantity'];
        basket.innerHTML += generateBasket(sum, basketArray[i], i); 

        let value = +document.getElementById(`sum${i}`).innerText;
        totalSum += value;
        totalPrice.innerHTML = generateDeleteAll(totalSum);
        totalQuantity += basketArray[i]['quantity'];
    }
    id.innerHTML += `${totalQuantity}`;

}

function renderHiddenBasket() {    
    let basket = document.getElementById('hidden_basket');
    let id = document.getElementById('sup_hidden');
    let totalPrice = document.getElementById('total_price_hidden');
    
    id.innerHTML = '';
    basket.innerHTML = '';
    totalPrice.innerHTML = 'Warenkorb ist leer';
    
    let sum = 0;
    let totalSum = 0;
    let totalQuantity = 0;
    
    for (let i = 0; i < basketArray.length; i++) {      
        sum = basketArray[i]['price'] * basketArray[i]['quantity'];
        basket.innerHTML += generateBasket(sum, basketArray[i], i); 

        let value = +document.getElementById(`sum${i}`).innerText;
        totalSum += value;
        totalPrice.innerHTML = generateDeleteAll(totalSum);
        totalQuantity += basketArray[i]['quantity'];
    }
    id.innerHTML += `${totalQuantity}`;
}

function generateDeleteAll(totalSum) {
    return `    
        <div class="totale_price">
            <div class="total_sum">
                <h2>Gesamtkosten:</h2>
                <div>${totalSum.toFixed(2)} ${'€'}</div>
            </div>
            <button onclick="deleteAll()">Bezahlen ${totalSum.toFixed(2)} ${'€'}</button>    
        </div>
    `;
}


function generateBasket (sum, element, i) {
    return `
    <div class="basket_content">
        <div class="dish_basket_name">
            <div class="basket_dish_name">
                <div class="quantity">${element['quantity']}</div>
                <div class="basket_name">${element['name']}</div>
            </div>
            <div id="sum${i}">${sum.toFixed(2)}</div>
        </div>
        <div class="controls">
            <div>
                <button onclick="plusDish(${i})">+</button>                    
                <button onclick="minusDish(${i})">-</button> 
            </div>
            <img class="trash" onclick="deleteDish(${i})" src="./img/trashcan-155299_640.png" alt=""> 
        </div>  
    </div>            
    `;
} 


function addDish(obj, i) {
    obj = JSON.parse(decodeURIComponent(obj));
    basketArray.push(obj[i]);
    
    const unique = basketArray.filter((obj, index) => {
        return index === basketArray.findIndex(o => obj.name === o.name);
    });
    basketArray = unique;

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
    localStorage.removeItem('basket');
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