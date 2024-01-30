const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const isImage = ['.jpg', '.jpeg', '.png'].includes(path.extname(file.originalname).toLowerCase());
    const isGoogleImageLink = req.body.link && req.body.link.startsWith('https://i.postimg.cc/');

    if (isImage || isGoogleImageLink) {
      cb(null, true);
    } else {
      cb(new Error('Formato Incorrecto'), false);
    }
  },
});
