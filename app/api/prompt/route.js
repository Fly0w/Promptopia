import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompts";

/* Endpoint for getting all the prompts */

export const GET = async (req) => {
    try {
        await connectToDB()

        // We get the prompt following the model "prompts" in our database,
        // but we also want the user info, which is in the "user" model
        // Because we have a ref in our model, the user info can be accessed 
        // with the ".populate" method, which will expand the information we need
        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
        
    } catch(error){
        return new Response("Failed", {status: 500})
    }
}