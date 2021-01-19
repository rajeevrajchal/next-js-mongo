import mongoose from "mongoose";

const connection = {}

//FUNCTION TO CONNECT MONGO DB

export const dbConnect = async () => {

    //CHECK IF CONNECTED
    if(connection.isConnected){
        return;
    }
    //ELSE CONNECT
    const db = await mongoose.connect(
        process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true
        }
    )
    connection.isConnected = db.connection.readyState
    console.log(connection.isConnected)
}

