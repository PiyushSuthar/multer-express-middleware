'use strict';

/**
 * @typedef {import('..').options} options
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');

var _require = require('./Controllers/delete'),
    handleDelete = _require.handleDelete;

var _require2 = require('./Controllers/upload'),
    ImageStore = _require2.ImageStore,
    handleAfterUpload = _require2.handleAfterUpload;

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

    // CONSTANTS {Was not able to configure babel to enable optional chaining... sed lyf}
    var IS_UPLOAD_PROPERTY_AVAILABLE = options.customize && options.customize.upload;
    var IS_DELETE_PROPERTY_AVAILABLE = options.customize && options.customize.delete;

    // Creating Multer engine
    var upload = multer({
        storage: ImageStore({
            destination: options.destination,
            folderProperty: IS_UPLOAD_PROPERTY_AVAILABLE && options.customize.upload.folderProperty || "folder",
            subfolderProperty: IS_DELETE_PROPERTY_AVAILABLE && options.customize.upload.subFolderProperty || "subfolder"
        })
    });

    // Using Middlewares if passed...
    if (options.middlewares) {
        router.use(options.middlewares);
    }
    router.use(express.json());

    // Route for uploading image
    router.post(IS_UPLOAD_PROPERTY_AVAILABLE && options.customize.upload.path || "/image/upload", upload.single(options.imageProperty || "image"), handleAfterUpload);

    // Route for deleteing images
    router.post(IS_DELETE_PROPERTY_AVAILABLE && options.customize.delete.path || "/image/delete", handleDelete({
        filePathProperty: IS_DELETE_PROPERTY_AVAILABLE && options.customize.delete.filePathProperty || "path",
        destination: options.destination
    }));

    return router;
};