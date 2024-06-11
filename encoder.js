const fs = require('fs');

// Define the simpleEncoder function
function simpleEncoder(inputString) {
    // Define your substitution mapping
    const mapping = {
        'a': '1',
        'b': '2',
        'c': '3',
        // Add more mappings as needed
    };

    // Convert input string to lowercase
    inputString = inputString.toLowerCase();

    let encodedString = '';

    // Iterate through each character in the input string
    for (let i = 0; i < inputString.length; i++) {
        const currentChar = inputString[i];
        
        // Check if the character is in the mapping, if yes, replace it, else keep the original character
        const encodedChar = mapping[currentChar] || currentChar;

        encodedString += encodedChar;
    }

    return encodedString;
}

// Function to encrypt the content of a JavaScript file
function encryptFile(filePath) {
    // Read the content of the JavaScript file
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Encrypt the content using simpleEncoder function
    const encryptedContent = simpleEncoder(fileContent);

    // Define the new file path for the encrypted file
    const encryptedFilePath = filePath.replace('.js', '_encrypted.js');

    // Write the encrypted content to a new file
    fs.writeFileSync(encryptedFilePath, encryptedContent, 'utf8');

    console.log(`File encrypted successfully: ${encryptedFilePath}`);
}

// Call the function with the path to the JavaScript file you want to encrypt
encryptFile('path/to/your/javascript/file.js');
