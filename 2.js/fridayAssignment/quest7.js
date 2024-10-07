//Q7 Write a JavaScript program that returns a subset of a string.

function getSubsets(myString){
    let subsets =[];
    for (let i =0; i<myString.length; i++){
        for (let j=i; j<= myString.length; j++){
            let subset = myString.slice(i,j);
            if(subset !== ''){
                subsets.push(subset);
            }
        }
    }
    return subsets;
}

const result = getSubsets("dog")
console.log(result);