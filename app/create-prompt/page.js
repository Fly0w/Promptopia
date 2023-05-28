'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@/components/Form';

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:"",
        tag:""
    })
    const { data: session } = useSession();
    const router = useRouter();

    // Function for creating prompts by sending the information in the form to the
    // API, in order to create a new prompt in the database
    const createPrompt = async (e) => {
        console.log("Creating Prompt")
        e.preventDefault(); //Preventing browser auto refresh
        setSubmitting(true);
        
        try {
            const response = await fetch('/api/prompt/new', {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.id,
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if(response.ok) {
                router.push('/')
            } 
            
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt