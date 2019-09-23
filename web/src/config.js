const dotenv = require('dotenv');
dotenv.config();

export default {
    apiUrl: process.env.REACT_APP_API_URL || "http://localhost:4433",
};