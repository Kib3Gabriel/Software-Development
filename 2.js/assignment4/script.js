
const users = [
    {
      id: 1,
      name: "John",
      location: "New York",
      friends: [2, 3, 4],
      posts: [
        { content: "Great day at Central Park!", timestamp: "2024-09-10T12:00:00", likes: 15 },
        { content: "Loving the vibes in NYC!", timestamp: "2024-05-15T08:30:00", likes: 8 },
        { content: "Visited the Statue of Liberty today!", timestamp: "2024-09-13T17:45:00", likes: 20 }
      ]
    },
    {
      id: 2,
      name: "Jane",
      location: "Los Angeles",
      friends: [1, 3],
      posts: [
        { content: "Hiking at Griffith Park!", timestamp: "2024-09-14T10:00:00", likes: 5 },
        { content: "Great weather in LA", timestamp: "2024-09-06T11:15:00", likes: 12 }
      ]
    },
    {
      id: 3,
      name: "Alice",
      location: "Chicago",
      friends: [1, 2],
      posts: [
        { content: "Windy day at the park", timestamp: "2024-08-01T14:00:00", likes: 7 }
      ]
    }
  ];
  
function calculateAverageLikes(usersArray) {
    
    const today = new Date();
    
    // Create a date object representing the date 7 days ago
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
    
    // Process users to extract relevant data
    const { totalLikes, totalUsers, userDetails } = usersArray
      .map(user => {
       
        const recentPosts = user.posts.filter(post => new Date(post.timestamp) >= sevenDaysAgo);
       
         const popularPosts = recentPosts.filter(post => post.likes >= 10);
        
            return popularPosts.length > 0 ? {
          userId: user.id,
          userName: user.name,
          posts: popularPosts
        } : null;
      })
      .filter(user => user !== null) // Remove users with no popular posts
      .reduce((acc, user) => {
        // Calculate total likes by summing the likes of popular posts
        const totalLikes = acc.totalLikes + user.posts.reduce((sum, post) => sum + post.likes, 0);
        
        const totalUsers = acc.totalUsers + 1; 
        
        acc.userDetails.push({ id: user.userId, name: user.userName });
        
        // Return updated accumulator object
        return { 
          totalLikes, 
          totalUsers, 
          userDetails: acc.userDetails 
        };
      }, { totalLikes: 0, totalUsers: 0, userDetails: [] });
  
    // Calculate average likes per user
    const averageLikes = totalUsers > 0 ? totalLikes / totalUsers : 0;
  
    return { averageLikes, userDetails, numberOfActiveUsers: totalUsers };
}
 
const result = calculateAverageLikes(users);
console.log(`Average likes per user: ${result.averageLikes}`);
console.log('Active Users with Popular Posts:', result.userDetails);
console.log('Number of Active Users:', result.numberOfActiveUsers);



// Filters
const availableFoods = [
    {id: "qwe234dfh", name: "Burger", image:"🍔🍔", price: 234},
    {id: "qwe2356dxh", name: "pizza", image:"🍕🍕", price: 400},
    {id: "qwe2456yh", name: "meat", image:"🍖🍖", price: 500},
    {id: "qwe2488yh", name: "meat-burger", image:"🍖🍔", price: 750},
    {id: "qwe2766yh", name: "chicken-pizza", image:"🍕🍗", price: 1050},
    {id: "qwe2785yh", name: "chicken", image:"🍗🍗", price: 1200},
];
const filteredFoods = availableFoods.filter((filteredFoodObject) =>{
    return filteredFoodObject.price >900
})
let totalPrice = 0;
filteredFoods.forEach((food) =>{
    totalPrice += food.price;
});

console.log(filteredFoods);

console.log(`My total bill for items above 900: ${totalPrice}`);
