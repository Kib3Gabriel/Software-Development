// // // Asynchronous function returns a promise

// // async function add(a,b){
// //     return a + b
// // }

// // const addmarks = async () =>{       //This defines an asynchronous arrow function named addmarks. The function doesn't take any parameters.
// //     const result = await add(5, 10);  //pauses the execution of addMarks until the promise returned by add(5,10) is resolved
// //     console.log(result);
// // }

// // addmarks()

// // Resolving Sequential Execution Issues﻿




// // Simulate user login
// async function loginUser(email, password) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (email === "kamaugabriel122@gmail.com" && password === "password") {
//                 resolve({ userId: 1, name: "Gabriel Kamau", email });
//             } else {
//                 reject("Invalid email or password");
//             }
//         }, 1000); // Simulating network delay
//     });
// }

// // Simulate fetching recently watched videos
// async function recentlyWatchedVideo(user) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve([
//                 { id: 1, title: "Breaking Bad", duration: "50 mins" },
//                 { id: 2, title: "Stranger Things", duration: "45 mins" }
//             ]);
//         }, 1500); // Simulating network delay
//     });
// }

// // Simulate fetching details for a selected video
// async function getVideoDetails(videoTitle) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({ title: videoTitle, genre: "Drama", rating: "9.5/10" });
//         }, 2000); // Simulating network delay
//     });
// }

// // Main function to simulate playback
// async function playBackVideo() {
//     try {
//         const user = await loginUser("kamaugabriel122@gmail.com", "password");
//         console.log("Logged into Netflix", user);

//         // Run both functions in parallel
//         const [watchedVideos, selectedVideoDetails] = await Promise.all([
//             recentlyWatchedVideo(user),
//             getVideoDetails('Breaking Bad')
//         ]);

//         console.log("We have all recently watched videos", watchedVideos);
//         console.log("Data of selected video", selectedVideoDetails);
//     } catch (error) {
//         console.error("An error has occurred", error);
//     }
// }

// // Call the playBackVideo function
// playBackVideo();



// New
// const posts=[
//     {title:'Post One', body:'This is post one'},
//     {title:'Post two', body:'This is post two'}
// ];

// function getPosts(){
//     setTimeout(() =>{
//         let outPut ="";
//         posts.forEach((post) =>{
//             outPut += `<li>${post.title}</li>`
//         });
//         document.body.innerHTML = outPut;  //insert output to body
//     }, 1000)
// }

// function  createPost(post){
//         setTimeout(() =>{
//             posts.push(post);
//         }, 2000)  //post 3 will not be diplayed in console, since it took longer than the getPost
//                  //By the time we are running the createPost, Dom is already printed
// }


// getPosts();
// createPost ({title:"Post three", body:"This is post"})

// Using callbacks

// const posts=[
//     {title:'Post One', body:'This is post one'},
//     {title:'Post two', body:'This is post two'}
// ];

// function getPosts(){
//     setTimeout(() =>{
//         let outPut ="";
//         posts.forEach((post) =>{
//             outPut += `<li>${post.title}</li>`
//         });
//         document.body.innerHTML = outPut;  //insert output to body
//     }, 1000)
// }

// function  createPost(post, callbackFn){
//         setTimeout(() =>{
        
//             posts.push(post);
//             callbackFn();
            
//         }, 2000) 
                 
// }



// createPost ({title:"Post three", body:"This is post"},getPosts ) //waits for two seconds then it shows all the posts


// //PROMISE
// // both functions output day will be rendered and the same time despite the different
// //setTimeout , they'll wait for each other(executed concurrentl, displayed at same time)
// const posts=[
//     {title:'Post One', body:'This is post one'},
//     {title:'Post two', body:'This is post two'}
// ];

// function getPosts(){
//     setTimeout(() =>{
//         let outPut ="";
//         posts.forEach((post) =>{
//             outPut += `<li>${post.title}</li>`
//         });
//         document.body.innerHTML = outPut;  //insert output to body
//     }, 1000)
// }

// function  createPost(post){
//     return new Promise((resolve, reject) =>{
//         setTimeout(() =>{
//             posts.push(post);
//             const error = false;
//             if(!error){
//                 resolve("successful");
//             }else{
//                 reject("Smth went wrong!");
//             }
//         }, 2000) 
//     });     
                 
// }

// createPost ({title:"Post three", body:"This is post"}) 
//     .then(getPosts)
//     .catch(err => console.log(err))

// promise.all

const posts=[
    {title:'Post One', body:'This is post one'},
    {title:'Post two', body:'This is post two'}
];

function getPosts(){
    setTimeout(() =>{
        let outPut ="";
        posts.forEach((post) =>{
            outPut += `<li>${post.title}</li>`
        });
        document.body.innerHTML = outPut;  //insert output to body
    }, 1000)
}

function  createPost(post){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            posts.push(post);
            const error = false;
            if(!error){
                resolve("successful");
            }else{
                reject("Smth went wrong!");
            }
        }, 2000) 
    });     
                 
}

const promise1 = Promise.resolve("Good Morning");
const promise2 =10;
const promise3 = new Promise((resolve, reject)  =>
setTimeout(resolve, 2000, "Have a great day"));

Promise.all([promise1, promise2, promise3]).then(values =>
    console.log(values)
)
