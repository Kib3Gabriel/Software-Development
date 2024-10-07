function isPalindrome(str){

    let cleanedStr = str.replace(/[\W_]/g, '').toLowerCase();
      // Split the string into an array, reverse it, and join it back into a string

     let reversedStr = cleanedStr.split('').reverse().join('');
    // Check if the reversed string is equal to the original cleaned string
    console.log(cleanedStr); //prints a clean sentence.
    if (reversedStr === cleanedStr){
       
        return `${str} is a palindrome`;
    }

    return `${str} is not a palindrone`
     
}


console.log(isPalindrome('A man, a plan, a canal, Panama'));
console.log(isPalindrome('Was it a car or a cat I saw?'));
console.log(isPalindrome('Hello, world!'));