const Server = require('../routes/server')

module.exports.setServer =async()=>{
    const {server}=req.body;
    try {
        const server = await Server.findOne({});
        console.log(server)
        res.status(200).json(server)
    } catch (error) {
        res.status(500).send(error)
    }
}