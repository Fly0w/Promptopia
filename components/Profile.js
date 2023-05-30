'use client'

import PromptCard from "./PromptCard"


const Profile = ({name, data, handleEdit, handleDelete}) => {


  
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}'s Profile</span>
      </h1>
      <p className="desc text-left">Welcome to {name}'s page</p>
        <div className="mt-16 prompt_layout">

        {/* For each prompt, we'll create a prompt card */}
        {data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleEdit={() => handleEdit && handleEdit(post)}
          />
        ))}
        </div>
    </section>
  )
}

export default Profile