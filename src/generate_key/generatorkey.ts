var secureRandom = require('secure-random')
var signingKey = secureRandom(256,{type:'Buffer'})
var base64SigningKey = signingKey.toString('base64');
