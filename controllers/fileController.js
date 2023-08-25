const aws = require('aws-sdk');
const s3 = new aws.S3();



//...........Uplod File AWS S3..........//

exports.uploadFile = async (req, res, next) => {
    try {
        const params = {
            Bucket: process.env.BUCKET,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ACL: 'public-read'
        };
        const data = await s3.upload(params).promise();
        res.send(`File uploaded successfully at: ${data.Location}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//...........GET FILE..................//

exports.listFiles = async (req, res) => {
    try {
        const data = await s3.listObjectsV2({ Bucket: process.env.BUCKET }).promise();
        const fileKeys = data.Contents.map(item => item.Key);
        res.json(fileKeys);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//............DOWNLOAD FILE.................//

exports.downloadFile = async (req, res) => {
    try {
        const filename = req.params.filename;
        const data = await s3.getObject({ Bucket: process.env.BUCKET, Key: filename }).promise();
        res.setHeader('Content-Type', data.ContentType);
        res.send(data.Body);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


//................DELETE FILE..................//

exports.deleteFile = async (req, res) => {
    try {
        const filename = req.params.filename;
        await s3.deleteObject({ Bucket: process.env.BUCKET, Key: filename }).promise();
        res.send(`File ${filename} deleted successfully`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
