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



console.log("---------another promise-----------------");
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
