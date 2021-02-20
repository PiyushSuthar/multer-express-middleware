<h1 align="center">Multer Express Middleware ♻ </h1>
<p align="center">A weekend project that will help you to easily setup multer with just a middleware. 🌈</p>
<p align="center">
  <a href="https://github.com/PiyushSuthar/image-store-middleware"><img alt="GitHub license" src="https://img.shields.io/github/license/PiyushSuthar/image-store-middleware?style=for-the-badge"></a>
  <a href="https://github.com/PiyushSuthar/image-store-middleware/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/PiyushSuthar/image-store-middleware?style=for-the-badge"></a>
  <a href="https://github.com/PiyushSuthar/image-store-middleware/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/PiyushSuthar/image-store-middleware?style=for-the-badge"></a>
  <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/piyushsthr?color=%2300acee&logo=twitter&style=for-the-badge">
  
</p>

# Usage 🔥

> Installing the module.
```sh
yarn add multer-express-middleware
```

Using the middleware with Express.
```js
const app = require('express')()
const imageStore = require('multer-express-middleware')

app.use("/api", imageStore({
    // Folder where you would like to save files or images (required)
    destination: "uploads",

    // Property where you would like to set selected image or file while uploading form frontend...
    imageProperty: "image", 

    customize: {
        upload: {
            // field you want to fill while posting an api request... ex "imageFolderName"
            folderProperty: "folder",

            // folder to save image or file
            subFolderProperty: "subfolder" 
            
            // Api path for uploading image or file
            path: "/image/upload" 
        },
        delete: {
            // Property where you would to set image path while giving an post request.
            filePathProperty: "imagePath",

            // API path for deleting image or file
            path: '/image/delete'
        }
    },

    // Custom middlewares, if you wish... ;)
    middlewares: [isSignedIn, isAuthenticated] 
}))
```

> TODO: Need to add some more stuff over here...

## Why made this? 🤔
Just wanted to make something that I could use in all of my MERN Projects. It's a big pain recreating this everytime I start a new project. 😅

## Author

👤 **Piyush Suthar**

* Website: https://piyushsuthar.codes
* Twitter: [@piyushsthr](https://twitter.com/piyushsthr)
* Github: [@piyushsuthar](https://github.com/piyushsuthar)
* LinkedIn: [@piyushsthr](https://linkedin.com/in/piyushsthr)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/PiyushSuthar/image-store-middleware/issues). 

## Show your support

Give a ⭐️ if this project helped you!
