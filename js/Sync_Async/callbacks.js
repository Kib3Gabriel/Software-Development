// // Reduce
// // function highlight(strings, ...values){
// //    const total = values.reduce((acc, next) => acc + next)
// //    return `Total: ${total} ${strings}`
// // }

// // const message =highlight("Kibe", 21,22,23)
// // console.log(message);

// // Callbacks

// function addCallback(z, callbackFn){
//     return callbackFn(z,20);
// }

// function add(a, b){
//     return a+b;
// }

// console.log(addCallback(16, add));

// // // array with callbacks
// function arrCallback(...args){
//     const arr = args.map((num) => num*2)
//     return arr;
// }

// console.log(arrCallback(1,2,3,4,5));

// // Callbacks in Asynchronous operation

// function loginUser(email, password, callbackFn){
//     setTimeout(() => {
//         console.log("Were have logged into Netflix");
//         callbackFn( {
//             userEmail:email //creates an object with userEmail(key) & email(value)
//         } );
//     },1000)
// }

// //Simulate fetching recently watched videos, for the logged-in user
// function recentlyWatchedVideo({userEmail},callbackFn){
//     setTimeout(() =>{
//         console.log("We have all the recently watched movies");
//         callbackFn({                //add videos to the object containing the userEmail
//             // userEmail,
//             videos:["Star Wars", "Mad max", "Killer", "The Lord of the Rings"]
//         })
//     }, 1000)
// }

// //simulate getting details of one video
// function getDetailsOfOneVideo(videoClip, callbackFn){
//     setTimeout(() =>{
//         console.log("We are getting the details of one video");
//         callbackFn({
//             oneVideo:videoClip.videos[1]   //assigns oneVideo(key) a value(videos_first_index
//         });
//     }, 1000)
// }

// loginUser("kamaugabriel122@gmail.com", "password",(user) =>{
//     console.log(user);
//     recentlyWatchedVideo(user,(videos) =>{
//         console.log(videos);
//         getDetailsOfOneVideo(videos, (videoDetails) =>{
//             console.log("This is the info of:", videoDetails.oneVideo);

//         });
//     });
// });

// // gender check using callbacks
// let gender2 = true;
// function checkGender(successfulCallback, errorCallback) {
//   setTimeout(() => {
//     if (gender2 == false) {
//       // here is the callback function, when condition is true
//       successfulCallback("Successful gender check");
//     } else {
//       // another callback function when condition is false
//       errorCallback("Wrong gender check");
//     }
//   }, 1000);
// }

// //must defined the callback function
// function successfulCallback(message) {
//   console.log(message);
// }

// function errorCallback(error) {
//   console.log(error);
// }

// checkGender(successfulCallback, errorCallback);

// PROMISES

// // gender check using promises
// let gender = false;
// let promise = new Promise((resolve, reject) => {
//   if (gender == true) {
//     resolve("Successful message");
//   } else {
//     reject("Wrong view");
//   }
// });

// promise
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// // consuming a promise

// let myPromise = new Promise((resolve, reject) =>{
//     let success = true;
//     if (success){
//         resolve("Operation successful");
//     }else{
//         reject("Operatation failed");
//     }
// });

// myPromise
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error =>{
//         console.log(error);
//     });





function loginUser(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("We have logged into Netflix");
        resolve({ userEmail: email });
      }, 1000);
    });
  }
  
  // Simulate getting recently watched videos
  function recentlyWatchedVideo({ userEmail }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("We have all the recently watched movies");
        resolve({
          userEmail,
          videos: ["Star Wars", "Mad Max", "Killer", "The Lord of the Rings"],
        });
      }, 1000);
    });
  }
  
  // Simulate getting details of one video
  function getDetailsOfOneVideo(videoClip) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("We are getting the details of one video");
        resolve({
          video: videoClip, // Ensure videoClip is a string
          name: "Mad Max",
        });
      }, 1000);
    });
  }
  
  function getTimeStamp(video) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Getting timestamp of the video");
        resolve({ video, stoppingTime: "00:24:45" });
      }, 3000);
    });
  }
  
  function renderVideo(video, timestamp) {
    console.log(`Rendering ${video} from timestamp ${timestamp}`);
  }
  
  // Main execution flow
  loginUser("kamaugabriel122@gmail.com", "password")
    .then((user) => recentlyWatchedVideo(user))
    .then((videos) => {
      const searchElement = "Mad Max"; // Fixed the casing
      const videoIndex = videos.videos.indexOf(searchElement); // Fixed property name and method
  
      if (videoIndex !== -1) {
        return getDetailsOfOneVideo(videos.videos[videoIndex]); // Correctly accessing the video
      } else {
        throw new Error("Video was not found");
      }
    })
    .then(({ video }) => getTimeStamp(video)) // Ensure `video` is extracted correctly
    .then(({ video, stoppingTime }) => renderVideo(video, stoppingTime)) // Ensure `video` is a string
    .catch((err) => {
      console.log("Error:", err);
    });
  

// // Define the functions returning Promises

// function loginUser(email, password) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log("Logged into Netflix");
//         resolve({ userEmail: email });
//       }, 3000);
//     });
//   }

//   function recentlyWatchedVideo({ userEmail }) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log("Retrieved recently watched videos");
//         resolve({
//           userEmail,
//           videos: ["Star Wars", "The Mando", "The Lord of The Rings"]
//         });
//       }, 3000);
//     });
//   }

//   function getDetailsOfOneVideo(video) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log("Getting details of the video");
//         resolve({ video, name: "The Mando" });
//       }, 3000);
//     });
//   }

//   function getTimeStamp(video) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log("Getting timestamp of the video");
//         resolve({ video, stoppingTime: "00:24:45" });
//       }, 3000);
//     });
//   }

//   function renderVideo(video, timestamp) {
//     console.log(`Rendering ${video} from timestamp ${timestamp}`);
//   }

//   // Chain Promises

//   loginUser("job@gmail.com", "kjvhjsdvhj")
//     .then(user => recentlyWatchedVideo(user))
//     .then(videos => {
//       const searchElement = "The Mando";
//       const videoIndex = videos.videos.indexOf(searchElement);

//       if (videoIndex !== -1) {
//         return getDetailsOfOneVideo(videos.videos[videoIndex]);
//       } else {
//         throw new Error("Video was not found");
//       }
//     })
//     .then(video => getTimeStamp(video))
//     .then(({ video, stoppingTime }) => renderVideo(video, stoppingTime))
//     .catch(err => {
//       console.log("Error:", err);
//     });
