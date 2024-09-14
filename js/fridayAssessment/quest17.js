// // Q17.A JavaScript function to check whether an object contains a given property.


function checkProperty(object, property) {
    const hasProperty = object.hasOwnProperty(property);
    
  
    if (hasProperty) {

      console.log(`The object contains the "${property}" property, value: ${object[property]}`);
    }
     else {
      console.log(`The object does not contain the "${property}" property.`);
    }
  }
  
  const student = {
    fName: 'John',
    sName: 'Doe',
    regNo: 4567
  };
  
  checkProperty(student, 'fName');  
  checkProperty(student, 'sName');    
  checkProperty(student, 'age');   //doesn't contain age property
  
  