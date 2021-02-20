/**
 * @typedef {import('./types').options} options
 */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const { handleDelete } = require('./Controllers/delete')
const { ImageStore, handleAfterUpload } = require('./Controllers/upload')

/**
 * Multer easy Image store `express middleware`
 * 
 * `Example usage`:-
 * ```js
 * app.use("/api", imageStore({
        destination: "uploads",
        imageProperty: "image",
        customize: {
            upload: {
                folderProperty: "folderName",
                subFolderProperty: "subfolderName"
            },
            delete: {
                filePathProperty: "imagePath"
            }
        }
    }))
 * ```
 * @param {options} options Configure the Store ;)
 */
module.exports = function (options) {
    // Creating Multer engine
    const upload = multer({
        storage: ImageStore({
            destination: options.destination,
            folderProperty: options?.customize?.upload?.folderProperty || "folder",
            subfolderProperty: options?.customize?.upload?.subFolderProperty || "subfolder"
        })
    })

    // Using Middlewares if passed...
    if(options.middlewares){
        router.use(options.middlewares)
    }
    router.use(express.json())

    // Route for uploading image
    router.post(options?.customize?.upload?.path || "/image/upload", upload.single(options.imageProperty || "image"), handleAfterUpload)

    // Route for deleteing images
    router.post(options?.customize?.delete?.path || "/image/delete", handleDelete({
        filePathProperty: options?.customize?.delete?.filePathProperty || "path",
        destination: options.destination
    }))

    return router
}