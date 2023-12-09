const Express = require('express');
const Router = Express.Router();

Router.get("/", async function(req, res)
{
    res.render('Pages/Index');
})

module.exports = Router;