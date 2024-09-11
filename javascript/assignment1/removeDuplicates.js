function myFunction(str) {
    var result = "";     //result is first declared as empty
    var freq = {};

    for(i=0;i<str.length;i++){
       let char = str[i];
       if(freq[char]) {
        freq[char]++;      
       } else {
        freq[char] =1
        result = result+char;
       }
    }
    return result;
  }

  console.log(myFunction("programming"));
  console.log(myFunction("hello world"));
  console.log(myFunction("aaaaa"));
  console.log(myFunction("abcd"));
  console.log(myFunction("aabbcc"));
