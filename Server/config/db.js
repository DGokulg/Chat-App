import { connect } from "mongoose"


const connectDb = async () => {
    try{
        await connect(process.env.MONGO_URI)
        console.log("Successfully connected with DB")
    }
    catch(e){
        console.log("Failed to connect with DB")
        throw e
    }
}

export default connectDb