const btnAbove35 = document.getElementById("below35");
const btnBelow35 = document.getElementById("above35");

const cartItems = [];

document.addEventListener("DOMContentLoaded", ()=>{                 //automatically load the page
    const container = document.querySelector("#container");
})



fetch("http://localhost:3000/products")
    .then((res) =>{
        if(!res.ok){
            console.log("Not successfully Loaded");
            throw new Error("Failed to fetch products");
        }return res.json()
    })
    .then((data)=>{
                
  function renderItems(items)  {
    container.innerHTML =""
    items.map((item) =>{
        const productHTML = `
        <div class='products'>
             <img id='image' src=${item.imageUrl} />
              <p>${item.title}</p>    
              <p>${item.location}</p>
              <p>${item.company}</p>
              <p>$${item.price}</p>
              <button class="btnBuy" button-id="${item.id}">Buy now</button>
        </div>
            `;
             
            container.innerHTML += productHTML;
    });
    }

    renderItems(data)

    // let totalFilteredItemsCost = 0

    function filterItems(){
        const filteredItems = data.filter((item) => item.price <35);
        renderItems(filteredItems)

        totalFilteredItemsCost = filteredItems
                             .map((item) => item.price)
                             .reduce((acc, next)=> acc + next,0)
                             console.log(totalFilteredItemsCost);

    }



    // filterItems()

    btnBelow35.addEventListener("click", () =>{
        filterItems();
    })

    // Add to Cart
    const buyBtn = document.querySelectorAll(".btnBuy");  //buyBtn = array of buttons. To access all we use forEach
    buyBtn.forEach((btn) =>{
        btn.addEventListener("click", (event)=> {
            const btnId = event.target.getAttribute("button-id")
            const selectedItem = data.find((item) => item.id ==btnId)
            // console.log(selectedItem);

            cartItems.push(selectedItem)

            renderCart();
          
        })
    });

    // Cart Items
    const cartList = document.getElementById("cart-container");
    function renderCart(){
        cartList.innerHTML=""
        cartItems.map((item, index) =>{
            cartList.innerHTML += `
            <div class='products'>
             <img id='image' src=${item.imageUrl} />
              <p>${item.title}</p>    
              <p>${item.location}</p>
              <p>${item.company}</p>
              <p>$${item.price}</p>
              <button class="del" data-index="${index}">Delete</button>
        </div>
            `
            // cartList.innerHTML += cartDiv;  
            
            const deleteBtn = document.querySelectorAll(".del")
            deleteBtn.forEach((item) => {
                item.addEventListener("click", (e) =>{
                    const index = e.target.getAttribute("data-index");
                    cartItems.splice(index, 1);

                    renderCart();
                })
            })
        })

    }


})












































// let events =[];
// fetch("http://localhost:3001/products")
//   .then((res) =>{
//     if (!res.ok){
//       console.log("Lodding not successful!");
//     }
//     return res.json()
//   })
//   .then(data =>{
//     events = data;
//     displayEvents(events);
//   })


// function displayEvents(events){
//   const container =document.getElementById("container");
//   document.get

//   events.forEach((event)=>{

//     const card = document.createElement("div");
//     card.className ="main"
//     container.appendChild(card);

//     const img = document.createElement("img");
//     img.src = event.imageUrl;
    
//     card.appendChild(img)

//     const info = document.createElement("div")
//     info.className="info"
//     card.appendChild(info)

//     const titleJs = document.createElement("h2");
//     titleJs.className = "heading"
//     titleJs.textContent = event.title;    //title is called from the db.json
//     info.appendChild(titleJs)

//     const date = document.createElement("p");
//     date.textContent = event.date;     //takes the date key from the event(which is an array of products)
//     info.appendChild(date);

//     const locationJs = document.createElement("p")
//     locationJs.textContent = event.location;
//     info.appendChild(locationJs);

//     const companyJs = document.createElement("p");
//     companyJs.textContent = event.company;
//     info.appendChild(companyJs);

//     const priceJs = document.createElement("p");
//     priceJs.className="price"
//     priceJs.textContent = `$ ${event.price}`;
//     info.appendChild(priceJs)

//     const buyButton= document.createElement("button")
//     buyButton.className ="button"
//     buyButton.textContent ="Buy"
//     info.appendChild(buyButton)

//   });
// }


// const filterBtnJs = document.querySelector(".filterBtn");

// filterBtnJs.onclick = () => {
//   const inputFilter = document.querySelector(".inputFilter").value;

//   if (inputFilter.trim() === "") {  // Check if the input is empty
//     alert("Input a number value");
//     return;  // Exit the function if the input is empty
//   }

//   const filterValue = Number(inputFilter);  // Convert input value to a number

//   const filterContainer = document.getElementById("filterContainer");

//   if (!isNaN(filterValue)) {
//     const filteredEvents = events.filter(event => event.price >= filterValue);

//     // Display filtered events in the filterContainer
//     displayEvents(filteredEvents, filterContainer);
//   } else {
//     alert("Please enter a valid number.");
//   }
// };
