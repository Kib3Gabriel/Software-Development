// Q2 Write a JavaScript program to delete the rollno property from the following object.
const student = {
    name:"John Doe",
    class:"Teach2Give",
    regNo: 7039
};

console.log("Original object:", student);
delete student.regNo;
console.log(student);