
const { response, request } = require('express');
const Player = require('../models/players.model');


/*
{
    “Name” : “real madrid”,
    “Page” : 1
    }
*/
const teamGet = async (req = request, res = response) => {


    if (req.header('x-api-key') == process.env.XHEADER) {

        let { Name, Page = 1 } = req.body;
        Name = Name.toLowerCase();

        console.log(req.body)

        let skip = Number(Page) === 1 ? 1 : Number(Page) * 10

        const players = await Player.find({ team: Name })
            .limit(10)
            .skip(skip)

        let numberItems = await Player.countDocuments({ team: Name })


        if (players.length == 0) {
            return res.status(400).json({
                message: 'El equipo no existe o esta mal escrito'
            })
        }

        res.json({
            Page: Page,
            totalPages: parseInt(numberItems / 10),
            Items: 10,
            totalItems: numberItems,
            players: players.map(p => {
                let { name, position, nation } = p
                return { name, position, nation }
            })
        })

    } else {
        res.status(400).json({

            message: 'password header invalid'
        })
    }
}


module.exports = teamGet;