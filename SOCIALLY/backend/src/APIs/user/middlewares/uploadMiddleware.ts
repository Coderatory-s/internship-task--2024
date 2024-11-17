import multer from 'multer'

// Multer storage to handle memory storage instead of saving files locally
const storage = multer.memoryStorage() // Store in memory for Cloudinary upload

const upload = multer({ storage: storage }).single('avatar') // Only one avatar upload

export { upload }
