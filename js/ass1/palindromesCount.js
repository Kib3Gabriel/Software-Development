function palindromeCount(str){
    let cleanedStr = str.replace(/[\W_]/g, '').toLowerCase();
    const palindromes = new Set(); // creates a new set to store distinct palindromic substrings
                                   // A set automatically ensures that there is no duplicate values

    function expandAroundCenter(left, right){
        while (left >= 0 && right < cleanedStr.length && cleanedStr[left] === cleanedStr[right]){
            palindromes.add(cleanedStr.substring(left, right + 1));
            left--;
            right++;
        }
    }
    // Iterate over each character in the cleaned string
    for (let i = 0; i < cleanedStr.length; i++) {
        // Find odd-length palindromes centered at cleanedStr[i]
        expandAroundCenter(i, i);

        // Find even-length palindromes centered between cleanedStr[i] and cleanedStr[i + 1]
        expandAroundCenter(i, i + 1);
    }

    return palindromes.size; // Return the count of distinct palindromes
}

// Test cases
console.log(palindromeCount('ababa')); // Outputs number of distinct palindromes
console.log(palindromeCount('racecar'));    // Outputs number of distinct palindromes
console.log(palindromeCount('aabb')); 
console.log(palindromeCount('a')); 
console.log(palindromeCount('abc'));         


// function countPalindromesInString(s) {
//     let count = 0;

//     if (s === s.split('').reverse().join('')) {
//         count += 1;
//     }

//     let testStr = '';
//     for (let i = 0; i < s.length; i++) {
//         testStr += s[i];

//         if (testStr === testStr.split('').reverse().join('')) {
//             count += 1;
//         }
//     }
//     return count;
// }




// console.log(countPalindromesInString("ababa"));
// console.log(countPalindromesInString("racecar"));
// console.log(countPalindromesInString("aabaa"));
// console.log(countPalindromesInString("a"));
// console.log(countPalindromesInString("abc"));