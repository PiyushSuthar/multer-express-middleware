/**
 * @typedef {import('./types').options} options
 */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const { ImageStore, handleAfterUpload } = require('./Controllers/upload')
const { v4: uuidV4 } = require("uuid")

/**
 * 
 * @param {options} options 
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

    // Route for uploading image
    router.post(options?.customize?.upload?.path || "/image/upload", upload.single(options.imageProperty || "image"), handleAfterUpload)

    return router
}
