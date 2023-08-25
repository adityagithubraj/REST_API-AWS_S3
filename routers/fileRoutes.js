const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../controllers/fileController');

//..........use multer..............//

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//...........Router .................//

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/list', fileController.listFiles);
router.get('/download/:filename', fileController.downloadFile);
router.delete('/delete/:filename', fileController.deleteFile);

module.exports = router;
