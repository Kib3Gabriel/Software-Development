// Reduce
function highlight(strings, ...values){
   const total = values.reduce((acc, next) => acc + next)
   return `Total: ${total} ${strings}`
}

const message =highlight("John", 21,22,23)
console.log(message);

// Callbacks
function addCallback(z, callbackFn){
    return callbackFn(z,20);
}

function add(a, b){
    return a+b;
}
console.log(addCallback(16, add));

// array with callbacks
function arrCallback(...args){
    const arr = args.map((num) => num*2)
    return arr;
}

console.log(arrCallback(1,2,3,4,5));

// Callbacks in Asynchronous operation
function loginUser(email, password, callbackFn){
    setTimeout(() => {
        console.log("Were have logged into Netflix");
        callbackFn( {
            userEmail:email //creates an object with userEmail(key) & email(value)
        } );
    },1000)
}

//Simulate fetching recently watched videos, for the logged-in user
function recentlyWatchedVideo({userEmail},callbackFn){
    setTimeout(() =>{
        console.log("We have all the recently watched movies");
        callbackFn({                //add videos to the object containing the userEmail
            // userEmail,
            videos:["Star Wars", "Mad max", "Killer", "The Lord of the Rings"]
        })
    }, 1000)
}

//simulate getting details of one video
function getDetailsOfOneVideo(videoClip, callbackFn){
    setTimeout(() =>{
        console.log("We are getting the details of one video");
        callbackFn({
            oneVideo:videoClip.videos[1]   //assigns oneVideo(key) a value(videos_first_index
        });
    }, 1000)
}

loginUser("email@gmail.com", "password",(user) =>{
    console.log(user);
    recentlyWatchedVideo(user,(videos) =>{
        console.log(videos);
        getDetailsOfOneVideo(videos, (videoDetails) =>{
            console.log("This is the info of:", videoDetails.oneVideo);

        });
    });
});

// gender check using callbacks
let gender2 = true;
function checkGender(successfulCallback, errorCallback) {
  setTimeout(() => {
    if (gender2 == false) {
      // here is the callback function, when condition is true
      successfulCallback("Successful gender check");
    } else {
      // another callback function when condition is false
      errorCallback("Wrong gender check");
    }
  }, 1000);
}

//must define the callback function
function successfulCallback(message) {
  console.log(message);
}

function errorCallback(error) {
  console.log(error);
}

checkGender(successfulCallback, errorCallback);
