

const { response, request } = require('express');


const Player = require('../models/players.model');



//  /api/v1/players?search=cristi&order=asc&page=1


const playersPost = async (req = request, res = response) => {


    if (req.header('x-api-key') == process.env.XHEADER) {



        let { search = "", order = 'asc', page = 1 } = req.query;

        order = order == 'asc' ? 1 : -1

        search = search.toLowerCase();

        let skip = Number(page) === 1 ? 1 : Number(page) * 10


        let players = await Player.find({ name: { $regex: search } })
            .limit(10)
            .skip(skip)
            .sort({ name: order })

        let totalItems = await Player.countDocuments({ name: { $regex: search } })




        if (players.length == 0) {

            res.status(400).json({
                message: 'No hay concidencias'
            })

        } else {

            res.json({
                Page: Number(page),
                totalPages: parseInt(totalItems / 10),
                Items: 10,
                totalItems: totalItems,
                players: players.map(p => {
                    let { name, position, nation } = p

                    return { name, position, nation }
                })
            })

        }
    } else {

        res.status(400).json({

            message: 'password header invalid'
        })
    }


}


module.exports = playersPost;