// array methods with callbacks
const arr =[1,2,3,4,5].map((num) => num*2);
console.log(arr);

function add(a,b){
    return a+b;
}

function addCallback(z, callbackFn){
    return callbackFn(z, 6);
    // It calls the callbackFn, which is the add function, with two arguments: z = 10 and 6.
// since the callbackFn is actually the add function, the add function is executed with a=10, b=6
}

// console.log(add(10,10));
console.log(addCallback(10,add));

function greet(name, callback){
    console.log(`Hello ${name}`)
    callback();
}

function sayGoodbye(){
    console.log("Goodbye");
}

greet("John", sayGoodbye)


// Asynchronous operation , setTimeout:
function delayedMessage(callback){
    setTimeout(() =>{
        console.log("This message is delayed by 2sec..");
        callback();  //gets executed after above console.log()
    }, 2000);
}

function done(){
    console.log("Done with the delay!");
}

delayedMessage(done)


console.log("------------------login user----------------------------------");
function loginUser(email,password, callbackFn){
    setTimeout(() =>{
        console.log("We have logged into Netflix");
        callbackFn({userEmail: email });   
    }, 1000);
}

function recentWatchedVideo({userEmail},callbackFn){
    setTimeout(() =>{
        console.log("We have all the recently watched videos");
        callbackFn({
            userEmail,
            videos:["star wars", "The Mando", "The Lord of The Rings"],
        });
    }, 1000)
}

// Simulate getting details of one video
function getDetailsOfOneVideo(videos, callbackFn) {
    setTimeout(() => {
      console.log("We are getting the details of one video");
      callbackFn({ video: videos.videos[1] });
    }, 1000);
  }
  
  // Execute the sequence of asynchronous operations
loginUser("job@gmail.com", "password", (user) => {
    console.log(user);
  
    recentWatchedVideo(user, (videos) => {
      console.log(videos);
  
      getDetailsOfOneVideo(videos, (videoDetails) => {
        console.log("This is the info of: ", videoDetails.video);
      });
    });
});





// function printEven(callbackFn, ...numbers){
//     const filteredNumbers = numbers.filter((nums) => typeof nums === 'number' && callbackFn)
//     return filteredNumbers

// }
// const isEven =(num) => num%2 ===0
// console.log(printEven(isEven,1,2,3,4,5,6,7,8,9,10));   