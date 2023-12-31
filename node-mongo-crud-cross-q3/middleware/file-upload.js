const multer = require('multer');
const path = require('path');

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(path.dirname(__dirname), 'upload/images'));
        },
        filename: (req, file, cb) => {
            console.log(file)
            const ext = file.mimetype.split('/')[1];
            cb(null,
                file.originalname.split('.')[0].replace(/\ /g, '') +
                Date.now() + '.'+ext
            )
        }
    }),
});

module.exports = fileUpload;