'use strict';

var multer = require('multer');
var fs = require('fs');

/**
 * 
 * @param {String} str 
 * @returns ex. foo bar to foo-bar 
 */
var parseText = function parseText(str) {
    return str.toString().replace(/\s+/g, '-').toLowerCase();
};
exports.parseText = parseText;

// Image store
/**
 * 
 * @param {{
 * destination: string;
 * folderProperty: string;
 * subfolderProperty: string
 * }} param0 
 */
exports.ImageStore = function (_ref) {
    var _ref$destination = _ref.destination,
        _destination = _ref$destination === undefined ? "uploads" : _ref$destination,
        folderProperty = _ref.folderProperty,
        subfolderProperty = _ref.subfolderProperty;

    return multer.diskStorage({
        destination: function destination(req, file, callback) {
            var folder = parseText(req.body[folderProperty]);
            var subfolder = parseText(req.body[subfolderProperty]);

            var devDir = _destination + '/' + folder;
            var fullDir = _destination + '/' + folder + '/' + subfolder;

            // If destination is not available, create one ;)
            if (!fs.existsSync(_destination)) {
                fs.mkdirSync(_destination);
            }

            // if full path is available then continue or create one and continue...
            if (fs.existsSync(fullDir)) {
                return callback(null, fullDir);
            } else {
                if (fs.existsSync(devDir)) {
                    return fs.mkdir(fullDir, function (error) {
                        return callback(error, fullDir);
                    });
                } else {
                    return fs.mkdir(devDir, function () {
                        fs.mkdir(fullDir, function (error) {
                            return callback(error, fullDir);
                        });
                    });
                }
            }
        },
        filename: function filename(req, file, callback) {
            var fileName = parseText(file.originalname);
            callback(null, Date.now() + "-" + fileName);
        }
    });
};

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.handleAfterUpload = function (req, res) {
    if (req.file) {
        res.json({
            path: req.file.path,
            name: req.file.filename,
            mimeType: req.file.mimetype
        });
    }
};