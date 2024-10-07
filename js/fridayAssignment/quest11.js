// Q11. Write a JavaScript function to print all the methods in a JavaScript object.

function allMethods(myObject){
       return Object.getOwnPropertyNames(myObject).filter(function(property){
           return typeof myObject[property] == "function";
       });
   }
   
       console.log(allMethods(Math));
       console.log(allMethods(Array));
       function all_properties(myObject){
           return Object.getOwnPropertyNames(myObject);
       }
   
       console.log(all_properties(Math));
   
       console.log(all_properties(Array));
    