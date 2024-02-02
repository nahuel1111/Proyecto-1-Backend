const cloudinary = require('cloudinary').v2
          
cloudinary.config({ 
  cloud_name: 'dn30vluox', 
  api_key: '448816338734741', 
  api_secret: 'P497LYY3MhZg5qiuaIgPNUjXTvI'
}); 

module.exports = cloudinary