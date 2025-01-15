import { disconnectDb } from "../db.js";
import { createUser } from './userData.js';

if (process.argv.length < 4) {
    console.log('Usage: node createUser <username> <password>')
    process.exit()
  }
  
const username = process.argv[2]
const password = process.argv[3]

try {
    await createUser(username, password)
    console.log('Created user: ', username)
} catch (error) {
    console.error("Error creating user:", error.message);
} finally {
    await disconnectDb(); // Ensure the database connection is closed
    console.log("Disconnected from database.");
}
