const readlineSync = require('readline-sync');
const colors = require('colors');

function caesarCipherEncrypt(text, shift) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        // Ignore non-alphabetic characters
        if (!char.match(/[a-z]/i)) {
            result += char;
            continue;
        }

        // Get the character code and handle uppercase/lowercase separately
        let code = char.charCodeAt(0);
        const isUpperCase = (code >= 65 && code <= 90);
        code = code - (isUpperCase ? 65 : 97);

        // Apply the shift and handle wrapping
        code = (code + shift) % 26;

        // Convert back to a character and preserve case
        char = String.fromCharCode(code + (isUpperCase ? 65 : 97));
        result += char;
    }

    return result;
}

function caesarCipherDecrypt(text, shift) {
    // To decrypt, simply shift in the opposite direction
    return caesarCipherEncrypt(text, 26 - shift);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the elements at indices i and j
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

function hexEncode(str) {
    let hexStr = '';
    for (let i = 0; i < str.length; i++) {
        const hex = str.charCodeAt(i).toString(16);
        hexStr += hex.padStart(2, '0');
    }
    return hexStr;
}

function hexDecode(hexStr) {
    let str = '';
    for (let i = 0; i < hexStr.length; i += 2) {
        const hex = hexStr.substr(i, 2);
        const charCode = parseInt(hex, 16);
        str += String.fromCharCode(charCode);
    }
    return str;
}

(async () => {
    const type = readlineSync.question(`What would you like to do? (encrypt = ${'0'.green}, decrypt = ${'1'.red}): `.yellow);
    if (!['0', '1'].includes(type)) return console.log('ERROR: Only type 0 & 1 is available.'.red);

    switch (type) {
        case '0': {
            let string = readlineSync.question(`[${'1'.green}/1] Input the string to encrypt: `.green);
            const num = Math.floor(Math.random() * 30) + 1;

            const encryptions = shuffleArray(['base64', 'hex', 'caesar']);

            for (let i = 0; i < encryptions.length; i++) {
                switch (encryptions[i]) {
                    case 'base64':
                        string = Buffer.from(string).toString('base64');
                        break;
                    case 'hex':
                        string = hexEncode(string);
                        break;
                    case 'caesar':
                        string = caesarCipherEncrypt(string, num);
                        break;
                }
            }

            console.log();
            console.log({ string, caesar_shifter: num, encryptions: encryptions.join(',') });
            break;
        }
        case '1': {
            const encodedString = readlineSync.question(`[${'1'.red}/3] Input the string to decrypt: `.red);
            const caesarShifter = parseInt(readlineSync.question(`[${'2'.red}/3] Input the Caesar shifter to decrypt: `.red));
            const encryptions = readlineSync.question(`[${'3'.red}/3] Input the encryptions (ex. hex,base64,caesar): `.red).split(',');

            let decodedString = encodedString;

            for (let i = encryptions.length - 1; i >= 0; i--) {
                switch (encryptions[i]) {
                    case 'base64':
                        decodedString = Buffer.from(decodedString, 'base64').toString('utf-8');
                        break;
                    case 'hex':
                        decodedString = hexDecode(decodedString);
                        break;
                    case 'caesar':
                        decodedString = caesarCipherDecrypt(decodedString, caesarShifter);
                        break;
                }
            }

            console.log(`[${'+'.green}] Decoded string: ${decodedString.green}`);
        }
    }
})();
