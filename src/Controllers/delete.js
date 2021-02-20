// @ts-check
const fs = require('fs')

const deleteImage = filePath => {
    try {
        fs.unlinkSync(filePath)
        return {
            success: true,
            message: "File Deleted Successfully!"
        }
    } catch (err) {
        return {
            success: false,
            message: "Failed! File not available",
            error: err
        }
    }
}

exports.handleDelete = ({ destination = "uploads", filePathProperty = "imagePath" }) => (req, res) => {
    try {
        if (req.body[filePathProperty].slice(0, 7) !== destination) {
            return res.json({
                success: false,
                message: "This is not an upload path, we cannot process further."
            })
        }

        let imagePath = req.body[filePathProperty]

        if (fs.existsSync(imagePath)) {
            // fs.rmSync(imagePath)
            const { success, error, message } = deleteImage(imagePath)
            return res.status(error ? 404 : 204).json({
                success,
                message,
                error
            })
        }

        res.json({
            success: false,
            message: "Looks like the image path is not available."
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }

}
