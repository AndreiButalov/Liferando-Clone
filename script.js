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
    renderSchnitzel();
    renderBurger();    
    renderSalat();    
    // let post = document.getElementById('post_menu_schnitzel');
    // post.innerHTML = '';
    // for (let i = 0; i < dishSchnitzel.length; i++) {
    //     let element = dishSchnitzel[i];
    //     post.innerHTML += generatePostMenu(dishSchnitzel, element, i);
    // }
    // for (let i = 0; i < dishBurger.length; i++) {
    //     let element = dishBurger[i];
    //     post.innerHTML += generatePostMenu(dishBurger, element, i);
    // }
    
    
    renderBasket();
}

function renderSchnitzel() {
    let post = document.getElementById('post_menu_schnitzel');
    post.innerHTML = '';
    for (let i = 0; i < dishSchnitzel.length; i++) {
        let element = dishSchnitzel[i];
        post.innerHTML += generatePostMenu(dishSchnitzel, element, i);
    }
}


function renderBurger() {
    let post = document.getElementById('post_menu_burger');
    post.innerHTML = '';
    for (let i = 0; i < dishBurger.length; i++) {
        let element = dishBurger[i];
        post.innerHTML += generatePostMenu(dishBurger, element, i);
    }
}


function renderSalat() {
    let post = document.getElementById('post_menu_salat');
    post.innerHTML = '';
    for (let i = 0; i < dishSalat.length; i++) {
        let element = dishSalat[i];
        post.innerHTML += generatePostMenu(dishSalat, element, i);
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
    
    let basket = document.getElementById('basket');
    let totalPrice = document.getElementById('total_price');
    basket.innerHTML = '';
    totalPrice.innerHTML = 'Warenkorb ist leer';
    let sum  = 0;
    let totalSum = 0;
    
    for (let i = 0; i < basketArray.length; i++) {      
        sum = basketArray[i]['price'] * basketArray[i]['quantity'];
        basket.innerHTML += generateBasket(sum, basketArray[i], i); 
        
        let value = +document.getElementById(`sum${i}`).innerText;
        totalSum += value;
        totalPrice.innerHTML = generateDeleteAll(totalSum);
    }
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
    
    if (basketArray.length == 0) {
        basketArray.push(obj[i]);
    } else {
        if (basketArray.indexOf(obj[i]) == -1) {
            basketArray.push(obj[i]);
        } else {            
            obj[i]['quantity']++     
        }
    }
    saveBasket();
    render();
    renderBasket();
}


// function addDish(i) {
//     // if(basketArray[i] === null) {
//     //     basketArray.splice(i, 1)
//     // }  
    
//     if (basketArray.length == 0) {
//         basketArray.push(dishSchnitzel[i]);
//     } else {
//         if (basketArray.indexOf(dishSchnitzel[i]) == -1) {
//             basketArray.push(dishSchnitzel[i]);

//         } else {            
//             dishSchnitzel[i]['quantity']++     
//         }
//     }
//     saveBasket();
//     render();
//     renderBasket();
// }


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