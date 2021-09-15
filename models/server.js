const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const dbConection = require('../db/config');
const Player = require('../models/players.model');


class Server {



    constructor() {
        this.app = express();
        this.port = process.env.PORT

        // Conection
        this.conection()

        //Midelwares

        this.midelwares();

        //Rutas app
        this.routes();

        // script agregar jugadores de Api
        this.scriptTask();
    }


    async conection() {

        await dbConection();

    }

    async scriptTask() {

        const player = await Player.find();

        const playerAdd = new Player();

        let url = 'https://www.easports.com/fifa/ultimate-team/api/fut/item';

        let totalPage = 0;

        if (player.length == 0) {

            let respuesta = await fetch(url);
            let { totalPages } = await respuesta.json();
            totalPage = totalPages;


            for (let i = 1; i <= totalPage; i++) {
                let respuesta = await fetch(`${url}?page=${i}`)
                let { items } = await respuesta.json();

                // items es un arreglo

                items.forEach(async (ply, i) => {
                    let { name, position } = ply;
                    let team = ply.club.name.toLowerCase();
                    let nation = ply.nation.name
                    
                    name =  name.toLowerCase()

                    let obj = {
                        name, position, team, nation
                    }

                    const playerAdd = new Player(obj);

                    await playerAdd.save()
                });
                console.log('pagina ' + i + 'de ' + totalPage);

            };

            console.log('termino')

        } else {

            console.log('entro')
        }

    }

    midelwares() {

        // parseo
        this.app.use(express.json());

        this.app.use(express.static('public'))

        this.app.use(cors({
            origin: ['http://localhost:3001', 'http://localhost:3000']
        }))
    }

    routes() {

        this.app.use('/api/v1/players', require('../routes/players'));
        this.app.use('/api/v1/team', require('../routes/team'));

    }



    lanzarServer() {

        this.app.listen(this.port, () => {
            console.log('pueto corriendo en el ' + this.port);

        })
    }



}


module.exports = Server;