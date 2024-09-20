// Gender check using Promises

const gender = false
const myPromise = new Promise((resolve, reject) =>{
    if(gender){
        resolve("Gender check successful");
    }else{
        reject("Wrong gender")
    }
});
myPromise   
    .then((message) =>{
        console.log(message);
    })
    .catch((error) =>{
        console.log(error);
    })
