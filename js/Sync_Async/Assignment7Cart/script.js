
const container = document.querySelector(".product-container");
const filterBtn = document.querySelector(".filterBtn");
const cartPrice = document.querySelector("#total-price");
const cartBtn = document.querySelector(".cart-btn");

const filterPrice =document.querySelector(".filterByPrice");
const filterLocation =document.querySelector(".filterByLocation");
const filterDate =document.querySelector(".filterByDate");
const resetBtn = document.querySelector(".reset-btn");

const cartItems = [];

let events = [];
fetch("http://localhost:3003/products")
  .then((response) => {
    if (!response.ok) {
      console.log("Not successfully loaded");
    }
    return response.json();
  })
  .then((data) => {
    //data from the database is now in a readble format
    // console.log(data);

    events = data;
    originalEvents = data;
    renderItems(events);
  });

function renderItems(items) {
  container.innerHTML = ""; // Clear the container before rendering items
  items.map((item) => {
    const productHTML = `
        <div class='products'>
         <img id='image' src=${item.imageUrl} />
          <p class="title">${item.title}</p>    
          <p>${item.location}</p>
          <p>${item.company}</p>
          <p class="price">$${item.price}</p>
          <button class="btnBuy" button-id="${item.id}">Buy now</button>
    </div>
        `;
    container.innerHTML += productHTML;
  });
  attachAddToCartListeners();
}

// filter on price
function filterItems() {
    const maxPrice = parseFloat(filterPrice.value) || Infinity; // Get the max price from input
    const filteredItems = events.filter((item) => item.price < maxPrice);
    renderItems(filteredItems);
    
    resetBtn.style.display="block"
}

filterBtn.addEventListener("click", () => {
  filterItems();
  
});


// Add to cart
function attachAddToCartListeners() {
  const buyBtns = document.querySelectorAll(".btnBuy");
  buyBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const btnId = event.target.getAttribute("button-id");
      const selectedItem = events.find((item) => item.id == btnId);

     
      if (selectedItem && !cartItems.some(item => item.id === selectedItem.id)) {
        cartItems.push(selectedItem);
        console.log(selectedItem);
        renderCart();

        
      } else {
        alert("Item already in cart!");
      }
    });
  });
}

// Render cart items

const cartList= document.getElementById("cart-list")
function renderCart() {
  cartList.innerHTML = ""; // Clear the cart list before rendering
  cartItems.map((item, index) => {
    cartList.innerHTML += `
        <div class='products'>
          <img id='image' src=${item.imageUrl} />
          <p class="title">${item.title}</p>    
          <p>${item.location}</p>
          <p>${item.company}</p>
          <p class="price">$${item.price}</p>
          <button class="del" data-index="${index}">Delete</button>
        </div>`;
  });
  updateCartTotal();
  // Attach delete functionality
  attachDeleteListeners();
}
function updateCartTotal() {
    const totalPrice = cartItems
      .map((item) => item.price)
      .reduce((acc, next) => acc + next, 0); // Calculate the total price
    cartPrice.textContent = `Total: $${totalPrice.toFixed(2)}`; // Display total price
  }

  //Reset filter
  resetBtn.addEventListener("click", () => {
    filterPrice.value = ""; 
    renderItems(originalEvents); 
    updateCartTotal(); 
    resetBtn.style.display ="none";
  });

// Attach delete listeners
function attachDeleteListeners() {
  const deleteBtns = document.querySelectorAll(".del");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cartItems.splice(index, 1); // Remove item from cart
      renderCart(); // Re-render cart
    });
  });
}

