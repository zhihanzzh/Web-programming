const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));

exports.getFileAsString = async function (path) {

    if (!path || typeof path !== 'string') {
        throw "Need to provide a valid file path";
    }
    if (fs.existsSync(path)) {
        return await fs.readFileAsync(path, "utf-8");
    } else {
        throw 'Need to provide a valid file path';  
    }

    
}

exports.getFileAsJSON = async function (path) {

    if (!path || typeof path !== 'string') {
        throw "Need to provide a valid file path";
    }

    const fileContent = await fs.readFileAsync(path, "utf-8");
    const result = JSON.parse(fileContent);
    console.log(fileContent);
}

exports.saveStringToFile = async function (path, text) {
    if (!path || typeof path !== 'string') {
        throw "Need to provide a valid file path";
    }
    if (!text || typeof text !== 'string') {
        throw "Need to provide a valid text input";
    }

    await fs.writeFileAsync(path, text)
}

exports.saveJSONToFile = async (path, obj) => {
    if (!path || typeof path !== 'string') {
        throw "Need to provide a file path";
    }

    if (!obj) {
        throw "Need to provide valid content";
    }
    
    const text = JSON.stringify(obj, null, 4);
    await fs.writeFileAsync(path, text);
}


