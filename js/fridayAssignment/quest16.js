// Q16. A JavaScript function to get a copy of the object where the keys become the values and the values are the keys.

function objectInverted(obj) {
    let objInverted = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Assign value as key and key as value in the new object
            objInverted[obj[key]] = key;
        }
    }

    return objInverted;
}

const student = { name: "John Doe", class: "Teach2Give", regNo: 7039 };
console.log(objectInverted(student));
