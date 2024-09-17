
// Q1 create a The function should:
// 1.	Use the rest operator to capture all arguments except the first one.
// 2.	Filter the numbers using the provided filter function.
// 3.	Sort the filtered numbers in ascending order.
// 4.	Return the sorted array of numbers

function filterAndSort(filterFn, ...numbers){
    const filteredNumbers = numbers.filter(filterFn);
    const sortedNumbers = filteredNumbers.sort((a,b) => a-b);
        // If a - b is negative, a comes before b.
        // If a - b is positive, b comes before a.
        // If a - b is 0, the order is unchanged.
    return sortedNumbers
}

const isOdd =(num) => num%2 !==0
console.log(filterAndSort(isOdd, 1,2,10,3,4,5,6));




// Q2 Create a The function should:
// 1.	Use the spread operator to merge all objects into one.
// 2.	Ensure that if multiple objects contain the same key, the last object's value for that key should be used.
// 3.	Return the merged object

function mergeObjects(...args){
    const mergedOnj = {...obj11, ...obj12}
    return mergedOnj
}

const obj11 ={a:1, b:2};
const obj12 = {b:3, c:4}
console.log(mergeObjects(obj11,obj12));




// Q3 Create a  function should:
// 1.	Use the spread operator to combine all arrays into one.
// 2.	Remove duplicate elements from the combined array.
// 3.	Return the new array with unique elements

function combineArrays(...arrays){
    const combined =[...arr1, ...arr2, ...arr3];
    const noDuplicate =[...new Set(combined)];   //Emoves the duplicates
    return noDuplicate
}

const arr1 = [1,2,3];
const arr2 = [2,3,4];
const arr3 = [4,5,6];
console.log(combineArrays(arr1, arr2, arr3));



// Q4 Create a function should:
// 1.	Use the spread operator to combine all arrays into one.
// 2.	Remove duplicate elements from the combined array.
// 3.	Return the new array with unique elements.

function extractProperties(objects, ...properties) {
    return objects.map(obj => {
        // The spread operator to create a new object with only the specified properties
        return {
            ...properties.reduce((newObj, prop) => {
                if (prop in obj) {
                    newObj[prop] = obj[prop];  // Add the property if it exists in the current object
                }
                return newObj;
            }, {})
        };
    });
}

const objects = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }];
console.log(extractProperties(objects, 'a', 'c'));


// //Q4 alternative method without spread
// function extractProperties(objects, ...properties){
//     return objects.map(obj =>{
//         let newObj ={};
//         properties.forEach(prop =>{
//             if(prop in obj){
//                 newObj[prop]= obj[prop]     //Add the property to the new object
//             }
//         });
//         return newObj
//     });
// }


// const objects =[{a:1, b:2,c:3}, {a:4, b:5, c:6}]
// console.log(extractProperties(objects, 'a', 'b'));

