

/**
 * index.js
 * A simple CLI to generate random passwords based on user-provided flags.
 * Author: Jaowad Hossain
 * Date: January, 2025
 */

const args = process.argv.slice(2);

/**
 * Display the help message.
 */
function displayHelp() {
  console.log(`
Usage: node index.js [options]

Options:
  --help            Show help message
  --length <num>    Specify the length of the password (default is 8)
  --uppercase       Include uppercase letters
  --numbers         Include digits
  --symbols         Include special characters

Examples:
  node index.js --length 12
  node index.js --length 10 --uppercase
  node index.js --numbers --symbols
`);
}

/**
 * Generate a random password according to user-specified options.
 * @param {number} length - The desired length of the password.
 * @param {boolean} useUpper - Whether to include uppercase letters.
 * @param {boolean} useNumbers - Whether to include numbers.
 * @param {boolean} useSymbols - Whether to include symbols.
 * @returns {string} - The generated password.
 */
function generatePassword(length, useUpper, useNumbers, useSymbols) {
  // Base character set: lowercase letters
  let chars = 'abcdefghijklmnopqrstuvwxyz';

  if (useUpper) {
    chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  if (useNumbers) {
    chars += '0123456789';
  }

  if (useSymbols) {
    chars += '!@#$%^&*()-_=+[]{};:,.<>?';
  }

  // If for some reason chars is empty (which shouldn't happen),
  // we'll throw an error. But by default we have lowercase letters,
  // so it shouldn't occur unless we remove it by mistake.
  if (!chars) {
    throw new Error('No valid characters specified for password generation.');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

/** 
 * Parse arguments. We'll look for flags like:
 * --help
 * --length 10
 * --uppercase
 * --numbers
 * --symbols
 */
function parseArgs(argsArray) {
  const options = {
    length: 8,      // default password length
    uppercase: false,
    numbers: false,
    symbols: false,
    help: false
  };

  for (let i = 0; i < argsArray.length; i++) {
    const arg = argsArray[i];

    switch (arg) {
      case '--help':
        options.help = true;
        break;
      case '--length':
        // The next element should be the length
        const lengthValue = argsArray[i + 1];
        if (!lengthValue || isNaN(lengthValue) || parseInt(lengthValue, 10) < 1) {
          console.error('Error: Invalid value for --length. It must be a positive integer.');
          process.exit(1);
        }
        options.length = parseInt(lengthValue, 10);
        i++; // skip the next arg since we consumed it as length
        break;
      case '--uppercase':
        options.uppercase = true;
        break;
      case '--numbers':
        options.numbers = true;
        break;
      case '--symbols':
        options.symbols = true;
        break;
      default:
        // If the argument isn't recognized, show an error
        console.error(`Unrecognized argument: ${arg}`);
        console.error('Use --help for usage information.');
        process.exit(1);
    }
  }

  return options;
}

// Main Execution Flow
try {
  const { help, length, uppercase, numbers, symbols } = parseArgs(args);

  if (help) {
    displayHelp();
    process.exit(0);
  }

  const password = generatePassword(length, uppercase, numbers, symbols);
  console.log(`Your generated password is: ${password}`);
} catch (err) {
  console.error('An error occurred while generating the password:', err.message);
  process.exit(1);
}
