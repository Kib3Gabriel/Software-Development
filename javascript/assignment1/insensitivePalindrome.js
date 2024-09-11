
function isPalindrome(str) {
    let cleanedStr = str.replace(/[\W_]/g, '').toLowerCase();
    
    let reversedStr = cleanedStr.split('').reverse().join('');
    
    // Return true if the reversed string is equal to the cleaned string, otherwise false
    return reversedStr === cleanedStr;
}


console.log(isPalindrome('Aba'));
console.log(isPalindrome('Racecar'));
console.log(isPalindrome('Palindrome'));
console.log(isPalindrome('Madam'));
console.log(isPalindrome('Hello'));