import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, '../../uploads'); 
    },
    filename: (req, file, callback) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = file.originalname.split('.').pop();
        callback(null, uniqueSuffix + '.' + fileExtension);
      }
  });
  
  const uploadImage = multer({
    storage: storage,
    dest:"../../uploads/",
    limits: {
      fileSize: 1024 * 1024 * 10 
    },
    fileFilter: (req, file, callback) => {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
      ) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  }).single('category_image');

  
export default uploadImage;



