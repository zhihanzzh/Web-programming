module.exports = {
    printTriangle: (height) => {
        if (height === undefined || typeof height !== 'number' || height < 1) {
            throw 'The height you input is not valid';
        }

        let str = "";

        for (let i = 0; i < height; i++) {
            for (let n = height - i ; n > 0; n--) {
                str += ' ';
            }

            str += '/';

            if (i === height - 1) {
                for(let m = 0; m < 2 * i; m++) {
                    str += '-';
                }
            } else {
                
                for (let j = 2 * i; j > 0; j--) {
                    str += ' ';
                }
            }

            str += '\\\n';
        }

        return str;
    },
    
    printSquare: (height) => {
        if (height === undefined || typeof height !== 'number' || height < 2) {
            throw 'The height you input is not valid';
        }

        let str = "";

        for (let i = 0; i < height; i ++) {
            str += "    |";
            if (i === 0 || i === height - 1) {
                for (let j = 0; j < height; j++) {
                    str += "-";
                }
            } else {
                for (let j = 0; j < height; j++) {
                    str += " ";
                }
            }
            str += '|\n';
        }

        return str;
    },

    printRhombus: (height) => {
        if (height === undefined || typeof height !== 'number' || height < 2 || height % 2 !== 0) {
            throw 'The height you input is not valid';
        }

        let str = "";

        for (let i = 0; i < height; i++) {
            if (i < height / 2) {
                for (let m = height - i; m > 0; m--) {
                    str += " ";
                } 
                str += '/';

                if (i === 0) {
                    str += '-';
                } else {
                    for (let m = 1 + 2 * i; m > 0; m--) {
                        str += ' ';
                    }
                }
                str += '\\\n'
            } else {

                for (let m = i + 1; m > 0; m--) {
                    str += " ";
                }

                str += '\\';

                if (i === height - 1) {
                    str += '-';
                } else {
                    for (let m = 1 + 2 * (height - i - 1); m > 0; m--) {
                        str += ' ';
                    }
                }
                
                str += '/\n';
            }
        }

        return str;
    }
};