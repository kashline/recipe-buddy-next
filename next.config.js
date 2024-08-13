module.exports = 
{ 
    images: 
    { 
        domains: ['www.themealdb.com', 'lh3.googleusercontent.com'], 
        formats: ['image/avif', 'image/webp'], 
    },
    experimental: 
    {
        instrumentationHook: true
    },
    webpack(config){
        config.resolve.fallback = {
            fs: false,
        }
        return config
    }
}