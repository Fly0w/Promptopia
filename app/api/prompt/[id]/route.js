import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompts";

/* Endpoint for managing the user's prompts, edit and delete */


//GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        // We get the prompt following the model "prompts" in our database,
        // but we also want the user info, which is in the "user" model
        // Because we have a ref in our model, the user info can be accessed 
        // with the ".populate" method, which will expand the information we need
        const prompt = await Prompt.findById(params.id).populate('creator');

        //If the prompt doesn't exist
        if (!prompt) {
            return new Response("Prompt not found", {status: 404})
        }

        return new Response(JSON.stringify(prompt), {status: 200})
        
    } catch(error){
        return new Response("Failed", {status: 500})
    }
}


//PATCH
export const PATCH = async (req, { params }) => {
    const { newPrompt, newTag } = await req.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        //If the prompt doesn't exist
        if (!existingPrompt) {
            return new Response("Prompt not found", {status: 404})
        }

        // We replace the old prompt and tag with the new ones
        existingPrompt.prompt = newPrompt;
        existingPrompt.tag = newTag;

        // We then save the new Prompt and return it
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status: 200})


    } catch (error) {
        return new Response("Failed to update the prompt", {status: 500})
    }
}


//DELETE
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        
        //Find the prompt and remove it from db
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted Successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to delete the prompt", {status: 500})
    }
}