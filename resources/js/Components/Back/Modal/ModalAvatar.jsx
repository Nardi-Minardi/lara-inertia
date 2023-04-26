import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '../Button/PrimaryButton';
import { Inertia } from '@inertiajs/inertia';

const ModalAvatar = ({ children, errors, userId, submitUrl, visible, footer, onHide, header, setModalAvatar }) => {
  const [imagePreview, setImagePreview] = useState('');

  const { data, setData } = useForm({
    avatar: null,
  });


  const onImageChange = (e) => {
    const val = (e.target && e.target.files[0]) || '';

    let _data = { ...data };
    _data.avatar = val;
    // if val notimage
    if (val.type !== 'image/jpeg' && val.type !== 'image/png') {
      alert('File harus berupa gambar');
      return false;
    }
    let reader = new FileReader();
    var url = reader.readAsDataURL(val);
    reader.onloadend = function (e) {
      setImagePreview([reader.result]);
    }.bind(this);

    setData(_data);

  };

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', data.avatar);
    formData.append('_method', 'PATCH');
    formData.append('userId', userId);
    console.log('formData', formData);
    Inertia.post(route(submitUrl, { userId }), formData, {
      onSuccess: () => {
        alert('Avatar berhasil diubah');
        setModalAvatar(false);
      }
    })
  };

  return (
    <>
      <Dialog
        className="p-fluid"
        visible={visible}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header={header}
        modal
        footer={footer}
        onHide={onHide}
      >
        {data.avatar &&
          <img src={imagePreview}
            alt={imagePreview}
            className="product-image block m-auto pb-3"
          />}
        <div className="mb-4">
          <label htmlFor="avatar" className="font-bold">
            Avatar
          </label><br></br>

          <input type="file" name='avatar' onChange={onImageChange} /><br></br>

          <PrimaryButton type="submit" className="mt-5 float-right" onClick={(e) => submit(e)} disabled={data.avatar === null} >
            Submit
          </PrimaryButton>

        </div>
        {errors.avatar && <small className="p-error">{errors.avatar}</small>}
      </Dialog>
    </>
  )
}

export default ModalAvatar