import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from "@/utils/database";
import User from "@/models/user";


/* Endpoint for managing the authentification providers */

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks :{
        async session({ session }){
        // We select the user with it's email
        const sessionUser = await User.findOne({
            email : session.user.email
        })
        // We then update the session's user id with our current user id 
        // (automatically created by mongoDB and accessible via the variable _id)
        session.user.id = sessionUser._id.toString();

        // We finally return the updated session
        return session;
        },
        async signIn({ profile }){
            try {
                await connectToDB();

                // We check if user exists first with findOne, which will 
                // return null if user doesn't exist
                const userExists = await User.findOne({
                    email: profile.email
                });

                // If user doesn't exist, create one with the profile parameters
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(), //Removes the spaces in username and makes it lowercased
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
})

/*See official Next-auth documentation*/
export { handler as GET, handler as POST }