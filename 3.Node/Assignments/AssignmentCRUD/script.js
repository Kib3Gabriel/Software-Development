// const container = document.querySelector(".product-container");
// const filterBtn = document.querySelector(".filterBtn");
// const cartPrice = document.querySelector("#total-price");
// const cartBtn = document.querySelector(".cart-btn");

// const filterPrice = document.querySelector(".filterByPrice");
// const filterLocation = document.querySelector(".filterByLocation");
// const filterDate = document.querySelector(".filterByDate");
// const resetBtn = document.querySelector(".reset-btn");




// const apiBaseUrl = 'http://localhost:3003/api/events'; // Define the API base URL

// const createEventBtn = document.getElementById('newEvent');
// const createModal = document.getElementById('createModal');
// const closeCreateModal = document.getElementById('closeCreateModal');
// const createEventForm = document.getElementById('createEventForm');

// const updateModal = document.getElementById('updateModal');
// const closeUpdateModal = document.getElementById('closeUpdateModal');
// const updateEventForm = document.getElementById('updateEventForm');

// const notification = document.getElementById('notification');
// // const container = document.getElementById('eventsContainer'); // Ensure this is defined
// const cartItems = [];

// // Functions to show/hide modals
// const showModal = (modal) => {
//   modal.style.display = 'flex';
// };

// const hideModal = (modal) => {
//   modal.style.display = 'none';
// };

// // Function to show notifications
// const showNotification = (message, isError = false) => {
//   notification.textContent = message;
//   notification.classList.toggle('error', isError);
//   notification.style.display = 'block';
//   setTimeout(() => {
//     notification.style.display = 'none';
//   }, 3000);
// };

// let events = [];
// const fetchEvents = async () => {
//   try {
//     const response = await fetch(apiBaseUrl);
//     if (!response.ok) throw new Error("Failed to load events");
//     events = await response.json();
//     renderItems(events);
//   } catch (error) {
//     showNotification(error.message || 'Failed to load events', true);
//     console.error(error);
//   }
// };

// // Render events
// function renderItems(items) {
//   container.innerHTML = ""; // Clear the container before rendering items

//   if (items.length === 0) {
//     container.innerHTML = '<p>No events available. Please add some.</p>';
//     return;
//   }

//   items.forEach((item) => {
//     const productHTML = `
//       <div class='products'>
//         <img id='image' src="${item.imageUrl}" alt="${item.title}" />
//         <p class="title">${item.title}</p>    
//         <p>${item.location}</p>
//         <p>${item.company}</p>
//         <p class="price">$${item.price}</p>
//         <button class="btnBuy" data-id="${item.id}">Buy now</button>
      
//       <div class="ExtraButtons">
//         <button class="btnEdit" data-id="${item.id}">Edit</button>
//         <button class="btnView" data-id="${item.id}">View Details</button>
//         <button class="btnDelete" data-id="${item.id}">Delete</button>
//       </div>
//       </div>
//       `;
//     container.innerHTML += productHTML;
//   });

//   attachAddToCartListeners();
// }

// // Handle Create Event
// createEventForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const formData = new FormData(createEventForm);
//   const newEvent = {
//     title: formData.get('title'),
//     imageUrl: formData.get('imageUrl'),
//     price: parseFloat(formData.get('price')),
//     date: formData.get('date'),
//     location: formData.get('location'),
//     company: formData.get('company'),
//   };

//   try {
//     const response = await fetch(apiBaseUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newEvent),
//     });

//     if (response.ok) {
//       const createdEvent = await response.json();
//       showNotification('Event created successfully');
//       fetchEvents();
//       hideModal(createModal);
//       createEventForm.reset();
//     } else {
//       const error = await response.json();
//       showNotification(error.message || 'Failed to create event', true);
//     }
//   } catch (error) {
//     showNotification('Failed to create event', true);
//     console.error(error);
//   }
// });

// // Open Create Modal
// createEventBtn.addEventListener('click', () => {
//   showModal(createModal);
// });

// // Close Create Modal
// closeCreateModal.addEventListener('click', () => {
//   hideModal(createModal);
// });

// // Handle Update Event
// container.addEventListener('click', async (e) => {
//   if (e.target.classList.contains('btnEdit')) {
//     const eventId = e.target.dataset.id;
//     try {
//       const response = await fetch(`${apiBaseUrl}/${eventId}`);
//       if (response.ok) {
//         const event = await response.json();
//         populateUpdateForm(event);
//         showModal(updateModal);
//       } else {
//         showNotification('Event not found', true);
//       }
//     } catch (error) {
//       showNotification('Failed to fetch event details', true);
//       console.error(error);
//     }
//   }

//   if (e.target.classList.contains('btnDelete')) {
//     const eventId = e.target.dataset.id;
//     if (confirm('Are you sure you want to delete this event?')) {
//       deleteEvent(eventId);
//     }
//   }

//   if (e.target.classList.contains('btnView')) {
//     const eventId = e.target.dataset.id;
//     try {
//       const response = await fetch(`${apiBaseUrl}/${eventId}`);
//       if (response.ok) {
//         const event = await response.json();
//         showEventDetails(event);
//       } else {
//         showNotification('Event not found', true);
//       }
//     } catch (error) {
//       showNotification('Failed to fetch event details', true);
//       console.error(error);
//     }
//   }
// });

// // Populate Update Form
// const populateUpdateForm = (event) => {
//   updateEventForm.updateId.value = event.id;
//   updateEventForm.updateTitle.value = event.title;
//   updateEventForm.updateImageUrl.value = event.imageUrl;
//   updateEventForm.updatePrice.value = event.price;
//   updateEventForm.updateDate.value = event.date.split('T')[0];
//   updateEventForm.updateLocation.value = event.location;
//   updateEventForm.updateCompany.value = event.company;
// };

// // Handle Update Form Submission
// updateEventForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const formData = new FormData(updateEventForm);
//   const eventId = formData.get('updateId'); // Corrected the ID extraction
//   const updatedEvent = {
//     title: formData.get('updateTitle'),
//     imageUrl: formData.get('updateImageUrl'),
//     price: parseFloat(formData.get('updatePrice')),
//     date: formData.get('updateDate'),
//     location: formData.get('updateLocation'),
//     company: formData.get('updateCompany'),
//   };

//   try {
//     const response = await fetch(`${apiBaseUrl}/${eventId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedEvent),
//     });

//     if (response.ok) {
//       showNotification('Event updated successfully');
//       fetchEvents();
//       hideModal(updateModal);
//       updateEventForm.reset();
//     } else {
//       const error = await response.json();
//       showNotification(error.message || 'Failed to update event', true);
//     }
//   } catch (error) {
//     showNotification('Failed to update event', true);
//     console.error(error);
//   }
// });

// // Close Update Modal
// closeUpdateModal.addEventListener('click', () => {
//   hideModal(updateModal);
// });

// // Handle Delete Event
// const deleteEvent = async (id) => {
//   try {
//     const response = await fetch(`${apiBaseUrl}/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       showNotification('Event deleted successfully');
//       fetchEvents();
//     } else {
//       const error = await response.json();
//       showNotification(error.message || 'Failed to delete event', true);
//     }
//   } catch (error) {
//     showNotification('Failed to delete event', true);
//     console.error(error);
//   }
// };

// // Initial Fetch
// document.addEventListener('DOMContentLoaded', fetchEvents);

// // Close Modals on outside click
// window.addEventListener('click', (e) => {
//   if (e.target === createModal) {
//     hideModal(createModal);
//   }
//   if (e.target === updateModal) {
//     hideModal(updateModal);
//   }
// });

// // Elements for the view details modal
// const viewModal = document.getElementById('viewModal');
// const closeViewModal = document.getElementById('closeViewModal');

// // Function to show event details
// const showEventDetails = (event) => {
//   document.getElementById('viewTitle').textContent = event.title;
//   document.getElementById('viewPrice').textContent = `$${event.price}`;
//   document.getElementById('viewDate').textContent = new Date(event.date).toLocaleDateString();
//   document.getElementById('viewLocation').textContent = event.location;
//   document.getElementById('viewCompany').textContent = event.company;
//   document.getElementById('viewImageUrl').src = event.imageUrl;
//   showModal(viewModal);
// };

// // Close View Modal
// closeViewModal.addEventListener('click', () => {
//   hideModal(viewModal);
// });

// // Hide viewModal if clicked outside of it
// window.addEventListener('click', (e) => {
//   if (e.target === viewModal) {
//     hideModal(viewModal);
//   }
// });








// // filter on price
// function filterItems() {
//   const maxPrice = parseFloat(filterPrice.value) || Infinity; // Get the max price from input
//   const filteredItems = events.filter((item) => item.price < maxPrice);
//   renderItems(filteredItems);

//   resetBtn.style.display = "block"
// }

// filterBtn.addEventListener("click", () => {
//   filterItems();

// });


// // Add to cart
// function attachAddToCartListeners() {
//   const buyBtns = document.querySelectorAll(".btnBuy");
//   buyBtns.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//       const btnId = event.target.getAttribute("button-id");
//       const selectedItem = events.find((item) => item.id == btnId);


//       if (selectedItem && !cartItems.some(item => item.id === selectedItem.id)) {
//         cartItems.push(selectedItem);
//         console.log(selectedItem);
//         renderCart();


//       } else {
//         alert("Item already in cart!");
//       }
//     });
//   });
// }

// // Render cart items

// const cartList = document.getElementById("cart-list")
// function renderCart() {
//   cartList.innerHTML = ""; // Clear the cart list before rendering
//   cartItems.map((item, index) => {
//     cartList.innerHTML += `
//         <div class='products'>
//           <img id='image' src=${item.imageUrl} />
//           <p class="title">${item.title}</p>    
//           <p>${item.location}</p>
//           <p>${item.company}</p>
//           <p class="price">$${item.price}</p>
//           <button class="del" data-index="${index}">Delete</button>
//         </div>`;
//   });
//   updateCartTotal();
//   // Attach delete functionality
//   attachDeleteListeners();
// }
// function updateCartTotal() {
//   const totalPrice = cartItems
//     .map((item) => item.price)
//     .reduce((acc, next) => acc + next, 0); // Calculate the total price
//   cartPrice.textContent = `Total: $${totalPrice.toFixed(2)}`; // Display total price
// }

// //Reset filter
// resetBtn.addEventListener("click", () => {
//   filterPrice.value = "";
//   renderItems(originalEvents);
//   updateCartTotal();
//   resetBtn.style.display = "none";
// });

// // Attach delete listeners
// function attachDeleteListeners() {
//   const deleteBtns = document.querySelectorAll(".del");
//   deleteBtns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       const index = e.target.getAttribute("data-index");
//       cartItems.splice(index, 1); // Remove item from cart
//       renderCart(); // Re-render cart
//     });
//   });
// }


const container = document.querySelector(".product-container");
const filterPrice = document.querySelector(".filterByPrice");
const resetBtn = document.querySelector(".reset-btn");
const apiBaseUrl = 'http://localhost:3003/api/events';

const createEventBtn = document.getElementById('newEvent');
const createModal = document.getElementById('createModal');
const closeCreateModal = document.getElementById('closeCreateModal');
const createEventForm = document.getElementById('createEventForm');

const updateModal = document.getElementById('updateModal');
const closeUpdateModal = document.getElementById('closeUpdateModal');
const updateEventForm = document.getElementById('updateEventForm');

const notification = document.getElementById('notification');

let events = [];

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
  updateEventForm.dataset.id = event.id; // Store the ID for updating
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
  
  const eventId = updateEventForm.dataset.id; // Get the ID for updating

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

// Open Create Modal
createEventBtn.addEventListener('click', () => {
  showModal(createModal);
});

// Close Create Modal
closeCreateModal.addEventListener('click', () => {
  hideModal(createModal);
});

// Close Update Modal
closeUpdateModal.addEventListener('click', () => {
  hideModal(updateModal);
});

// Initial Fetch
document.addEventListener('DOMContentLoaded', fetchEvents);

// Other functionalities for filtering...



////working filter=price


// const container = document.querySelector(".product-container");
// const filterBtn = document.querySelector(".filterBtn");
// const cartPrice = document.querySelector("#total-price");
// const cartBtn = document.querySelector(".cart-btn");

// const filterPrice = document.querySelector(".filterByPrice");
// const resetBtn = document.querySelector(".reset-btn");

// const apiBaseUrl = 'http://localhost:3003/api/events'; // Define the API base URL

// const createEventBtn = document.getElementById('newEvent');
// const createModal = document.getElementById('createModal');
// const closeCreateModal = document.getElementById('closeCreateModal');
// const createEventForm = document.getElementById('createEventForm');

// const updateModal = document.getElementById('updateModal');
// const closeUpdateModal = document.getElementById('closeUpdateModal');
// const updateEventForm = document.getElementById('updateEventForm');

// const notification = document.getElementById('notification');
// const cartItems = [];

// // Functions to show/hide modals
// const showModal = (modal) => {
//   modal.style.display = 'flex';
// };

// const hideModal = (modal) => {
//   modal.style.display = 'none';
// };

// // Function to show notifications
// const showNotification = (message, isError = false) => {
//   notification.textContent = message;
//   notification.classList.toggle('error', isError);
//   notification.style.display = 'block';
//   setTimeout(() => {
//     notification.style.display = 'none';
//   }, 3000);
// };

// let events = [];
// const fetchEvents = async () => {
//   try {
//     const response = await fetch(apiBaseUrl);
//     if (!response.ok) throw new Error("Failed to load events");
//     events = await response.json();
//     renderItems(events);
//   } catch (error) {
//     showNotification(error.message || 'Failed to load events', true);
//     console.error(error);
//   }
// };

// // Render events
// function renderItems(items) {
//   container.innerHTML = ""; // Clear the container before rendering items

//   if (items.length === 0) {
//     container.innerHTML = '<p>No events available. Please add some.</p>';
//     return;
//   }

//   items.forEach((item) => {
//     const productHTML = `
//       <div class='products'>
//         <img id='image' src="${item.imageUrl}" alt="${item.title}" />
//         <p class="title">${item.title}</p>    
//         <p>${item.location}</p>
//         <p>${item.company}</p>
//         <p class="price">$${item.price}</p>
//         <button class="btnBuy" data-id="${item.id}">Buy now</button>
//         <div class="ExtraButtons">
//           <button class="btnEdit" data-id="${item.id}">Edit</button>
//           <button class="btnView" data-id="${item.id}">View Details</button>
//           <button class="btnDelete" data-id="${item.id}">Delete</button>
//         </div>
//       </div>
//     `;
//     container.innerHTML += productHTML;
//   });

//   attachAddToCartListeners();
// }

// // Handle Create Event
// createEventForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const formData = new FormData(createEventForm);
//   const newEvent = {
//     title: formData.get('title'),
//     imageUrl: formData.get('imageUrl'),
//     price: parseFloat(formData.get('price')),
//     date: formData.get('date'),
//     location: formData.get('location'),
//     company: formData.get('company'),
//   };

//   try {
//     const response = await fetch(apiBaseUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newEvent),
//     });

//     if (response.ok) {
//       const createdEvent = await response.json();
//       showNotification('Event created successfully');
//       fetchEvents();
//       hideModal(createModal);
//       createEventForm.reset();
//     } else {
//       const error = await response.json();
//       showNotification(error.message || 'Failed to create event', true);
//     }
//   } catch (error) {
//     showNotification('Failed to create event', true);
//     console.error(error);
//   }
// });

// // Open Create Modal
// createEventBtn.addEventListener('click', () => {
//   showModal(createModal);
// });

// // Close Create Modal
// closeCreateModal.addEventListener('click', () => {
//   hideModal(createModal);
// });

// // Handle Update Event
// container.addEventListener('click', async (e) => {
//   if (e.target.classList.contains('btnEdit')) {
//     const eventId = e.target.dataset.id;
//     try {
//       const response = await fetch(`${apiBaseUrl}/${eventId}`);
//       if (response.ok) {
//         const event = await response.json();
//         populateUpdateForm(event);
//         showModal(updateModal);
//       } else {
//         showNotification('Event not found', true);
//       }
//     } catch (error) {
//       showNotification('Failed to fetch event details', true);
//       console.error(error);
//     }
//   }

//   if (e.target.classList.contains('btnDelete')) {
//     const eventId = e.target.dataset.id;
//     if (confirm('Are you sure you want to delete this event?')) {
//       deleteEvent(eventId);
//     }
//   }

//   if (e.target.classList.contains('btnView')) {
//     const eventId = e.target.dataset.id;
//     try {
//       const response = await fetch(`${apiBaseUrl}/${eventId}`);
//       if (response.ok) {
//         const event = await response.json();
//         showEventDetails(event);
//       } else {
//         showNotification('Event not found', true);
//       }
//     } catch (error) {
//       showNotification('Failed to fetch event details', true);
//       console.error(error);
//     }
//   }
// });

// // Populate Update Form
// const populateUpdateForm = (event) => {
//   updateEventForm.updateId.value = event.id;
//   updateEventForm.updateTitle.value = event.title;
//   updateEventForm.updateImageUrl.value = event.imageUrl;
//   updateEventForm.updatePrice.value = event.price;
//   updateEventForm.updateDate.value = event.date.split('T')[0];
//   updateEventForm.updateLocation.value = event.location;
//   updateEventForm.updateCompany.value = event.company;
// };

// // Handle Update Form Submission
// updateEventForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const formData = new FormData(updateEventForm);
//   const eventId = formData.get('updateId'); // Corrected the ID extraction
//   const updatedEvent = {
//     title: formData.get('updateTitle'),
//     imageUrl: formData.get('updateImageUrl'),
//     price: parseFloat(formData.get('updatePrice')),
//     date: formData.get('updateDate'),
//     location: formData.get('updateLocation'),
//     company: formData.get('updateCompany'),
//   };

//   try {
//     const response = await fetch(`${apiBaseUrl}/${eventId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedEvent),
//     });

//     if (response.ok) {
//       showNotification('Event updated successfully');
//       fetchEvents();
//       hideModal(updateModal);
//       updateEventForm.reset();
//     } else {
//       const error = await response.json();
//       showNotification(error.message || 'Failed to update event', true);
//     }
//   } catch (error) {
//     showNotification('Failed to update event', true);
//     console.error(error);
//   }
// });

// // Close Update Modal
// closeUpdateModal.addEventListener('click', () => {
//   hideModal(updateModal);
// });

// // Handle Delete Event
// const deleteEvent = async (id) => {
//   try {
//     const response = await fetch(`${apiBaseUrl}/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       showNotification('Event deleted successfully');
//       fetchEvents();
//     } else {
//       const error = await response.json();
//       showNotification(error.message || 'Failed to delete event', true);
//     }
//   } catch (error) {
//     showNotification('Failed to delete event', true);
//     console.error(error);
//   }
// };

// // Initial Fetch
// document.addEventListener('DOMContentLoaded', fetchEvents);

// // Close Modals on outside click
// window.addEventListener('click', (e) => {
//   if (e.target === createModal) {
//     hideModal(createModal);
//   }
//   if (e.target === updateModal) {
//     hideModal(updateModal);
//   }
// });

// // Elements for the view details modal
// const viewModal = document.getElementById('viewModal');
// const closeViewModal = document.getElementById('closeViewModal');

// // Function to show event details
// const showEventDetails = (event) => {
//   document.getElementById('viewTitle').textContent = event.title;
//   document.getElementById('viewPrice').textContent = `$${event.price}`;
//   document.getElementById('viewDate').textContent = new Date(event.date).toLocaleDateString();
//   document.getElementById('viewLocation').textContent = event.location;
//   document.getElementById('viewCompany').textContent = event.company;
//   document.getElementById('viewImageUrl').src = event.imageUrl;
//   showModal(viewModal);
// };

// // Close View Modal
// closeViewModal.addEventListener('click', () => {
//   hideModal(viewModal);
// });

// // Hide viewModal if clicked outside of it
// window.addEventListener('click', (event) => {
//   if (event.target === viewModal) {
//     hideModal(viewModal);
//   }
// });

// // Add to Cart
// const attachAddToCartListeners = () => {
//   const buyButtons = document.querySelectorAll('.btnBuy');
//   buyButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//       const productId = button.getAttribute('data-id');
//       const event = events.find(event => event.id == productId);
//       cartItems.push(event);
//       showNotification(`${event.title} has been added to the cart!`);
//       updateCartPrice();
//     });
//   });
// };

// // Update Cart Price
// const updateCartPrice = () => {
//   const total = cartItems.reduce((sum, item) => sum + item.price, 0);
//   cartPrice.textContent = `Total: $${total.toFixed(2)}`;
// };

// // Filter Events by Price
// filterBtn.addEventListener('click', () => {
//   const price = parseFloat(filterPrice.value); // Parse the value as a number

//   // Check if price filter is set and filter accordingly
//   const filteredEvents = events.filter(event => {
//     return isNaN(price) || event.price <= price; // Return true if event price is less than or equal to specified price
//   });

//   renderItems(filteredEvents); // Render filtered items
// });

// // Reset Filters
// resetBtn.addEventListener('click', () => {
//   filterPrice.value = '';
//   renderItems(events); // Render all events again
// });

