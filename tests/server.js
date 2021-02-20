// Import Modules
const express = require('express')
const app = express()
const cors = require('cors')

// Declaring a PORT
const PORT = process.env.PORT | 4000

function isSignedIn(req, res, next) {
    console.log("Signed In")
    next()
}
function isAuthenticated(req, res, next) {
    console.log("Authenticated")
    next()
}

/* Declaring Usable Routes */
// Upload Route
const imageStore = require('../src/index')
app.use(cors())
app.use("/api", imageStore({
    destination: "uploads",
    imageProperty: "image",
    customize: {
        upload: {
            folderProperty: "folder",
            subFolderProperty: "subfolder",
            path: "/mage/upload"
        },
        delete: {
            filePathProperty: "imagePath",
            path: '/image/delete'
        }
    },
    middlewares: [isSignedIn, isAuthenticated]
}))

app.post("/test", (req, res) => {
    res.json({
        a: req.body
    })
})

// Listening On PORT
app.listen(PORT, ()=> {
    console.log(`Server Started at localhost:${PORT}`)
})