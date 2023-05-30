# Promptopia

NextJS web application deployed on Vercel, that allows user to share their best AI prompts such as ChatGPT. This app includes a Google OAuth authentificator for Signing in, as well as a NextJS API combined with a MongoDB Database (using mongoose) for users and prompts tables.


![](https://https://github.com/Fly0w/Promptopia/blob/main/Media/Promptopia%20preview.gif)


## Features

### Google authentification
By using the next-auth library, the website allows users to connect using their Google account.

[Bug] Can't be used from an embedded browser --> Error 403

![](https://https://github.com/Fly0w/Promptopia/blob/main/Media/Promptopia%20Sign%20in.gif)

### Feed page
The feed page displays all the posts from all the users in the database. The user can access any user's profile page by clicking on their username, email or picture, as long as they are already logged in.

Uses the API endpoint to get every prompt from the database:
```javascript
export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
```

### Dynamic prompt search
It is possible to search for a prompt, username, email or tag very fast by typing in the search bar.

Clicking on a tag will executes a search for this particular tag.

![](https://https://github.com/Fly0w/Promptopia/blob/main/Media/Promptopia%20search.gif)

### Profile page
The profile page displays all the prompts from that user. It uses API calls to fetch from the database only that particular user's prompts:

```javascript
export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const prompts = await Prompt.find({creator: params.id}).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
```

![](https://https://github.com/Fly0w/Promptopia/blob/main/Media/Promptopia%20Profile.gif)

### Create, Edit, Delete post
It is possible to create a prompt if the user is connected. Then, when accessing the profile page, the user can edit or delete his/her prompts only if those are made by this particular user. It is not posible to edit someone else's prompts.

These features are using 4 endpoints with POST, GET, PATCH and DELETE requests :

- POST: Creates an entry in the database with the new prompt
- GET: Reads the prompt to display it in the form when editing it
- PATCH: Updates the existing prompt with the edited one
- DELETE: Deletes the prompt from the database


![](https://https://github.com/Fly0w/Promptopia/blob/main/Media/Promptopia%20Edit.gif)

