// Dom Manipilation

fetch("http://localhost:3000/music")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Correctly invoke the .json() function
  })
  .then((data) => {
    // Now `data` is defined here
    const container = document.getElementsByClassName("container")[0];

    // Loop through the data and append to the table
    data.forEach((item) => {
      let tr = document.createElement("tr");
      let values = [
        item.id,
        item.title,
        item.artist || item.summary,
        item.year,
      ]; 

      values.forEach((elem) => {
        let td = document.createElement("td");
        td.innerText = elem;    //innerText , transforms td to a value of elem
        tr.appendChild(td);        //td is added to tr
      });

      container.appendChild(tr);
    });
  })
  .catch((error) => console.log("Error:", error));
