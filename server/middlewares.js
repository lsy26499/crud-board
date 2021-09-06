const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/config/s3.json');

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'crudprojectimage',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    },
  }),
});

module.exports = {
  verifyJwt: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const accessToken = authorization.split(' ')[1];
        if (accessToken) {
          const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
          req.decoded = decoded;
          next();
          return;
        }
        res.status(401).send('인증 오류');
        return;
      }
      res.status(401).send('인증 오류');
    } catch (error) {
      console.log(error);
      res.status(401).send('유효하지 않은 토큰');
    }
  },
  upload,
};
