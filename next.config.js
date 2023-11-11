const config = require("./config");
/** @type {import('next').NextConfig} */
const nextConfig = {
   env: {
      DB_URI: config.DB_URI,
      API: config.API,
      NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
      CLOUDINARY_NAME: config.CLOUDINARY_NAME,
      CLOUDINARY_API_KEY: config.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: config.CLOUDINARY_API_SECRET,
   },
   images: {
      domains: ['res.cloudinary.com'],
    },
};

module.exports = nextConfig;
