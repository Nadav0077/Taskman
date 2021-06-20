export const cloudinaryService = {
  uploadImg
}
function uploadImg(ev) {
  const CLOUD_NAME = 'dxsv4c229'
  const PRESET_NAME = 'cusfw7gq'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData();
  formData.append('file', ev.target.files[0])
  formData.append('upload_preset', PRESET_NAME);

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      /* res is an object with scure_url which will be the image src */
      return res
    })
    .catch(err => console.error(err))
}
