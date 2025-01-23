import mongoose from "mongoose";

async function connectToDB(){
    try {
        console.log(`Attempting to connect to the MONGODB`);
        await mongoose.connect("mongodb://localhost:27017");
        console.log(`Connected to MONGODB`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}
export default connectToDB;