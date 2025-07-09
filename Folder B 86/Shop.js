const products = [
    { name: "White Shirt", price: 29.9 , category: "shirt" },
    { name: "Black Shirt", price: 30 , category: "shirt" },
    { name: "Blue Cap", price: 12.99 , category: "accessory" },
    { name: "Bracelet", price: 11 , category: "accessory" },
    { name: "Red Shirt", price: 20 , category: "shirt" },
    { name: "Sunglasses", price: 7 , category: "accessory" }
];
let cart = [];
const productsEl = document.getElementById("products");
const itemsCartEl = document.getElementById("items-cart");
const totalEl = document.getElementById("total");
const filterEl = document.getElementById("category-filter");

function showProducts(filtered = products) {
    productsEl.innerHTML = '';
    filtered.forEach(prod => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
        <h3>${prod.name}</h3>
        <p>R$ ${prod.price.toFixed(2)}<p/>
        <button onclick="addToCart
        ('${prod.name}', ${prod.price})">Add</button>
        `;
        productsEl.appendChild(div);
    });
}
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}
function updateCart() {
    itemsCartEl.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const li = document.createElement("li");
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        itemsCartEl.appendChild(li);    
    });
    totalEl.textContent = total.toFixed(2);
}
filterEl.addEventListener("change", () => {
    const category = filterEl.value;
    if (category === "all") {
        showProducts(products);
    } else {
        const filtered = products.filter (p => p.category === category);
        showProducts(filtered);
    }
});
showProducts();

updateCart();