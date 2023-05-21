const Server = require('../routes/server')

module.exports.setServer =async()=>{
    try {
        const serverOne= await Server.findOne({});
        serverOne.server=req.body.server
        res.status(200).json(server)
    } catch (error) {
        res.status(500).send(error)
    }
}
