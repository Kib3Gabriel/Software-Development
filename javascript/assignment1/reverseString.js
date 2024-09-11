function reverseString(str){
    let sentense = str.toLowerCase().split('').reverse().join('');
    return sentense
}


console.log(reverseString("Who is the cow"));