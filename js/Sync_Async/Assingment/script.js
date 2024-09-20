
// (async () => {
//   await fetch("http://localhost:3000/products")
//   .then((res) => {     //if res is successful, it returns res.ok
//     console.log(res);
    
//     if (!res.ok) {
//       console.log("Not successful");
//     }
//     return  res.json()    //target json
//   }).then(data =>{          //assign data variable the result of res.json
    
//     events = data;
//     displayEvents(events);
//   });
// }
// )()

let events =[];
fetch("http://localhost:3001/products")
  .then((res) =>{
    if (!res.ok){
      console.log("Lodding not successful!");
    }
    return res.json()
  })
  .then(data =>{
    events = data;
    displayEvents(events);
  })


function displayEvents(events){
  const container =document.getElementById("container");
  document.get

  events.forEach((event)=>{

    const card = document.createElement("div");
    card.className ="main"
    container.appendChild(card);

    const img = document.createElement("img");
    img.src = event.imageUrl;
    
    card.appendChild(img)

    const info = document.createElement("div")
    info.className="info"
    card.appendChild(info)

    const titleJs = document.createElement("h2");
    titleJs.className = "heading"
    titleJs.textContent = event.title;    //title is called from the db.json
    info.appendChild(titleJs)

    const date = document.createElement("p");
    date.textContent = event.date;     //takes the date key from the event(which is an array of products)
    info.appendChild(date);

    const locationJs = document.createElement("p")
    locationJs.textContent = event.location;
    info.appendChild(locationJs);

    const companyJs = document.createElement("p");
    companyJs.textContent = event.company;
    info.appendChild(companyJs);

    const priceJs = document.createElement("p");
    priceJs.className="price"
    priceJs.textContent = `$ ${event.price}`;
    info.appendChild(priceJs)

    const buyButton= document.createElement("button")
    buyButton.className ="button"
    buyButton.textContent ="Buy"
    info.appendChild(buyButton)

  });
}


// filter
const filterBtnJs = document.querySelector(".filterBtn");

filterBtnJs.onclick = () => {
  const inputFilter = document.querySelector(".inputFilter").value;
  

  const filterValue = Number(inputFilter);  //converts the string into a numeric datatype

  if (!isNaN(filterValue)) {
    const filteredEvents = events.filter(event => event.price >= filterValue)
    
    displayEvents(filteredEvents);
  } else {
    alert("Please enter a valid number.");
  }
};