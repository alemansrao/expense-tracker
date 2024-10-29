/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Turn off strict mode here
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"], // Add your external domains here
  },
};

export default nextConfig;
