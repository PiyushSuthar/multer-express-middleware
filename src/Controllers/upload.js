const multer = require('multer')
const fs = require('fs')

/**
 * 
 * @param {String} str 
 * @returns ex. foo bar to foo-bar 
 */
const parseText = str => str.toString().replace(/\s+/g, '-').toLowerCase()
exports.parseText = parseText

// Image store
/**
 * 
 * @param {{
 * destination: string;
 * folderProperty: string;
 * subfolderProperty: string
 * }} param0 
 */
exports.ImageStore = ({
    destination = "uploads",
    folderProperty,
    subfolderProperty
}) => {
    return multer.diskStorage({
        destination: function (req, file, callback) {
            const folder = parseText(req.body[folderProperty]);
            const subfolder = parseText(req.body[subfolderProperty])

            const devDir = `${destination}/${folder}`;
            const fullDir = `${destination}/${folder}/${subfolder}`

            // If destination is not available, create one ;)
            if(!fs.existsSync(destination)){
                fs.mkdirSync(destination)
            }

            // if full path is available then continue or create one and continue...
            if (fs.existsSync(fullDir)) {
                return callback(null, fullDir);
            } else {
                if (fs.existsSync(devDir)) {
                    return fs.mkdir(fullDir, (error) => callback(error, fullDir))
                } else {
                    return fs.mkdir(devDir, () => {
                        fs.mkdir(fullDir, (error) => callback(error, fullDir))
                    });
                }
            }
        },
        filename: function (req, file, callback) {
            const fileName = parseText(file.originalname)
            callback(null, Date.now() + "-" + fileName);
        },
    });
}


/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.handleAfterUpload = (req, res) => {
    if(req.file){
        res.json({
            path: req.file.path,
            name: req.file.filename,
            mimeType: req.file.mimetype
        })
    }
}