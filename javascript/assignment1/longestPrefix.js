function longestCommonPrefix(arr) {
    if (arr.length === 0) return '';
  
    let prefix = arr[0]; // Take the first string as the initial prefix
  
    // Iterate through the rest of the array
    for (let i = 1; i < arr.length; i++) {
      // Keep checking the prefix with the current string
      while (arr[i].indexOf(prefix) !== 0) {
        // Reduce the prefix if it doesn't match the current string
        prefix = prefix.slice(0, -1);
  
        // If the prefix is reduced to an empty string, return ''
        if (prefix === '') return '';
      }
    }
  
    return prefix;
}
  
  console.log(longestCommonPrefix(["flower", "flow", "flight"])); 
  console.log(longestCommonPrefix(["dog", "racecar", "car"]));   
  console.log(longestCommonPrefix(["interspecies", "interstellar", "interstate"])); 
  console.log(longestCommonPrefix(["prefix", "prefixes", "preform"])); 
  console.log(longestCommonPrefix(["apple", "banana", "cherry"])); 
