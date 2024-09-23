// import {handleFormData} from '../src/index'

// it("Should handle a form submit", () => {
//     const form = document.createElement("form");
  
//     form.innerHTML = `
//   <input name="name" value="John Doe">
//   `;
  
//     form.onsubmit = (e) => {
//       const value = handleFormData(e);
  
//       expect(value).toEqual({ name: "John Doe" });
//     };

//     expect.assertions(1);
  
//     form.requestSubmit();
  
   
//   });

import { handleFormData } from '../src/index';

it("Should handle a form submit", () => {
    const form = document.createElement("form");

    form.innerHTML = `
        <input name="name" value="John Doe">
    `;

    // Ensure the form's onsubmit event properly captures the event
    form.onsubmit = (e) => {
        e.preventDefault(); // Prevent the default submission
        const value = handleFormData(e);
        
        // Log the value to help debug
        console.log('Captured value:', value); 
        
        expect(value).toEqual({ name: "John Doe" });
    };

    expect.assertions(1); // Ensure we expect one assertion
    form.requestSubmit(); // Trigger the form submission
});
