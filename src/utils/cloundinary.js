import {v2 as cloudinary } from "cloudinary"
import fs from "fs"



cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET
});


const uploadOnCloundinary = async (file,name) => {
  let foldername;
  if(name==="creator"){
    foldername="creatorproflie"
  }else{
    foldername="courses"
  }
  try {
    if (!file || !file.buffer) return null;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: foldername, // optional
          public_id: file.originalname?.split(".")[0], // optional
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(file.buffer); // 👈 Send the in-memory file buffer
      // console.log(file,file.buffer);
      
    });

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};


// const uploadOnCloundinaryvideo = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null; 
//     console.log(localFilePath);
    
//     // Upload the video
//     const response = await cloudinary.v2.uploader.upload(localFilePath, {
//       resource_type: "video",
//     });

//     // Delete local file after successful upload
//     fs.unlinkSync(localFilePath);

//     // Optional: console log response
//     console.log("Uploaded to Cloudinary:", response);

//     return response;
//   } catch (error) {
//     // Always try to delete local file, even on failure
//     if (fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath);
//     }

//     console.error("Cloudinary video upload failed:", error);
//     return null;
//   }
// };


// cloudinary.v2.uploader
// .upload("dog.mp4", 
//   { resource_type: "video", 
//     public_id: "dog_closeup",
//     eager: [
//       { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
//       { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
//     eager_async: true,
//     eager_notification_url: "https://mysite.example.com/notify_endpoint" })
// .then(result=>console.log(result));
// cloudinary.v2.uploader.destroy(public_id, options).then(callback);
export {uploadOnCloundinary}