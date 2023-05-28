'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@/components/Profile";

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    // Get the user info in the URL
    const searchParams = useSearchParams();
    const userId= searchParams.get("id");
    const username= searchParams.get('username');

    //When loading the page, make an API call to get the user's posts
    useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        // console.log(data);

        setPosts(data);
    }

    if(userId) {
        fetchPosts()
    }

    }, [])

    //Delete prompt function
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt ?");
      if(hasConfirmed) {
        try {
          const response = await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          })

          // We want to update the state of our app, since we've deleted one post
          // The function will filter any post that is identical to the
          // one being removed, and then will update the state
          const filteredPosts = posts.filter((p) => p._id !== post._id)
          setPosts(filteredPosts)
          
        } catch (error) {
          console.log(error)
        }
      }
    }

    //Edit prompt function will take you to the edit prompt interface
    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }

  return (
    <Profile 
        name={username}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default ProfilePage