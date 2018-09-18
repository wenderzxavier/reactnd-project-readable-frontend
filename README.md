
Readable project for React Nanodegree.

On this project, using a [Local Node Server](https://github.com/wenderzxavier/reactnd-project-readable-starter), the user has a unique web blog which allows posting new topics and comments. It is possible to vote on comments and topics as well.

## Setup Instructions
  
* Download or fork and clone the [Frontend](https://github.com/wenderzxavier/reactnd-project-readable-frontend) repository using `git clone`.
* Download or fork and clone the [Node Server](https://github.com/wenderzxavier/reactnd-project-readable-starter) repository using `git clone`.
* run `npm install` to install the required dependencies on both folders.
* run `node server` to initiate the local server.
* run `npm start` or `yarn start` to compile and run the frontend application.
* The site can be accessed at http://localhost:3000, and the local server at http://localhost:3001.

## What's Included
```
+--public/    
 |-- favicon.ico - React Icon, You may change if you wish.
 |-- index.html - DO NOT MODIFY
 |-- manifest.json - Configuration files. Do not modify.
+-- src/
 +-- action/ - Redux store actions
  |-- index.js - This file maintains all actions required for the redux store
 +-- component/ - Classes and components implemented on the applications.
  |-- AddComment.js - Card responsible for dealing with AddComment logic.
  |-- AddPost.js - Card responsible for Adding a new post to the store.
  |-- AllCategories.js - First view of the app showing posts for all categories
  |-- App.js - Landing Component of the app. Implement the routes for all app.
  |-- Category.js - View responsible for filtering posts for a specific category.
  |-- Comments.js - Card responsible for showing existing comments and enabling the functions of editins or deleting.
  |-- DetailedPost.js - View of the Post showing details of the post and its comments.
  |-- EditModal.js - Modal responsible for providing a way to edit existing posts and comments
  |-- Navigation.js - Implement the Navigation Bar, showing the existing categories and logo of our app..
  |-- Post.js - Card for the main views showing general information for the post.
  |-- Sort.js - Sort button logic for the main view of the app.
 +-- reducers/ - Redux store reducers
  |-- index.js - This file maintains all reducers required for the redux store.
 +-- utils/ - API Calls
  |-- ReadableAPI.js - All calls for the API are formated on this file.
 +-- style/ - Images for your app. You can change or add new images.
  |-- App.css - Main file responsible for maintaining all styles for the App. Some styles are within component files.
  |-- index.css - File containing the style for the body of the App.
 |-- index.js - You should not need to modify this file. It is used for DOM rendering only.
|-- CONTRIBUTING.MD - Information about contributing to this repo. 
TL;DR - Fork and clone your own version of this to use it.
|-- README.MD - This README file.
for you to use with your app.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
```

## Create React App
This project was boostraped with [Create React App](https://github.com/facebook/create-react-app).

## License
MIT License