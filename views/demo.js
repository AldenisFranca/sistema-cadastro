let bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
var hash1 = bcrypt.hashSync("alberto1", salt);
var hash2 = bcrypt.hashSync("joana1", salt);
var hash3 = bcrypt.hashSync("aldenis1", salt);

console.log(hash1);
console.log(hash2);
console.log(hash3);

console.log(bcrypt.compareSync("alberto1", hash1));
console.log(bcrypt.compareSync("joana1", hash2));
console.log(bcrypt.compareSync("aldenis1", hash3));