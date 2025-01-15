import { disconnectDb } from "../db.js"
import { createTractor, deleteAllTractors } from "./tractorData.js"

console.log('Deleting all tractors')
await deleteAllTractors()

await createTractor({
    name: "Bug-o-matic", 
    imageUrl: 'http://localhost:5173/src/assets/bug-tractor.jpg', 
    description: "1979 Volkswagon Bug converted into a high traction hauler.",
    price: 15000,
    // review: "Great on gas, my kid took it to his high school grad and they all loved it too."
})

await createTractor({ 
    name: "Old Ford Made Good Again", 
    imageUrl: 'http://localhost:5173/src/assets/old-ford-combine.jpg', 
    description: "Recycled this from behind the barn into a compact combine.",
    price: 25000,
    // review: "Starts by itself sometimes. Scares the horses. Otherwise very reliable."
})

await createTractor({ 
    name: "Prius Digger - the Scorpion", 
    imageUrl: 'http://localhost:5173/src/assets/prius-backhoe.jpg', 
    description: "The battery died in my old Prius, and I needed a digger... so we made this.",
    price: 8000,
    // review: "Great turning radius. Being a prius I thought it would be better on gas. Tips over a lot. Still, very fun to drive through the ditches."
})

await createTractor({ 
    name: "Camper Van", 
    imageUrl: 'http://localhost:5173/src/assets/van-combine.jpg', 
    description: "Our old combine was busted, but when we heard about tractorify we got this camper van on kijiji and decided to give it a try!",
    price: 20000,
    // review: "Good for the flats, steering isn't too great in deep vegetation. Original horn still works.  Stylish."
})

await disconnectDb()