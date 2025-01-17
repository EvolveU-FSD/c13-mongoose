import { disconnectDb } from "../db.js";
import { checkPassword } from './userData.js';

if (process.argv.length < 4) {
    console.log('Usage: node checkPassword <username> <password>')
    process.exit()
  }
  
const username = process.argv[2]
const password = process.argv[3]

try {
    const user = await checkPassword(username, password)
    if (user) {
        console.log('Password is good!')
        console.log(user)
    }
    else {
        console.log('Password match failed')
    }
} catch (error) {
    console.error("Error checking password on user:", error.message);
} finally {
    await disconnectDb(); // Ensure the database connection is closed
    console.log("Disconnected from database.");
}
