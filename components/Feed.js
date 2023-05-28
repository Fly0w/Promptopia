'use client'

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Image from "next/image";

// Create a component which is a list of all the prompt cards. 
// This component will only be used here, thus we can create it in the same file
const PromptCardList = ({data, text, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        // The content is filtered according to what the user has types in the
        // search bar. Will search in the email, username, prompt and tag, and 
        // if one of them is good, then display the card, otherwise pass
        if(post.creator.email.toLowerCase().includes(text.toLowerCase()) || post.creator.username.toLowerCase().includes(text.toLowerCase()) || post.prompt.toLowerCase().includes(text.toLowerCase()) || post.tag.toLowerCase().includes(text.toLowerCase())){
          return(
            <PromptCard 
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />)
        }
      })}
    </div>
  )
}

// The actual Feed component
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  // Dynamic text input search function
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  // Click on the tag will input the tag in the search bar
  const handleTagClick = (tag) => {
    setSearchText(tag)
  }

  // Fast search bar delete  button
  const deleteForm = () => {
    setSearchText("")
  }

  // Fetches all the posts from the database to put them in the state
  useEffect(() => {
    const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setPosts(data);
  }

  fetchPosts()
}, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
        type= "text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
        />
        <div className="delete_btn" onClick={deleteForm}>
          <Image 
              src='assets/icons/cross.svg'
              alt="delete_icon"
              width={25}
              height={25}
            />
        </div>
      </form>

      <PromptCardList 
        data={posts}
        text={searchText}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed