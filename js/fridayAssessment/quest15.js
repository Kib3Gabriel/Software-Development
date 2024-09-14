// Q15. A JavaScript function to convert an object into a list of `[key, value]` pairs.

function objectToKeyValuePairs(obj) {
    return Object.entries(obj);
}

const student1 = { name: "John Doe", class: "Teach2Give", regNo: 7039 };
const student2 ={name:"Kelvin hart", class:"Holyword", regNo:987863};
console.log(objectToKeyValuePairs(student1));
console.log(objectToKeyValuePairs(student2));
