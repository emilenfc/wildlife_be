import { v2 as cloudinary } from 'cloudinary';
import { env } from 'process';

if (
  !env.CLOUDINARY_NAME ||
  !env.CLOUDINARY_API_KEY ||
  !env.CLOUDINARY_API_SECRET
) {
  throw new Error('Cloudinary configuration variables are missing');
}

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

export default cloudinary;
