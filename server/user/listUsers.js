import { disconnectDb } from "../db.js";
import { findAllUsers } from './userData.js';
  
try {
    const users = await findAllUsers()
    console.log(users)
} catch (error) {
    console.error("Failed to get users", error.message);
} finally {
    await disconnectDb(); // Ensure the database connection is closed
    console.log("Disconnected from database.");
}
