
const conf = {
    port : String(process.env.PORT),
    corsOrigin : String(process.env.CORS_ORIGIN),
    MongoUri : String(process.env.MONGODB_URI),
    AccessTokenSecret : String(process.env.ACCESS_TOKEN_SECRET ),
    AccessTokenExpiry : String(process.env.ACCESS_TOKEN_EXPIRY),
    RefreshTokenSecret : String(process.env.REFRESH_TOKEN_SECRET),
    RefreshTokenExpiry : String(process.env.REFRESH_TOKEN_EXPIRY),
    CookieExpiry : String(process.env.COOKIE_EXPIRE ),
    SmtpService : String(process.env.SMTP_SERVICE),
    SmtpMail : String(process.env.SMTP_MAIL),
    SmtpPassword : String(process.env.SMTP_PASSWORD ),
    CloudinaryName : String(process.env.CLOUDINARY_NAME),
    CloudinaryApiKey : String(process.env.CLOUDINARY_API_KEY ),
    CloudinarySecret : String(process.env.CLOUDINARY_SECRET )
}

console.log("conf" , conf)

export {conf}


