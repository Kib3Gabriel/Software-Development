// // Function to check if a substring s[low..high] is a palindrome
// function checkPal(s, low, high) {
//     while (low < high) {
//         if (s[low] !== s[high])
//             return false;
//         low++;
//         high--;
//     }
//     return true;
// }

// // This function prints the longest palindrome substring
// // It also returns the length of the longest palindrome
// function longestPalSubstr(s) {
//     const n = s.length;
    
//     // All substrings of length 1 are palindromes
//     let maxLen = 1;
//     let start = 0;

//     // Nested loop to mark start and end index
//     for (let i = 0; i < n; i++) {
//         for (let j = i; j < n; j++) {
          
//             // Check if the current substring is 
//             // a palindrome
//             if (checkPal(s, i, j) && (j - i + 1) > maxLen) {
//                 start = i;
//                 maxLen = j - i + 1;
//             }
//         }
//     }

//     return s.substring(start, start + maxLen);
// }

// // Driver Code
// const s = "kamau";
// console.log(longestPalSubstr(s));

function isAnagram(str1, str2){
    str1=str1.replace(/\s/g, '').toLowerCase();
    str2=str2.replace(/\s/g, '').toLowerCase();

    if(str1.length != str2.length){
        return false;
    }
    str1 = str1.split('').sort().join('');
    str2 = str2.split('').sort().join('');
    return str1 === str2
}
const check = isAnagram('Silent', 'Listen');
console.log(check);