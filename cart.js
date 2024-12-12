const cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart.length);

const totalItem = document.getElementById("total-item")
const subTotal = document.getElementById("subtotal")
const allTotalItem = document.getElementById("total")
const orderList = document.getElementById("order-list");
const cartNumber = document.getElementById("cart-number");
const customAlert = document.getElementById('customAlert');
const cartDiv = document.getElementById('wrapper');
const count = document.getElementById("count");

const products = [
  { id: 1, name: "Vantela", image: "shoe1.png", price: 159.00, quantity: 1 },
  { id: 2, name: "Ventela", image: "shoe2.png", price: 149.00, quantity: 1},
  { id: 3, name: "Ventela", image: "shoe3.png", price: 199.00, quantity: 1},
  { id: 4, name: "Ventela", image: "shoe4.png", price: 165.00, quantity: 1}
];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function renderProducts() {
  if (!orderList) {
    console.error("orderList element not found");
    return;
  }
  const productHtml = products.map(product => `
    <div class="order2">
      <img src="img/${product.image}" alt="Shoe Image">
      <div class="order2-details">
        <h2>${product.name}</h2><br>
        <p>Price:Rp ${product.price}</p>
      </div>
      <div class="shop">
        <div>⭐<span>4.5/5</span></div>
        <button onclick="addToCart(${product.id})">Shop Now</button>
      </div>
    </div>
  `).join('');
  orderList.innerHTML  = productHtml
}

renderProducts()
displayCart();


function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  cart.push(product);
  saveCart();
  cartNumber.innerText = cart.length;
  customAlert.classList.remove('hidden');
  customAlert.classList.add('show');
  setTimeout(() => {
    customAlert.classList.remove('show');
    setTimeout(() => customAlert.classList.add('hidden'), 500);
  }, 200);

}

function displayCart() {
  console.log("the cart is working");
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cartDiv.innerHTML = storedCart.map(item => `
    <hr class="horizontal-line">
            <div class="item-details">
                <div class="item-image">
                    <img src="img/${item.image}" alt="Vantela Republic ">
                </div>
                <div class="cart-content">
                    <div>
                        <h2>${item.name}</h2>
                        <span class="disc-btn">Disc 50%</span>
                    </div>
                     <span class="line-strike">Rp 299.990</span><br> 
                     <span class="price">Rp${item.price}</span>
                </div>
                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="btn-delete" onclick="removeFromCart(${item.id})">
                            <img src="img/deletebtn.png" alt="Decrease Quantity">
                        </button>
                        <p class="quantity">${item.quantity}</p>
                        <button class="btn-add" onclick="increaseCart(${item.id})">
                          <img src="img/addbtn.png" alt="Increase Quantity">
                        </button>
                    </div>
                    <div class="add-note">
                        <p class="note-text">Add note..</p>
                        <span class="divider">|</span>
                        <button class="btn-delete-note" onclick="decreaseCart(${item.id})">
                            <img src="img/deletebtn.png" alt="Delete Note">
                        </button>
                    </div>
                </div>
            </div>
  `).join('');
  count.innerText = storedCart.length
}

const removeFromCart = (productId) => {
  console.log("this line of code is excuting");
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart= cart.filter(item => item.id !== productId); 
    localStorage.setItem("cart", JSON.stringify(cart));
      displayCart()
    } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
}
const increaseCart = (productId) => {
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map(item => {
      if (item.id === productId) {
        item.quantity ++;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  } catch (error) {
    console.error("Error increasing the item in the cart", error);
  }
};
const decreaseCart = (productId) => {
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map(item => {
      if (item.id === productId) {
        if (item.quantity > 0) {
          item.quantity--;
        }
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  } catch (error) {
    console.error("Error decreasing the item in the cart", error);
  }
};


const orderSummary = ()=>{
  try{
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    totalItem.innerText = `${totalQuantity}`;

    const totalCost = cart.reduce((sum,item) => sum + (item.price), 0)
    subTotal.innerText = `Rp ${totalCost.toFixed(2)}`
    let disCount;
    const overRallPrice = cart.reduce((sum, order) => sum + (order.price * order.quantity),  0)
    allTotalItem.innerText = `Rp${overRallPrice}`
  }
  catch(error){
    console.error("Error in orderSummary", error)
  }
  saveCart()
  displayCart()
}
orderSummary()