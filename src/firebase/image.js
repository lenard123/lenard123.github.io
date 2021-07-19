import axios from 'axios'

export const uploadImage = async(file) => {

  if (file === null) return process.env.VUE_APP_CLOUDINARY_IMAGE_ERROR
  if (typeof file === 'string') return file

  const formData = new FormData();
  const cname = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME

  formData.append("api_key",process.env.VUE_APP_CLOUDINARY_API_KEY);
  formData.append("file", file);
  formData.append("timestamp",  Date.now() / 1000 | 0);
  formData.append("upload_preset", 'cx9itq55');

  try{
    const result = await axios.post(`https://api.cloudinary.com/v1_1/${cname}/image/upload`, formData)
    return result.data.url
  } catch (err) {
    console.log('error on uploading image', err)
    return process.env.VUE_APP_CLOUDINARY_IMAGE_ERROR
  }

}