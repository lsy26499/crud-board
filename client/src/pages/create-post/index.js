import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Main, PostHeader } from '../../compoentns';
import { actions } from '../../modules/store';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { checkImageSize, checkImageMimeType } from '../../utils';
import './index.scss';

const CreatePost = () => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const imageInputRef = useRef();
  const dispatch = useDispatch();

  const onChangeImage = async (e) => {
    const files = e.target.files;

    let slicedFiles = [];
    if (images.length + files.length > 10) {
      alert('이미지는 최대 10개까지 업로드 가능합니다');
      const length = 10 - images.length;
      slicedFiles = [...files].slice(0, length);
    } else {
      slicedFiles = [...files];
    }

    if (slicedFiles.length > 0) {
      let selectedFiles = [];
      for (let file of slicedFiles) {
        const isImage = await checkImageMimeType(file);
        if (isImage) {
          const url = URL.createObjectURL(file);
          selectedFiles.push({ file, url });
        } else {
          alert('이미지 파일만 업로드할 수 있습니다');
        }
      }
      const checkedImages = checkImageSize(selectedFiles);
      setImages([...images, ...checkedImages]);
    }
    imageInputRef.current.value = '';
  };

  const onRemoveImage = (i) => {
    imageInputRef.current.value = '';
    const newImages = images.filter((url, index) => i !== index);
    setImages(newImages);
  };

  const onSubmit = (data) => {
    const { title, hashtag, content } = data;
    if (title.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }

    const files = images.map((image) => image.file);
    const tags = hashtag.split(',');
    const trimmedHashtag = tags.map((tag) => tag.trim());
    const isTagInvalid = Boolean(
      trimmedHashtag.filter((tag) => tag.length > 20 || tag === '').length
    );
    if (isTagInvalid) {
      alert('공백 문자이거나 20자 이상인 태그가 존재합니다');
      return;
    }

    dispatch(
      actions.createPost({
        title,
        content,
        hashtag: trimmedHashtag,
        images: files,
      })
    );
  };

  return (
    <div>
      <PostHeader onSubmit={handleSubmit(onSubmit)} />
      <Main>
        <section className='create-post'>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='form-item'>
              <input
                placeholder='제목'
                {...register('title', { required: true, maxLength: 60 })}
              ></input>
            </div>
            <div className='form-item'>
              <input
                placeholder='해시태그 (쉼표로 구분, 20자 이내)'
                {...register('hashtag')}
              ></input>
            </div>
            <div className='form-item file'>
              <input
                ref={imageInputRef}
                name='file'
                type='file'
                accept='image/*'
                multiple='multiple'
                onChange={onChangeImage}
              ></input>
              <div className='file-upload-button'></div>
              {images.length > 0 && (
                <ul className='images'>
                  {images.map((image, i) => (
                    <li
                      className='image'
                      key={i}
                      onClick={() => onRemoveImage(i)}
                    >
                      <img src={image.url} />
                      <div className='icon'>
                        <FontAwesomeIcon icon={faTimes} size='sm' />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className='form-item'>
              <textarea {...register('content')}></textarea>
            </div>
          </form>
        </section>
      </Main>
    </div>
  );
};

export default CreatePost;
