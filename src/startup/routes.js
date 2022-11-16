const authRoutes = require('../routes/authRoutes');

module.exports = function(app){
    app.use('/api',authRoutes);
}