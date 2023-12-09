const Express = require("express");
const Router = Express.Router();
const Checklist = require('../Models/Checklist');

Router.get("/", async function(req, res){
    try 
    {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/Index', {checklist: checklists});
    } 
    catch (error) 
    {
        res.status(422).render("pages/error", {error: "Ocorreu Um Erro Ao Exibir As Listas"});
    }
});

Router.get("/new", async function(req, res){
    try 
    {
        let Check = new Checklist();
        res.status(200).render("checklists/new", {checklist: Check});
    } 
    catch(err) 
    {
        res.status(422).render("pages/error", { error: "Erro Ao Carregar O Formulário"})
    }
})

Router.post("/", async function(req, res) {
    let { name } = req.body.checklist;
    let check = new Checklist({ name });

    try 
    {
        await check.save();
        res.redirect("/checklist");
    } 
    catch (error) 
    {
        res.status(422).render("checklists/new", { checklist: {...check, error} });
    }
});

Router.get("/:id", async function(req, res){
    try 
    {
        const check = await Checklist.findById(req.params.id).populate("tasks");
        res.status(200).render("checklists/show", { checklist: check });
    } 
    catch (error)
    {
        res.status(422).render("pages/error", {error: "Ocorreu Um Erro Ao Exibir As Listas de Tarefa"});
    }
});

Router.get("/:id/edit", async function(req, res){
    try
    {
        let check = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/edit", {checklist: check});
    }
    catch(err)
    {
        res.status(422).render("pages/error", {error: "Ocorreu Um Erro Ao Exibir A Edição Das Listas"});
    }
})

Router.put("/:id", async function(req, res){
    let { name } = req.body.checklist;
    let check = await Checklist.findById(req.params.id);

    try 
    {
        await check.updateOne({ name });
        res.redirect('/checklist');
    } 
    catch (error) 
    {
        let errors = error.errors;
        res.status(422).render("checklists/edit", {checklist: {...check, errors}});
    }
});

Router.delete("/:id", async function(req, res){
    try 
    {
        let checklists = await Checklist.findByIdAndDelete(req.params.id);
        res.redirect("/checklist");
    } 
    catch(error) 
    {
        res.status(500).render("pages/error", {error: "Ocorreu Um Erro Ao Deletar Essa Tarefa"});
    }
})

module.exports = Router;