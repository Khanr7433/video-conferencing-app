import mongoose from "mongoose";

export async function connectDB() {
    try {
        // Check if already connected
        if (mongoose.connections[0].readyState) {
            return;
        }

        const mongoUri = process.env.MONGO_DB_URI;
        const databaseName = process.env.DATABASE_NAME;

        if (!mongoUri) {
            throw new Error("MONGO_DB_URI environment variable is not found");
        }

        if (!databaseName) {
            throw new Error("DATABASE_NAME environment variable is not found");
        }

        await mongoose.connect(`${mongoUri}/${databaseName}`);

        const connection = mongoose.connection;

        connection.on("connected", (conn) => {
            console.log(
                "MongoDB connected successfully: ",
                conn.host,
                conn.port
            );
        });

        connection.on("error", (err) => {
            console.log(
                "MongoDB connection error. Please make sure MongoDB is running. " +
                    err
            );
            process.exit();
        });
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        throw error;
    }
}
