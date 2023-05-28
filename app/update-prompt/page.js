'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@/components/Form';

const EditPrompt = () => {
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:"",
        tag:""
    })

    // We will read the URL to get the id in the params using "SearchParams"
    const searchParams = useSearchParams();
    const promptId= searchParams.get('id');

    // Using the id in the params, we'll make an API call to get the prompt
    // and put it in the state of this component.
    useEffect (() => {
        const getPromptDetails = async () => {
            const resp = await fetch(`/api/prompt/${promptId}`)
            const data = await resp.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        // We only call the function if we get a promptId
        if(promptId) {
            getPromptDetails()
        }
    }, [promptId]) //Every time the promptId changes, we call the useEffect


    //Function that will call the API to make the prompt update in the database
    const updatePrompt = async (e) => {
        console.log("Updating Prompt")
        e.preventDefault();
        setSubmitting(true);

        //If no promptID
        if(!promptId) {
            return alert('Prompt ID not found')
        }

        //Fetch the API and edit the prompt in the database
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    newPrompt: post.prompt,
                    newTag: post.tag
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt