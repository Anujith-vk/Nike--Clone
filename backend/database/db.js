const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anolianu123:qoSoy1XXxAopqFzI@cluster0.nxah4.mongodb.net/Nike')
.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.error("Failed To Connect Database", err.message);
});
module.exports = mongoose;
