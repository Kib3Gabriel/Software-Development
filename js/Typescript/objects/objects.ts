// Unions = or(|)          intersection = and(&)

//when we create a type, can reuse to create more values
type AnimalModel = {
  name: string;
  family: string;
  age: number;
};


const cow: AnimalModel = {
  name: "Cow",
  family: "Mammal",
  age: 6,
};

const croc: AnimalModel = {
  name: "Crocodile",
  family: "Reptile",
  age: 30,
};

//A value.
//

let AnimalMod: {
  name: string;
  family: string;
  age: number;
};

//  Brings an error, you can not assign a value, to assign another value
// let horse:AnimalMo ={}
// instead, change the value to a type as shown below
let horse: typeof AnimalMod = {
  name: "Horse",
  family: "Mammal",
  age: 20,
};

// Intersection Types. Uses(&) operator. All conditions must be met for it to be true
type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};

type SalesData = {
  unitsSold: number;
  revenue: number;
};

//
//AlbumSales contains type SalesData and Album
type AlbumSales = Album & SalesData;

const WakadinaliAlbum: AlbumSales = {
  title: "Wish You Were Here",
  artist: "Pink Floyd",
  releaseYear: 1975,
  unitsSold: 13000000,
  revenue: 65000000,
  // genre:""  //Will result to an error. It is not part of AlbumSales
};

// Intersection Types With Primitives
//
type StringAndNumber = string & number; //result to a type never

type User1 = {
  age: number;
};

type User2 = {
  age: string;
};

//age cannot be a number and a string at the same time

// type User = User1 & User2;
// const userInfo: User = {
//   age: "typeNever"  //results to type never
// };

type Person = {
  name: String;
};

type Employee = {
  employeeId: number; //making this optional won't affect the code (employeeId?: number)
};

type EmployeeInfo = Person & Employee;

const kibe: EmployeeInfo = {
  name: "Kibe",
  employeeId: 201,
};

// Interface Extends
// interface & type are used in same way
// extend gives the ability to extend to other interfaces

interface Album3 {
  title: string;
  artist: string;
  releaseYear: number;
}

//StudionAlbum, you are inheriting all the properties of an  Album interface
// helps inhearite the parent and add more properties.
// ommitting a value from an interface leads to an error, all properties must be provided
interface StudioAlbum extends Album3 {
  studio?: string;
  producer: string;
}

interface LiveAlbum extends Album3 {
  concertVenue: string;
  concertDate: Date;
}

//All properties from Album3 and StudioAlbum must be provided, unless the property is
// optional
const americanBeauty: StudioAlbum = {
  title: "American Beauty",
  artist: "Grateful Dead",
  releaseYear: 1970,
  studio: "Wally Heider Studios", //is optional
  producer: "Grateful Dead and Stephen Barncard",
};

const oneFromTheVault: LiveAlbum = {
  title: "One from the Vault",
  artist: "Grateful Dead",
  releaseYear: 1991,
  concertVenue: "Great American Music Hall",
  concertDate: new Date("1975-08-13"),
};

// COnstructing multiple interfaces
//   Doing multiple extends. i.e an interface that extends all interfaces above
interface AlbumBig extends Album3, StudioAlbum, LiveAlbum {}

const BigAlbum: AlbumBig = {
  title: "One from the Vault",
  artist: "Grateful Dead",
  releaseYear: 1991,
  producer: "Grateful Dead and Stephen Barncard",
  studio: "Wally Heider Studios",
  concertVenue: "Great American Music Hall",
  concertDate: new Date("1975-08-13"),
};

//   Interface extends vs Intersections
// 1.better errors

// 2.Interface is better for perfomance
// Interface is cached by Typescript while type is recomputed 



// Interface vs Types

// Types can be anything
// Interface can only represent object types. [], [], functions{}


// Merging interfaces
interface Album4 {
    title: string;
    artist: string;
  }
  
  interface Album4 {
    releaseYear: number;
    genres: string[];
  }


  const AlbumMerged:Album4 ={
    title: ' Feel it coming',
    artist: "The Weeked",
    releaseYear: 2018,
    genres:["Concert Edition", "Party Edition"]
  }


// Exercise 1: Create an Intersection Type
type BaseEntity = {
  id: string;
  createdAt: Date;
};

type User = {
  name: string;
  email: string;
} & BaseEntity;

type Product = {
  name: string;
  price: number;
} & BaseEntity;

// Exercise 2: Extending Interfaces
interface BaseEntity2 {
  id: string;
  createdAt: Date;
}

interface User3 extends BaseEntity2 {
  name: string;
  email: string;
}

interface Product2 extends BaseEntity2 {
  name: string;
  price: number;
}

//Dynamic Object Keys
// in TS, adding keys to objects leads to error
// in jS its okay to do objectName.key = value
//We need to tell TypeScript that we want to be
//able to dynamically add keys

const albumAwards = {}; //initializing an object
// albumAwards.Grammy =true;   //results to an error unline in JS

// 1 Using index signature for Dynamic keys
const albumAwards2: {
  [index: string]: boolean | number | string;
} = {};
albumAwards2["Best Album"] = true;
albumAwards2["Release Year"] = 2023;
albumAwards2["Artist"] = "John Doe";

const addToObject: {
  [index: number]: string;
} = {};
addToObject[1] = "Gabriel";
addToObject[2] = "Kibe";

// 2. Using a Record Type for Dynamic Keys
const albumAwards3: Record<string, boolean> = {};
albumAwards3.Grammy = true;

//record can use unions as keys
const albumAwards1: Record<"Grammy" | "MercuryPrize" | "Billboard", boolean> = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true,
};

type BaseAwards = "Grammy" | "MercuryPrize" | "Billboard";

type ExtendedAlbumAwards = Record<BaseAwards, boolean> & {
  [award: string]: boolean;
};

const extendedNominations: ExtendedAlbumAwards = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true, // Additional awards can be dynamically added
  "American Music Awards": true,
};

// interface
interface BaseAwards2 {
  Grammy: boolean;
  MercuryPrize: boolean;
  Billboard: boolean;
}

interface ExtendedInterface extends BaseAwards2 {
  [award: string]: boolean;
}

// PropertyKey
//  is a global type that represents the set of all possible keys that
//  can be used on an object, including string, number, and symbol.
type Album5 = {
  [key: PropertyKey]: string;
};

// Exercises
// Exercise1: Use an index Signature for Dynamic Keys
const score: {
  [index: string]: number;
} = {};

score.math = 95;
score.english = 90;
score.science = 85;

// Alternatively using Recod
const score2: Record<string, number> = {};
score2.math = 95;
score2.english = 90;
score2.physics = 95;


// Exercise 2: Default Properties with Dynamic Keys

interface RequiredScore {
  math: number;
  english: number;
}


interface Scores extends RequiredScore {
  [index:string]: number;
}

const studentScores: Scores ={
  math: 95,        
  english: 90,     
  chemistry: 85,   
  CRE: 88,         
  history: 92 
}
console.log(studentScores);


// Exercise 3: Restricting Object Keys With Records

// Here we have a configurations object, typed as Configurations
//which is currently unknown.
// The object holds keys for development, production, and staging, and 
//each respective key is associated with configuration details such as 
//apiBaseUrl and timeout.
// There is also a notAllowed key, which is decorated with a @ts-expect-error 
// comment. But currently, this is not erroring in TypeScript as expected.

type Environment = "development" | "production" | "staging";

type Configurations = Record<
  Environment,
  {
      apiBaseUrl:string;
      timeout:number;
  }
  >;

const configurations: Configurations = {
development: {
  apiBaseUrl: "http://localhost:8080",
  timeout: 5000,
},
production: {
  apiBaseUrl: "https://api.example.com",
  timeout: 10000,
},
staging: {
  apiBaseUrl: "https://staging.example.com",
  timeout: 8000,
},
// @ts-expect-error

notAllowed: {
  apiBaseUrl: "https://staging.example.com",
  timeout: 8000,
},
};

