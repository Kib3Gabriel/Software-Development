const container = document.querySelector(".product-container");
const filterPrice = document.querySelector(".filterByPrice");
const resetBtn = document.querySelector(".reset-btn");
const filterBtn = document.querySelector(".filterBtn");
const apiBaseUrl = 'http://localhost:3003/api/events';

const createEventBtn = document.getElementById('newEvent');
const createModal = document.getElementById('createModal');
const closeCreateModal = document.getElementById('closeCreateModal');
const createEventForm = document.getElementById('createEventForm');

const updateModal = document.getElementById('updateModal');
const closeUpdateModal = document.getElementById('closeUpdateModal');
const updateEventForm = document.getElementById('updateEventForm');

const notification = document.getElementById('notification');
const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price"); // Updated element for displaying total

let events = [];
let cartItems = [];

// Functions to show/hide modals
const showModal = (modal) => {
  modal.style.display = 'flex';
};

const hideModal = (modal) => {
  modal.style.display = 'none';
};

// Function to show notifications
const showNotification = (message, isError = false) => {
  notification.textContent = message;
  notification.classList.toggle('error', isError);
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
};

// Fetch and render events
const fetchEvents = async () => {
  try {
    const response = await fetch(apiBaseUrl);
    if (!response.ok) throw new Error("Failed to load events");
    events = await response.json();
    renderItems(events);
  } catch (error) {
    showNotification(error.message || 'Failed to load events', true);
    console.error(error);
  }
};

// Render events
function renderItems(items) {
  container.innerHTML = ""; // Clear the container before rendering items

  if (items.length === 0) {
    container.innerHTML = '<p>No events available. Please add some.</p>';
    return;
  }

  items.forEach((item) => {
    const productHTML = `
      <div class='products'>
        <img id='image' src="${item.imageUrl}" alt="${item.title}" />
        <p class="title">${item.title}</p>    
        <p>${item.location}</p>
        <p>${item.company}</p>
        <p class="price">$${item.price}</p>
        <button class="btnBuy" data-id="${item.id}">Buy now</button>
        <div class="ExtraButtons">
          <button class="btnEdit" data-id="${item.id}">Edit</button>
          <button class="btnView" data-id="${item.id}">View Details</button>
          <button class="btnDelete" data-id="${item.id}">Delete</button>
        </div>
      </div>
    `;
    container.innerHTML += productHTML;
  });

  attachEventListeners();
  attachAddToCartListeners();
}

// Attach event listeners for buttons
function attachEventListeners() {
  document.querySelectorAll('.btnEdit').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      const eventToEdit = events.find(event => event.id === parseInt(id));
      fillUpdateModal(eventToEdit);
      showModal(updateModal);
    });
  });

  document.querySelectorAll('.btnDelete').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      await deleteEvent(id);
    });
  });
}

// Attach event listeners for the "Buy now" buttons
function attachAddToCartListeners() {
  const buyBtns = document.querySelectorAll(".btnBuy");
  buyBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const btnId = event.target.getAttribute("data-id");
      const selectedItem = events.find((item) => item.id == btnId);

      if (selectedItem && !cartItems.some(item => item.id === selectedItem.id)) {
        cartItems.push(selectedItem);
        console.log("Added to cart:", selectedItem);
        renderCart();
      } else {
        alert("Item already in cart!");
      }
    });
  });
}

// Create Event
createEventForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(createEventForm);
  const newEvent = {
    title: formData.get('title'),
    imageUrl: formData.get('imageUrl'),
    price: parseFloat(formData.get('price')),
    date: formData.get('date'),
    location: formData.get('location'),
    company: formData.get('company'),
  };

  try {
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    });

    if (response.ok) {
      showNotification('Event created successfully');
      fetchEvents();
      hideModal(createModal);
      createEventForm.reset();
    } else {
      const error = await response.json();
      showNotification(error.message || 'Failed to create event', true);
    }
  } catch (error) {
    showNotification('Failed to create event', true);
    console.error(error);
  }
});

// Fill Update Modal
function fillUpdateModal(event) {
  updateEventForm['title'].value = event.title;
  updateEventForm['imageUrl'].value = event.imageUrl;
  updateEventForm['price'].value = event.price;
  updateEventForm['date'].value = event.date;
  updateEventForm['location'].value = event.location;
  updateEventForm['company'].value = event.company;
  updateEventForm.dataset.id = event.id;  //event id will still remain the same
}

// Update Event
updateEventForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(updateEventForm);
  const updatedEvent = {
    title: formData.get('title'),
    imageUrl: formData.get('imageUrl'),
    price: parseFloat(formData.get('price')),
    date: formData.get('date'),
    location: formData.get('location'),
    company: formData.get('company'),
  };
  
  const eventId = updateEventForm.dataset.id;

  try {
    const response = await fetch(`${apiBaseUrl}/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent),
    });

    if (response.ok) {
      showNotification('Event updated successfully');
      fetchEvents();
      hideModal(updateModal);
      updateEventForm.reset();
    } else {
      const error = await response.json();
      showNotification(error.message || 'Failed to update event', true);
    }
  } catch (error) {
    showNotification('Failed to update event', true);
    console.error(error);
  }
});

// Delete Event
async function deleteEvent(id) {
  try {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      showNotification('Event deleted successfully');
      fetchEvents();
    } else {
      const error = await response.json();
      showNotification(error.message || 'Failed to delete event', true);
    }
  } catch (error) {
    showNotification('Failed to delete event', true);
    console.error(error);
  }
}

// Open and close modals
createEventBtn.addEventListener('click', () => {
  showModal(createModal);
});

closeCreateModal.addEventListener('click', () => {
  hideModal(createModal);
});

closeUpdateModal.addEventListener('click', () => {
  hideModal(updateModal);
});

// Filter on price
function filterItems() {
  const maxPrice = parseFloat(filterPrice.value) || Infinity;
  const filteredItems = events.filter((item) => item.price < maxPrice);
  renderItems(filteredItems);
  resetBtn.style.display = "block";
}

filterBtn.addEventListener("click", () => {
  filterItems();
});

// Render cart items
function renderCart() {
  cartList.innerHTML = ""; 
  cartItems.forEach((item, index) => {
    cartList.innerHTML += `
      <div class='products'>
        <img id='image' src="${item.imageUrl}" alt="${item.title}" />
        <p class="title">${item.title}</p>    
        <p>${item.location}</p>
        <p>${item.company}</p>
        <p class="price">$${item.price}</p>
        <button class="del" data-index="${index}">Delete</button>
      </div>`;
  });
  updateCartTotal();
  attachDeleteListeners();
}

// Update cart total
function updateCartTotal() {
  const totalPriceValue = cartItems
    .map((item) => item.price)
    .reduce((acc, next) => acc + next, 0);
  totalPrice.textContent = `Total: $${totalPriceValue.toFixed(2)}`; 
}

// Attach delete listeners for cart items
function attachDeleteListeners() {
  const deleteBtns = document.querySelectorAll(".del");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cartItems.splice(index, 1); // Remove item from cart
      renderCart();
    });
  });
}

// Reset filter
resetBtn.addEventListener("click", () => {
  filterPrice.value = ""; 
  renderItems(events); 
  updateCartTotal(); 
  resetBtn.style.display ="none";
});

// Initial Fetch
document.addEventListener('DOMContentLoaded', fetchEvents);
