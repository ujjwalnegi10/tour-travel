const dotenv = require('dotenv');
dotenv.config();  // Loads the .env file into process.env

console.log(process.env.JWT_SECRET);  // Output: fake-jwt-secret-key_12345
console.log(process.env.MONGO_URI);   // Output: mongodb://localhost:27017/fake-db
console.log(process.env.CLOUDINARY_CLOUD_NAME);  // Output: fake-cloud-name
console.log(process.env.CLOUDINARY_API_KEY);    // Output: fake-cloudinary-api-key
console.log(process.env.CLOUDINARY_API_SECRET); // Output: fake-cloudinary-api-secret
console.log(process.env.STRIPE_SECRET_KEY);  // Output: fake-stripe-secret-key
console.log(process.env.STRIPE_WEBHOOK_SECRET);  // Output: fake-stripe-webhook-secret
console.log(process.env.STRIPE_SUCCESS_URL);  // Output: http://localhost:3000/success
console.log(process.env.STRIPE_CANCEL_URL);   // Output: http://localhost:3000/cancel
console.log(process.env.STRIPE_API_KEY);  // Output: fake-stripe-api-key
