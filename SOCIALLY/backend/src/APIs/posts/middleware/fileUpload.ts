import multer from 'multer'
import fs from 'fs'
import path from 'path'

const uploadsDir = path.join(__dirname, './uploads')
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
}

// Set up storage for file uploads (using disk storage)
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, './uploads') // Change the path as needed
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

// Initialize the upload middleware
const upload = multer({ storage })

export default upload
