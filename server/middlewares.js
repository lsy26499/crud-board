const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const models = require('./models');
const { checkFileType } = require('./utils');
aws.config.loadFromPath(__dirname + '/config/s3.json');

const s3 = new aws.S3();
const uploadMulter = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'crudprojectimage/development',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        randomstring.generate({
          length: 12,
          charset: 'hex',
        }) +
          '.' +
          file.originalname.split('.').pop()
      );
    },
  }),
  limits: { files: 10, fileSize: 10 * 1024 * 1024 },
  // fileFilter: checkFileType,
});

const uploadImages = uploadMulter.array('images', 10);

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
  upload: (req, res, next) => {
    uploadImages(req, res, function (err) {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.status(500).send('이미지는 10MB까지 업로드 가능합니다');
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          res.status(500).send('이미지는 최대 10개까지 업로드 가능합니다');
        }
      } else {
        next();
      }
    });
  },
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
