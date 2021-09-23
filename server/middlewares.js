const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const aws = require('aws-sdk');
const formidable = require('formidable');
const fs = require('fs');
const models = require('./models');
const { checkFileType, checkFileSize, checkFileLength } = require('./utils');

aws.config.loadFromPath(__dirname + '/config/s3.json');

const s3 = new aws.S3();

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
  validateFiles: (req, res, next) => {
    const forms = formidable({ multiples: true });
    forms.parse(req, async (err, fields, files) => {
      try {
        if (err) {
          res.status(500).send('서버 에러');
          return;
        }
        const { post, images: savedImages } = fields;
        const { images: uploadedImages } = files;
        const parsedPost = JSON.parse(post);
        const body = savedImages
          ? { ...parsedPost, images: savedImages }
          : parsedPost;
        if (uploadedImages) {
          const images = Array.isArray(uploadedImages)
            ? uploadedImages
            : [uploadedImages];
          const lengthChecked = checkFileLength(images);
          const sizeChecked = checkFileSize(lengthChecked);
          const typeChecked = await checkFileType(sizeChecked);
          req.files = typeChecked;
        }
        req.body = { ...body };
        next();
      } catch (error) {
        console.log(error);
        if (error.message) {
          res.status(400).send(error.message);
        } else {
          res.status(500).send('서버 에러');
        }
      }
    });
  },
  upload: (req, res, next) => {
    try {
      const { files } = req;
      let uploadedFiles = [];
      if (files) {
        for (let file of files) {
          const readableStream = fs.createReadStream(file.path);
          const ext = file.type.split('/')[1];
          const key = `${randomstring.generate({
            length: 12,
            charset: 'hex',
          })}.${ext}`;
          const params = {
            Bucket: 'crudprojectimage/production',
            ACL: 'public-read',
            Key: key,
            Body: readableStream,
          };
          s3.upload(params, (err, data) => {
            if (err) {
              console.log(err);
              throw new Error(err);
            } else {
              const key = data.key.split('/')[1]
                ? data.key.split('/')[1]
                : data.key;
              const uploadedFile = {
                etag: data.ETag,
                location: data.Location,
                key,
                bucket: data.Bucket,
              };
              uploadedFiles.push(uploadedFile);
              if (uploadedFiles.length === files.length) {
                req.files = uploadedFiles;
                next();
              }
            }
          });
        }
      } else {
        req.files = [];
        next();
      }
    } catch (error) {
      res.status(500).send('서버 에러');
    }
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
