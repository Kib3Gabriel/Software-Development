// // solving the callback using promises
// function loginUser(email, password) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         console.log("We have logged into Netflix");
//         resolve({ userEmail: email });
//       } catch (error) {
//         reject("User email is not provided");
//       }
//     }, 1000);
//   });
// }

// function recentWatchedVideo({ userEmail }, callbackFn) {
//   setTimeout(() => {
//     console.log("We have all the recently watched videos");
//     callbackFn({
//       userEmail,
//       videos: ["star wars", "The Mando", "The Lord of The Rings"],
//     });
//   }, 1000);
// }

// // Simulate getting details of one video
// function getDetailsOfOneVideo(videos, callbackFn) {
//   setTimeout(() => {
//     console.log("We are getting the details of one video");
//     callbackFn({ video: videos.videos[1] });
//   }, 1000);
// }

// // Execute the sequence of asynchronous operations
// loginUser("job@gmail.com", "password", (user) => {
//   console.log(user);

//   recentWatchedVideo(user, (videos) => {
//     console.log(videos);

//     getDetailsOfOneVideo(videos, (videoDetails) => {
//       console.log("This is the info of: ", videoDetails.video);
//     });
//   });
// });



