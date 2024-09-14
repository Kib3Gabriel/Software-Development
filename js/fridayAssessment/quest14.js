// Q14. A JavaScript function to retrieve all the values of an object's properties.

function getObjectValues(obj) {
    
    return Object.values(obj);
}


const student = { name: "John Doe", class: "Teach2Give", regNo: 7039 };
console.log(getObjectValues(student));
