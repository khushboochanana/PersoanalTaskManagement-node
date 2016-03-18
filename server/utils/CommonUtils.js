

exports.getUserHome=function () {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

exports.generateToken=function () {
    return "tok_"+Math.random()+"_001"
};