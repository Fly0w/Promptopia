import mongoose from "mongoose";

let isConnected = false; // To track the connections

// Function establishing the connection to the databse with the credentials
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected')
        return;
    }

    try {
        // Connecting to the database "share_prompt"
        await mongoose.connect(process.env.MONGODB_URI, {
                dbName: "share_prompt",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        isConnected = true;
        console.log("MongoDB is now connected");
        
    } catch(error) {
        console.log(error)
    }   
}