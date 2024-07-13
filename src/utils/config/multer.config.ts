import CloudinaryStorage,{Options}  from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';
import { parse, extname } from 'path';
import { BadRequestException } from '@nestjs/common';


const multerStorage = CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = extname(file.originalname).slice(1);
    const allowedFormats = ['jpeg', 'png', 'jpg', 'mp4'];
    const format = allowedFormats.includes(ext) ? ext : 'jpeg';
    const { name } = parse(file.originalname); 
    const resource_type = allowedFormats.includes(ext) && ext !== 'mp4' ? 'image' : 'video'; 

    return {
      folder: 'wildlife',
      format,
      resource_type,
      public_id: name,
    };
  },
} as Options)

export default {
  storage: multerStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedFormats = ['jpeg', 'png', 'jpg', 'mp4'];
    const ext = extname(file.originalname).slice(1); // get file extension without the dot
    if (allowedFormats.includes(ext)) {
      cb(null, true);
    } else {
      cb(new BadRequestException(`Unsupported file type ${ext}`), false);
    }
  },
};
