const upload_preset = import.meta.env.VITE_UPLOAD_PRESET
const cloud_name = import.meta.env.VITE_CLOUD_NAME



const uploadImageToCloudinary = async file => {
    try {
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', upload_preset);
        uploadData.append('cloud_name', cloud_name);
        const url_cl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
        console.log(url_cl);

        const res = await fetch(url_cl, {
      
            method: 'post',
            body: uploadData,
        });
        console.log(res);

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};

export default uploadImageToCloudinary;
