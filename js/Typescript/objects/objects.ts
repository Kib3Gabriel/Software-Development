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

type User3 = {
    id: string;
    createdAt: Date;
    name: string;
    email: string;
  };
  
  type Product = {
    id: string;
    createdAt: Date;
    name: string;
    price: number;
  };


//   More exercises











// Dynamic Keys
//In TS, adding keys to values, leads to error
// In JS, its okay to do objectName.key = value



// const albumAwards ={};
// albumAwards.Grammy = true;

const albumAwards2:{
    [index:string]:boolean | number | string
}={};


albumAwards2["Best Album"] = true;
albumAwards2["Release Year"] = 2023;
albumAwards2["Artist"] = "John Doe";
console.log(albumAwards2);


const albumAwards3:Record<string,boolean | number | string>={};


albumAwards3["Best of  Album"] = true;
albumAwards3["Release of the Year"] = 2023;
albumAwards3["Artist"] = "John De Doe";
console.log(albumAwards3);












// Combining known and Dynamic keys
type BaseAwards = "Granny" | "MercuryPrize" |"Billboard";

type ExtendedAlbumAwards = Record<BaseAwards, boolean > &{
    [award:string]: boolean;
};

const extendedNomainations: ExtendedAlbumAwards ={
    Granny:true,
    MercuryPrize:false,
    Billboard: true,
    "American Music Award": true
}






// Access properties declared as object type
// Narrowing
let obj : object={name:"Alice"};
// obj.name  // brings an error
// type assertion to access the property
(obj as {name:string}).name  //Alice


// object types in function
function processValue(value:object){
    console.log(value);
}


type AlbumDeep = {
    title: string;
    artist: string;
    releaseYear?: number;
    genre?: {
      parentGenre?: string;
      subGenre?: string;
    };
  };
  
  type RequiredAlbum = Required<AlbumDeep>;


//   Pick
// Selects certain properties from type AlbumDeep
type AlbumData = Pick<AlbumDeep, "title" | "artist">;


//Omit
// Opposite of Pick
// removes certain properties from type AlbumDeep
type AlbumDataOmit =Omit<AlbumDeep, 'id' | 'releaseYear' | 'genre'>;

