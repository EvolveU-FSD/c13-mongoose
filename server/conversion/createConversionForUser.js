import { disconnectDb } from "../db.js";
import { findUserByUsername } from '../user/userData.js';
import { createConversionForOwner } from "./conversionData.js";

if (process.argv.length < 3) {
    console.log('Usage: node createConversionForUser <username>')
    process.exit()
  }
  
const username = process.argv[2]

try {
    const user = await findUserByUsername(username)
    if (!user) throw new Error("User not found")
    const createdConversion = await createConversionForOwner(user)
    console.log('Created conversion: ', createdConversion)
} catch (error) {
    console.error("Error creating conversion:", error.message);
} finally {
    await disconnectDb(); // Ensure the database connection is closed
    console.log("Disconnected from database.");
}
