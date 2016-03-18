var exports = module.exports = {};
module.exports.sayHelloInEnglish = function() {
    return "HELLO";
};

module.exports.sayHelloInSpanish = function() {
    return "Hola";
};
console.log(module.exports);
/* 
 * this line of code re-assigns  
 * module.exports
 */
//module.exports = "Bonjour";