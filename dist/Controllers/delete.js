"use strict";

// @ts-check
var fs = require('fs');

var deleteImage = function deleteImage(filePath) {
    try {
        fs.unlinkSync(filePath);
        return {
            success: true,
            message: "File Deleted Successfully!"
        };
    } catch (err) {
        return {
            success: false,
            message: "Failed! File not available",
            error: err
        };
    }
};

exports.handleDelete = function (_ref) {
    var _ref$destination = _ref.destination,
        destination = _ref$destination === undefined ? "uploads" : _ref$destination,
        _ref$filePathProperty = _ref.filePathProperty,
        filePathProperty = _ref$filePathProperty === undefined ? "imagePath" : _ref$filePathProperty;
    return function (req, res) {
        try {
            if (req.body[filePathProperty].slice(0, 7) !== destination) {
                return res.json({
                    success: false,
                    message: "This is not an upload path, we cannot process further."
                });
            }

            var imagePath = req.body[filePathProperty];

            if (fs.existsSync(imagePath)) {
                // fs.rmSync(imagePath)
                var _deleteImage = deleteImage(imagePath),
                    success = _deleteImage.success,
                    error = _deleteImage.error,
                    message = _deleteImage.message;

                return res.status(error ? 404 : 204).json({
                    success: success,
                    message: message,
                    error: error
                });
            }

            res.json({
                success: false,
                message: "Looks like the image path is not available."
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err
            });
        }
    };
};