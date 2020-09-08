const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(
            process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        console.log('Conexion a bd realizada exitosamente!');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la bd');
    }


}


module.exports = {
    dbConnection
}