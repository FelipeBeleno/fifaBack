const mongoose = require('mongoose');


const dbConection = async () => {

    try {

        await mongoose.connect(process.env.MONGO_ATLAS, {


            useNewUrlParser: true,

            useUnifiedTopology: true

        })

        console.log('db en linea')

    } catch (error) {
        throw new Error(error)
    }


}



module.exports = dbConection;