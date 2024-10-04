const apiBaseUrl = 'http://localhost:3000/api/product';

// Elements
const eventsContainer = document.getElementById('eventsContainer');
const createEventBtn = document.getElementById('createEventBtn');
const createModal = document.getElementById('createModal');
const closeCreateModal = document.getElementById('closeCreateModal');
const createEventForm = document.getElementById('createEventForm');

const updateModal = document.getElementById('updateModal');
const closeUpdateModal = document.getElementById('closeUpdateModal');
const updateEventForm = document.getElementById('updateEventForm');

const notification = document.getElementById('notification');

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

// Fetch and display all events
const fetchEvents = async () => {
  try {
    const response = await fetch(apiBaseUrl);
    const events = await response.json();
    displayEvents(events);
console.log(events )

  } catch (error) {
    showNotification('Failed to fetch events', true);
    console.error(error);
  }
};
fetchEvents 
// Display events in the DOM
const displayEvents = (events) => {
  eventsContainer.innerHTML = '';

  if (events.length === 0) {
    eventsContainer.innerHTML = '<p>No events available. Please add some.</p>';
    return;
  }

  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');

    eventCard.innerHTML = `
      <img src="${event.imageUrl}" alt="${event.title}">
      <div class="event-details">
        <h3>${event.title}</h3>
        <p><strong>Price:</strong> $${event.price}</p>
        <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Company:</strong> ${event.company}</p>
      </div>
      <div class="btn-group">
        <button class="btn edit" data-id="${event.id}">Edit</button>
        <button class="btn view" data-id="${event.id}">View Details</button>
        <button class="btn delete" data-id="${event.id}">Delete</button>
      </div>
    `;

    eventsContainer.appendChild(eventCard);
  });
};

// Handle Create Event
createEventForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(createEventForm);
  const newEvent = {
    title: formData.get('title'),
    imageUrl: formData.get('imageUrl'),
    price: parseFloat(formData.get('price')),
    date: formData.get('date'),
    location: formData.get('location'),
    company: formData.get('company')
  };

  try {
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    });

    if (response.ok) {
      const createdEvent = await response.json();
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

// Open Create Modal
createEventBtn.addEventListener('click', () => {
  showModal(createModal);
});

// Close Create Modal
closeCreateModal.addEventListener('click', () => {
  hideModal(createModal);
});

// Handle Update Event
eventsContainer.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit')) {
    const eventId = e.target.dataset.id;
    try {
      const response = await fetch(`${apiBaseUrl}/${eventId}`);
      if (response.ok) {
        const event = await response.json();
        populateUpdateForm(event);
        showModal(updateModal);
      } else {
        showNotification('Event not found', true);
      }
    } catch (error) {
      showNotification('Failed to fetch event details', true);
      console.error(error);
    }
  }

  if (e.target.classList.contains('delete')) {
    const eventId = e.target.dataset.id;
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
    }
  }
});

// Populate Update Form
const populateUpdateForm = (event) => {
  updateEventForm.updateId.value = event.id;
  updateEventForm.updateTitle.value = event.title;
  updateEventForm.updateImageUrl.value = event.imageUrl;
  updateEventForm.updatePrice.value = event.price;
  updateEventForm.updateDate.value = event.date.split('T')[0];
  updateEventForm.updateLocation.value = event.location;
  updateEventForm.updateCompany.value = event.company;
};

// Handle Update Form Submission
updateEventForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(updateEventForm);
  const eventId = formData.get('id');
  const updatedEvent = {
    title: formData.get('title'),
    imageUrl: formData.get('imageUrl'),
    price: parseFloat(formData.get('price')),
    date: formData.get('date'),
    location: formData.get('location'),
    company: formData.get('company')
  };

  try {
    const response = await fetch(`${apiBaseUrl}/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent)
    });

    if (response.ok) {
      const event = await response.json();
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

// Close Update Modal
closeUpdateModal.addEventListener('click', () => {
  hideModal(updateModal);
});

// Handle Delete Event
const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
      method: 'DELETE'
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
};

// Initial Fetch
document.addEventListener('DOMContentLoaded', fetchEvents);

// Close Modals on outside click
window.addEventListener('click', (e) => {
  if (e.target === createModal) {
    hideModal(createModal);
  }
  if (e.target === updateModal) {
    hideModal(updateModal);
  }
});

// Elements for the view details modal
const viewModal = document.getElementById('viewModal');
const closeViewModal = document.getElementById('closeViewModal');

// Function to show event details
const showEventDetails = (event) => {
  document.getElementById('viewTitle').textContent = event.title;
  document.getElementById('viewPrice').textContent = event.price;
  document.getElementById('viewDate').textContent = new Date(event.date).toLocaleDateString();
  document.getElementById('viewLocation').textContent = event.location;
  document.getElementById('viewCompany').textContent = event.company;
  document.getElementById('viewImageUrl').src = event.imageUrl;
  showModal(viewModal);
};

// Handle View Details
eventsContainer.addEventListener('click', async (e) => {
  if (e.target.classList.contains('view')) {
    const eventId = e.target.dataset.id;
    try {
      const response = await fetch(`${apiBaseUrl}/${eventId}`);
      if (response.ok) {
        const event = await response.json();
        showEventDetails(event);
      } else {
        showNotification('Event not found', true);
      }
    } catch (error) {
      showNotification('Failed to fetch event details', true);
      console.error(error);
    }
  }
});

// Close View Modal
closeViewModal.addEventListener('click', () => {
  hideModal(viewModal);
});
//viewModal hidden if clicked outside of it
window.addEventListener('click', (e) => {
  if (e.target === viewModal) {
    hideModal(viewModal);
  }
});
