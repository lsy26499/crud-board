const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const models = require('./models');
aws.config.loadFromPath(__dirname + '/config/s3.json');

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'crudprojectimage/development',
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
  s3DeleteImage: async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      const images = await models.board.getImages({ boardId: id });
      if (images.length === 0) {
        next();
        return;
      }
      await models.board.deleteImages({ boardId: id });
      const keys = images.map((image) => ({ Key: image.name }));
      s3.deleteObjects(
        {
          Bucket: 'crudprojectimage',
          Delete: {
            Objects: [...keys],
          },
        },
        function (err, data) {
          if (err) {
            console.log(err);
            res.status(500).send('서버 에러');
          } else {
            console.log('성공');
            next();
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  s3,
};
