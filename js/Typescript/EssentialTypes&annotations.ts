// const logUserJobTitle = (user: {
//     job: {
//       title: string;
//     };
//   }) => {
//     console.log(user.job.title);
//   };


// const exampleUser={
//     job:{
//         title:"123"
//     },
// }

//   logUserJobTitle(exampleUser)

//   /**
//    * JSDoc comments. This is how you document
//    */

//   let otherThing = {
//     name: "Alice",
//   };
  
//   const otherObject = {
//     ...otherThing,
//     thing: "abc",
//   };
  
//   otherObject.thing;


//   console.log(otherObject);

//   let element = document.getElementById("12");


//   function myFunct(a:number, b:number){
//     return a + b
//   }

//   console.log(myFunct(12, 90));


// const run =(message:String)=>{
//     console.log(message);
// };

// run("Hello!");



// // Function Anotation
// // Functions must be anotated
// const logAlbumInfo =(
//     title:string,
//     trackCount:number,
//     isReleased:boolean,
// ) =>{
    
// }

// logAlbumInfo("Black GOld", 45, false)

// // Variable Annotation
// //Not a must for variable annotation
// let albumTitle: string ="Midnight Train";
// let isReleased:boolean =true;
// let trackCount:number=13


// // Not a must to annotate variables
// let myName="Gabriel"
// let myAge =23
// let myGender=true

// myGender="male"

// function add(a:number, b:number){
//     return a + b
// }



// Exercise 1: Basic Types with Function Parameters
// import { Equal, Expect } from '@type-challenges/utils'
import { Equal, Expect } from '@type-challenges/utils'
export const add = (a:number, b:number)=>{
    return a + b
};

const result:number =add(1,2);

type test = Expect<Equal<typeof result, number>>;



// Exercise 2: Annotating Empty Parameters
const concatTwoStrings =(a:string,b:string)=>{
    return [a,b].join(" ");
};


const result2 =concatTwoStrings("Hello", "World");
type test2 =Expect<Equal<typeof result2, string>>;


// // Exercise 3: The Basic Types
export let example1:string ="Hello world"
export let example2:number = 42;

export let example3:boolean = true;
export let example4:symbol = Symbol();
export let example5:bigint=123n

// Exercise4: The any Type


// Tunatenga



//Object literal types

// Exercise 1: Object Literal Types
const concatName =(user:{first:string, last:string}) =>{
    return `${user.first} ${user.last}`;
}

it("should return the full name", () => {
    const result3 = concatName({
      first: "John",
      last: "Doe",
    });
  
    type test = Expect<Equal<typeof result3, string>>;
  
    expect(result3).toEqual("John Doe");
  });



// Exercise 2: Optional Property Types

const concatName2 = (user: { first: string; last?: string }) => {  
    if (!user.last) {
      return user.first;
    }
  
    return `${user.first} ${user.last}`;
  };

const result4 = concatName2({
    first:"John"
})



// Type Aliases

type Rectangle={
    width:number;
    height:number;
};

const getRectangleArea = (rectangle: Rectangle) => {
    return rectangle.width * rectangle.height;
  };
  
  const getRectanglePerimeter = (rectangle: Rectangle) => {
    return 2 * (rectangle.width + rectangle.height);
  };

  it("should return the area of a rectangle", () => {
    const result5 = getRectangleArea({
      width: 10,
      height: 20,
    });
  
    type test = Expect<Equal<typeof result5, number>>;
  
    expect(result5).toEqual(200);
  });
  
  it("should return the perimeter of a rectangle", () => {
    const result5 = getRectanglePerimeter({
      width: 10,
      height: 20,
    });
  
    type test = Expect<Equal<typeof result5, number>>;
    expect(result5).toEqual(60);
  });



// Exercise 1: Array Type

type ShoppingCart = {
  userId: string;
  items:string[];
};

const processCart = (cart: ShoppingCart) => {
  // Do something with the cart in here
};

processCart({
  userId: "user123",
  items: ["item1", "item2", "item3"],
});



// Exercise 2: Arrays of Objects
type Recipe = {
  title: string;
  instructions: string;
  ingredients:{
    name:string;
    quantity:string
  }[];
};

const processRecipe = (recipe: Recipe) => {
  // Do something with the recipe in here
};

processRecipe({
  title: "Chocolate Chip Cookies",
  ingredients: [
    { name: "Flour", quantity: "2 cups" },
    { name: "Sugar", quantity: "1 cup" },
  ],
  instructions: "...",
});



// Exercise 3: Tuples

const setRange = (range: [number, number]) => {
  const x = range[0];
  const y = range[1];

  // Do something with x and y in here
  // x and y should both be numbers!

  type tests = [
    Expect<Equal<typeof x, number>>,
    Expect<Equal<typeof y, number>>,

  ];
};

// @ts-expect-error too few arguments
setRange([0]);
// @ts-expect-error too many arguments
setRange([0,10,20])




// Exercise 4 Optional Members of Turples
const goToLocation = (coordinates:[number, number, number | undefined]) => {
  const latitude = coordinates[0];
  const longitude = coordinates[1];
  const elevation = coordinates[2];

  // Do something with latitude, longitude, and elevation in here

  type tests = [
    Expect<Equal<typeof latitude, number>>,
    Expect<Equal<typeof longitude, number>>,
    Expect<Equal<typeof elevation, number | undefined>>,

  ];
};



// Passing types of Functions

// Exercise 1: Passing Types to Map
// A map is a dictonary that stores a key and a value


// type user={
//   name:string;
//   age:number;
// };


// const userMap = new Map<number,user>();


// userMap.set(1, { name: "Max", age: 30 });

// userMap.set(2, { name: "Manuel", age: 31 });

// // @ts-expect-error
// userMap.set("3", { name: "Anna", age: 29 });

// // @ts-expect-error
// userMap.set(3, "123");


// Exercise 2: JSON.parse() Can't Receive Type Arguments
const parsedData: {
  name: string;
  age: number;
} = JSON.parse('{"name": "Alice", "age": 30}');


// Typing Functions


const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
): string => {
  return "John";
};

function getAlbumFormats(album: Album, ...formats: string[]) {
  return `${album.title} is available in the following formats: ${formats.join(
    ", ",
  )}`;
}

getAlbumFormats(
  { artist: "Radiohead", title: "OK Computer", year: 1997 },
  "CD",
  "LP",
  "Cassette",
);