    const printShape = require('./printShape');


    //printShape.printTriangle(0);//throw
    //printShape.printTriangle("3");//throw
    for (let i = 0; i < 10; i++) {
        let triangle = printShape.printTriangle(1 + 2 * i);
        console.log(`the triangle with height of ${1 + 2 * i} is printed as follow`);
        console.log(triangle);
    }
    console.log();

    //printShape.printSquare(1);//throw
    for (let i = 2; i <= 11; i++) {
        let square = printShape.printSquare(i);
        console.log(`the square with height of ${i} is printed as follow`);
        console.log(square);
    }
    console.log();
    
    //printShape.printRhombus(5);//throw
    for (let i = 1; i <= 10; i++) {
        let rhombus = printShape.printRhombus(2 * i);
        console.log(`the rhombus with height of ${2 * i} is printed as follow`);
        console.log(rhombus);
    }