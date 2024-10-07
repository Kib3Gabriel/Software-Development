import { Equal,Expect } from "@type-challenges/utils";

// const logId = (id: string | number | boolean) => {
//   console.log(id);
// };
// logId("abc");

// logId(123);
// logId(true);

// // union on aliasses

// type Id = number | string;
// function logId2(id2: Id) {
//   console.log(id2);
// }

// // Literal types. Respresent specific primitive. Gives the specific values
// type YesOrNo = "yes" | "no";
// type StatusCode = 200 | 404 | 500;
// type TrueOrFalse = true | false;

// function YesNo(yn: YesOrNo) {
//   console.log(yn);
// }

// // combining unions with unions
// type DigitalFormat = "MP3" | "FLAC";

// type PhysicalFormat = "LP" | "CD" | "Cassette";

// type albumFormat = DigitalFormat | PhysicalFormat; //combined union

// const getAlbumFormats = (album: albumFormat) => {};

// getAlbumFormats("MP3");

// // Exercise1 : String or null

// import { Expect, Equal } from "@type-challenges/utils";

// function getUsername(username: string | null) {
//   if (username !== null) {
//     return `User: ${username}`;
//   } else {
//     return "Guest";
//   }
// }

// const result = getUsername("Alice");

// type test = Expect<Equal<typeof result, string>>;

// const result2 = getUsername(null);

// type test2 = Expect<Equal<typeof result2, string>>;

// // Exercise 2: Restricting Function Parameters

// type Direction = "up" | "down" | "left" | "right";
// function move(direction: Direction, distance: number) {
//   // Move the specified distance in the given direction
// }

// move("up", 10);
// move("left", 5);

// move(
//   // @ts-expect-error - "up-right" is not a valid direction
//   "up-right",
//   10
// );

// move(
//   // @ts-expect-error - "down-left" is not a valid direction
//   "down-left",
//   20
// );

// //   Narrowing
// let name2: string; //wider version
// type name3 = "dog" | "cow"; //narrow version (cannot pass any random string)

// const logSize = (size: string) => {
//   console.log(size.toUpperCase());
// };

// logSize("small");

const recordOfSizes = {
  small: "small",
  large: "large",
};

const logSize2 = (size: "small" | "large") => {
  //Does not access an random string
  console.log(recordOfSizes[size]);
};

  logSize2('medium')  //only uses strings that are declared
  logSize2("large")

//   Narrowing using typeof and if statement
const getArrays = [1, "John", 3, "Doe"];
const numbers = getArrays.map((item) => {
  if (typeof item === "number") {
    return item;
  }
});

console.log(numbers);

// Exercise 1: Narrowing with if Statements
function validateUsername(username: string | null): boolean {
    if(typeof username === "string"){
        return username.length > 5
    }
  
    return false
  }

  it('should return true for valid usernames', () => {
    expect(validateUsername('Matt1234')).toBe(true)
  
    expect(validateUsername('Alice')).toBe(false)
  
    expect(validateUsername('Bob')).toBe(false)
  })



  // Using in to Narrow
  type APIResponse =
  | {
      data: {
        id: string;
      };
    }
  | {
      error: string;
    };

const handleResponse = (response: APIResponse) => {
    if ('data' in response) {
      return response.data.id
    } else {
      throw new Error(response.error)
    }
  }


//   Exercise 2: Throwing Errors to Narrow
const appElement = document.getElementById('app')
if(!appElement){
    throw new Error("could not find app element")
}
type Test = Expect<Equal<typeof appElement, HTMLElement>>









const getAlbumYear = (year: string | number | boolean) => {
  if (typeof year === "string") {
    console.log(`The album was released in ${year}.`); // `year` is string
  } else if (typeof year === "number") {
    console.log(`The album was released i{n ${year}.`); // `year` is number | boolean
  }

  console.log(year); // `year` is string | number | boolean
};




// // Narrowing using instanceof

// console.log([] instanceof Object); //true
// console.log({} instanceof Object); //true
// console.log(function () {} instanceof Object); //true




// // Exercise
// // A valide username is only valide when username is  greater than 5
// function validateUsername(username: string | null): boolean {
//   if (typeof username === "string" && username.length > 5) {
//     return true;
//   }

//   return false;
// }

// it("should return true for valid usernames", () => {
//   expect(validateUsername("Matt1234")).toBe(true);

//   expect(validateUsername("Alice")).toBe(false);

//   expect(validateUsername("Bob")).toBe(false);
// });

// type APIResponse =
//   | {
//       data: {
//         id: string;
//       };
//     }
//   | {
//       error: string;
//     };

// // const handleResponse = (response: APIResponse) => {
// //   // How do we check if 'data' is in the response?

// //   if ("data") {
// //     return response.data.id
// //   } else {
// //     throw new Error(response.error)
// //   }
// // }

// // test('passes the test even with the error', () => {
// //     // there is no error in runtime

// //     expect(() =>
// //       HandleResponseOrThrowError({
// //         error: 'Invalid argument',
// //       }),
// //     ).not.toThrowError()

// //     // but the data is returned, instead of an error.

// //     expect(
// //       HandleResponseOrThrowError({
// //         error: 'Invalid argument',
// //       }),
// //     ).toEqual("Should this be 'Error'?")
// //   })

// // Unknown
// // Unknown is a type
// // any switches off the typesystem(get the errors on type)
// // any is not a type

// const handleWebhookInput = (input: unknown) => {
//   input = "John Doe";
//   // input.toUppercase()  c//cannot directly access the variable
// };

// const handleWebhookInputWithAny = (input: any) => {
//   // no error
//   input.toUppercase();
// };

// const somethingDangerous = () => {
//   if (Math.random() > 0.5) {
//     throw new Error("Something went wrong");
//   }

//   return "all good";
// };

// try {
//   somethingDangerous();
// } catch (error) {
//   if (true) {
//     // console.error(error.message);
//   }
// }

// // Desciminated unions
// // The Problem: The Bag Of Optionals

// // type State = {
// //   status: "loading" | "success" | "error";
// //   error?: string;
// //   data?: string;
// // };

// type State =
//   | {
//       status: "loading";
//     }
//   | {
//       status: "error";
//       error: "error";
//     }
//   | {
//       status: "success";
//       data: string;
//     };

// // // Imagine we have a renderUI function that returns a string
// // const renderUI = (state: State) => {
// //   if (state.status === "loading") {
// //     return "Loading...";
// //   }

// //   if (state.status === "error") {
// //     return `Error: ${state.error.toUpperCase()}`;
// //   }

// //   if (state.status === "success") {
// //     return `Data: ${state.data}`;
// //   }
// // };

// // //   There is this possibility

// // // union type
// // type myUnion = number | string;

// // function fun(id: myUnion) {
// //   console.log(id);
// // }

// // type AllSortOfStuff =
// //   | string
// //   | number
// //   | boolean
// //   | object
// //   | null
// //   | {
// //       name: string;
// //       age: number;
// //     };

// // function myFuntion(id: AllSortOfStuff) {}

// // type firstUn = "MP3" | "FLAC";
// // type secUn = "LP" | "CD" | "Cassete";

// // type result = firstUn | secUn;

// // const getElements = (format: result) => {};

// // getElements("MP3");

// // type directionMove = "up" | "down" | "right" | "left";

// // function move1(direction: directionMove, distance: number) {
// //   // Move the specified distance in the given direction
// // }

// // move1("up", 10);

// // move1("left", 5);

// // move1(
// //   // @ts-expect-error - "up-right" is not a valid direction
// //   "up-right",
// //   10
// // );

// // move1(
// //   // @ts-expect-error - "down-left" is not a valid direction

// //   "down-left",
// //   20
// // );

// // //   Narrowinging with typeof
// // const getAlbumYear2 = (year: string | number) => {
// //   if (typeof year === "string") {
// //     console.log(`The album was released in ${year.toUppercase()}.`); // `year` is string
// //   } else if (typeof year === "number") {
// //     console.log(`The album was released in ${year.toFixed(0)}.`); // `year` is number | boolean
// //   }
// //   console.log(year); //year is string | number |boolean
// // };

// // type userName = string | null;
// // function validateUsername1(username: userName): boolean {
// //   if (typeof username === "string") {
// //     return username.length > 5;
// //   }
// //   return false;
// // }

// // it("should return true for valid usernames", () => {
// //   expect(validateUsername("Matt1234")).toBe(true);

// //   expect(validateUsername("Alice")).toBe(false);

// //   expect(validateUsername("Bob")).toBe(false);
// // });

// //   type APIResponse2 =
// //   | {
// //       data: {
// //         id: string
// //       }
// //     }
// //   | {
// //       data?:undefined
// //       error: string
// //     }

// // const handleResponse = (response2: APIResponse2) => {
// //     if ('data' in response2) {
// //       return response2.data.id
// //     } else {
// //       throw new Error(response2.error)
// //     }
// //   }

// // test('passes the test even with the error', () => {
// //     // there is no error in runtime

// //     expect(() =>
// //       HandleResponseOrThrowError({
// //         error: 'Invalid argument',
// //       }),
// //     ).not.toThrowError()

// //     // but the data is returned, instead of an error.

// //     expect(
// //       HandleResponseOrThrowError({
// //         error: 'Invalid argument',
// //       }),
// //     ).toEqual("Should this be 'Error'?")
// //   })

// const somethingDangerous1 = () => {
//     if (Math.random() > 0.5) {
//       throw new Error('Something went wrong')
//     }

//     return 'all good'
//   }

//   try {
//     somethingDangerous()
//   } catch (error) {
//     if (true) {
//         const error = new Error("some error message")
//       console.error(error.message)
//     }
//   }

//   const parseValue = (value: unknown):string => {
//     if (
//         typeof value === 'object' &&
//         value !== null &&
//         'data' in value &&
//         typeof value.data === 'object' &&
//         value.data !== null &&
//         "id" in value.data &&
//         typeof value.data.id === "string"
//       ) {
//       return value.data.id
//     }

//     throw new Error('Parsing error!')
//   }

//   it('Should handle a { data: { id: string } }', () => {
//     const result = parseValue({
//       data: {
//         id: '123',
//       },
//     })

//     type test = Expect<Equal<typeof result, string>>

//     expect(result).toBe('123')
//   })

//   it('Should error when anything else is passed in', () => {
//     expect(() => parseValue('123')).toThrow('Parsing error!')

//     expect(() => parseValue(123)).toThrow('Parsing error!')
//   })

// type State2 =
//   | {
//       status: 'loading'
//     }
//   | {
//       status: 'error'
//       error:string
//     }
//   | {
//       status: 'success'
//       data:string
//     }

//   const renderUI2 = (state2: State2) => {
//     if (state2.status === 'loading') {
//       return 'Loading...'
//     }

//     if (state2.status === 'error') {
//       return `Error: ${state2.error.toUpperCase()}`
//     }

//     if (state2.status === 'success') {
//       return `Data: ${state2.data}`
//     }

// type LoadingState = {
//   status: "loading";
// };

// type ErrorState = {
//   status: "error";
//   error: string;
// };

// type SuccessState = {
//   status: "success";
//   data: string;
// };

// type State = LoadingState | ErrorState | SuccessState;

// const renderUI = (state: State) => {
//   if (state.status === "loading") {
//     return "Loading...";
//   }

//   if (state.status === "error") {
//     return `Error: ${state.error.toUpperCase()}`;
//   }

//   if (state.status === "success") {
//     return `Data: ${state.data}`;
//   }
// };

// //   Reusable Type Guards

// //  Discriminated Unions
// // Exercise 1: Destructuring a Discriminated Union

// type Circle = {
//   kind: "circle";
//   radius: number;
// };

// type Square = {
//   kind: "square";
//   sideLength: number;
// };

// type Shape = Circle | Square;

// function calculateArea(shape:Shape) {
//   if (shape.kind === "circle") {
//     const {radius} = shape
//     return Math.PI * radius * radius;
//   } else {
//     const {sideLength} = shape
//     return sideLength * sideLength;
//   }
// }



// //Exercise 2: Narrowing a Discriminated Union with a Switch Statement

// function calculateArea2(shape: Shape) {
//     // if (shape.kind === 'circle') {
//     //   return Math.PI * shape.radius * shape.radius
//     // } else {
//     //   return shape.sideLength * shape.sideLength
//     // }


//     // Alternative switch cases

//     switch(shape.kind){
//     case('circle'):
//         return Math.PI * shape.radius * shape.radius

//     case('square'):
//         return shape.sideLength * shape.sideLength
//     }
    
// }
// // Not accounting for all cases
// function calculateArea3(shape: Shape) {
//     switch (shape.kind) {
//       case 'circle': {
//         return Math.PI * shape.radius * shape.radius
//       }
//       // case "square": {
//       //   return shape.sideLength * shape.sideLength;
//       // }
//       // Potential additional cases for more shapes
//     }
//   }



// //Exercise3 Discriminated tuples
// import { Equal,Expect } from "@type-challenges/utils";
// type User={
//     id:number
//     name: string
//     email:string
// }

// type APIResponse =["error",] | ["success", User[]]
// async function fetchData(): Promise<APIResponse> {
//     try {
//       const response = await fetch('https://api.example.com/data')
  
//       if (!response.ok) {
//         return [
//           'error',
//           // Imagine some improved error handling here
//           'An error occurred',
//         ]
//       }
  
//       const data = await response.json()
  
//       return ['success', data]
//     } catch (error) {
//       return ['error', 'An error occurred']
//     }
//   }

//   async function exampleFunc() {
//     const [status, value] = await fetchData()
  
//     if (status === 'success') {
//       console.log(value)
  
//       type test = Expect<Equal<typeof value, User[]>>
//     } else {
//       console.error(value)
  
//       type test = Expect<Equal<typeof value, string>>
//     }
//   }