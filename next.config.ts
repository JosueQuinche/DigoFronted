import type { NextConfig } from "next";

const nextConfig: NextConfig = {
eslint: {
    ignoreDuringBuilds: true, // Ignora los errores de ESLint durante la construcción
},
};

export default nextConfig;
