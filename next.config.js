module.exports = 
{ 
    images: 
    { 
        domains: ['www.themealdb.com', 'lh3.googleusercontent.com'], 
        formats: ['image/avif', 'image/webp'], 
    },
    // Instrumentation doesn't seem to be working well with sequelize.  Waiting for non-beta support
    // experimental: 
    // {
    //     instrumentationHook: true
    // }
}