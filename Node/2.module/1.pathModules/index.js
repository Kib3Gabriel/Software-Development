//path.exname(path)
// returns the extension of the path, from the last occurrence of 
// the . (period) character to end of string in the last portion of the path.

const path =require('path')
console.log(path.extname('index.html'));
// Returns: '.html'

console.log(path.extname('index.coffee.md'));
// Returns: '.md'

console.log(path.extname('index.'));
// Returns: '.'

console.log(path.extname('index'));
// Returns: ''

console.log(path.extname('.index'));
// Returns: ''

console.log(path.extname('.index.md'));
// Returns: '.md' 




//path.join
// joins all given path segments together using the platform-specific
// separator as a delimiter, then normalizes the resulting path.

console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));
// Returns: '\foo\bar\baz\asd



// path.basename(path[, suffix])
//returns the last portion of a path
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
// Returns: 'quux.html'

console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));
// Returns: 'quux'
