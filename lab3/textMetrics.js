module.exports = {
    simplify: (text) => {
        if (!text || typeof text !== 'string') {
            throw 'need to provide a valid text input';
        }
        let str = text.toLowerCase();
        str = str.replace(/\\n/g, " ").replace(/\\t/g, " ");
        str = str.replace(/[^a-zA-Z\d]/g, " ").trim();
        str = str.replace(/\s+/g, " ");
        return str;
    },
    //simplify(`Hello, my -! This is a great day to say hello.\n\n\tHello! 2 3 4 23`);

    createMetrics: function (text) {
        if (!text || typeof text !== 'string') {
            throw 'need to provide a valid text input';
        }

        let totalLetters = 0;

        for (let i = 0; i < text.length; i++) {
            if (text.indexOf(/\w/, i)) {
                totalLetters++;
            }
        }

        let longWords = 0;
        let averageWordLength = 0;
        let str = text.split(" ");
        let totalWords = str.length;
        let wordMap = new Map();

        for (let i = 0; i < str.length; i++) {
            if (str[i].length > 6) {
                longWords++;
            }
            averageWordLength += str[i].length;
            if (!wordMap.has(str[i])) {
                wordMap.set(str[i], 1);
            } else {
                wordMap.set(str[i], wordMap.get(str[i]) + 1);
            }
        }

        let uniqueWords = wordMap.size;
        averageWordLength = averageWordLength / str.length;

        let result = {};
        result["totalLetters"] = totalLetters;
        result["totalWords"] = totalWords;
        result["uniqueWords"] = uniqueWords;
        result["longWords"] = longWords;
        result["averageWordLength"] = averageWordLength;
        let wordOccurrences = {};
        for (let [key, value] of wordMap.entries()) {
            wordOccurrences[key] = value;
        }
        result["wordOccurrences"] = wordOccurrences;
        return result;
    }
}
