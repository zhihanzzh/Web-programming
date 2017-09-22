const fileData = require("./fileData");
const textMetrics = require("./textMetrics");
const fs = require("fs");

async function main(i) {
    if(fs.existsSync(`chapter${i}.result.json`)) {
        console.log(`the file "chapter${i}.result.json" exists, reading from the file`);
        const fileContent = await fs.readFileAsync(`chapter${i}.result.json`, "utf-8");
        console.log(`=====the file content listed below======`);
        console.log(fileContent);
        console.log(`=========end of file=========`);
        console.log();
    } else {
            console.log(`the file "chapter${i}.result.json" doesn't exist, creating new file`);
            console.log(`====reading from chapter${i}.txt====`);
            let text = await fileData.getFileAsString(`chapter${i}.txt`);
            console.log(`====finish reading, simplifying====`);
            text = await textMetrics.simplify(text);
            console.log(`====finish simplify, creating chapter${i}.debug.txt====`);
            await fileData.saveStringToFile(`chapter${i}.debug.txt`, text);
            console.log(`====finish writing, creating Metrics====`);
            text = await textMetrics.createMetrics(text);
            console.log(`====finish creating Metrics, creating chapter${i}.result.json====`);
            await fileData.saveJSONToFile(`chapter${i}.result.json`, text);
            console.log(`====finish writing, the result is====`);
            console.log(text);
            console.log(`====End====`);
            console.log();
        }
    }

foo= async () => {
    for (let i = 1; i <= 3; i++) {
        await main(i);
    }
}

foo();



