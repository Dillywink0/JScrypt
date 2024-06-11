const readlineSync = require('readline-sync');
const colors = require('colors');

// Define the substitution mapping
const substitutionMapping = {
    'a': '!',
    'b': '@',
    'c': '#',
    'd': '$',
    'e': '%',
    'f': '^',
    'g': '&',
    'h': '*',
    'i': '(',
    'j': ')',
    'k': '_',
    'l': '+',
    'm': '-',
    'n': '=',
    'o': '{',
    'p': '}',
    'q': '[',
    'r': ']',
    's': ':',
    't': ';',
    'u': '/',
    'v': '<',
    'w': '>',
    'x': '.',
    'y': ',',
    'z': '?',
    ' ': ' '
};

// Function to encrypt the input string using substitution cipher
function substitutionEncrypt(text) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i].toLowerCase();

        // Check if the character is in the mapping, if yes, replace it, else keep the original character
        const encodedChar = substitutionMapping[char] || char;

        result += encodedChar;
    }

    return result;
}

// Function to decrypt the input string using substitution cipher
function substitutionDecrypt(text) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i].toLowerCase();

        // Check if the character is in the reverse mapping, if yes, replace it, else keep the original character
        const decodedChar = Object.keys(substitutionMapping).find(key => substitutionMapping[key] === char) || char;

        result += decodedChar;
    }

    return result;
}

(async () => {
    const type = readlineSync.question(`What would you like to do? (encrypt = ${'0'.green}, decrypt = ${'1'.red}): `.yellow);
    if (!['0', '1'].includes(type)) return console.log('ERROR: Only type 0 & 1 is available.'.red);

    switch (type) {
        case '0': {
            const string = readlineSync.question(`[${'1'.green}/1] Input the string to encrypt: `.green);

            const encryptedString = substitutionEncrypt(string);

            console.log();
            console.log(`[${'+'.green}] Encrypted string: ${encryptedString.green}`);
            break;
        }
        case '1': {
            const encodedString = readlineSync.question(`[${'1'.red}/1] Input the string to decrypt: `.red);

            const decryptedString = substitutionDecrypt(encodedString);

            console.log(`[${'+'.green}] Decrypted string: ${decryptedString.green}`);
        }
    }
})();
