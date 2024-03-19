/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**.unsplash.com",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ],
      },

};

export default nextConfig;
