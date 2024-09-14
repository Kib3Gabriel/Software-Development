//Q10 Write a JavaScript program to sort an array of JavaScript objects.

var library = [ 
  {
      title:  'The Road Ahead',
      author: 'Bill Gates',
      libraryID: 1254
  },
  {
      title: 'Walter Isaacson',
      author: 'Steve Jobs',
      libraryID: 4264
  },
  {
      title: 'Mockingjay: The Final Book of The Hunger Games',
      author: 'Suzanne Collins',
      libraryID: 3245
  }
];


library.sort(function(a, b) {
   return b.libraryID - a.libraryID;  // Descending order
});

console.log(library);
