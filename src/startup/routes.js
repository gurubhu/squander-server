const authRoutes = require('../routes/authRoutes');
const accountRoutes = require('../routes/accountRoutes');

module.exports = function(app){
    app.use('/api',authRoutes);
    app.use('/api',accountRoutes);
}