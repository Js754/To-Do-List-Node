const Express = require("express");
const ChecklistDependRouter = Express.Router();
const SimpleRouter = Express.Router();

const Checklist = require('../Models/Checklist');
const Task = require('../Models/Tasks');

ChecklistDependRouter.get("/:id/tasks/new", async function(req, res){
    try
    {
        let CurrentTask = Task();
        res.status(200).render("tasks/new", { ChecklistID: req.params.id, task: CurrentTask });
    }
    catch(err)
    {
        res.status(422).render("pages/error", {error: "Erro Ao Carregar O Formulário"});
    }
});

ChecklistDependRouter.post("/:id/tasks", async function(req, res){
    let { name } = req.body.task;
    let task = new Task({ name, Checklist: req.params.id })
    try
    {
        await task.save();
        let Check = await Checklist.findById(req.params.id);
        Check.tasks.push(task); 
        await Check.save();
        res.redirect(`/checklist/${req.params.id}`);
    }
    catch(err)
    {
        let errors = err.errors;
        res.status(422).render("tasks/new", { task: {...task, errors}, ChecklistID: req.params.id });
    }
});

SimpleRouter.delete("/:id", async function(req, res){
    try 
    {
        let task = await Task.findByIdAndDelete(req.params.id);
        let checklist = await Checklist.findById(task.Checklist);
        let TaskToRemove = checklist.tasks.indexOf(task._id);
        checklist.tasks.slice(TaskToRemove, 1);
        checklist.save();
        res.redirect(`/checklist/${checklist._id}`);
    } catch (error) 
    {
        res.status(422).render("pages/error", {error: "Erro Ao Remover Uma Tarefa"});
    }
});

SimpleRouter.put("/:id", async function(req, res){
    const task = await Task.findById(req.params.id);

    try 
    {
        task.set(req.body.task);
        await task.save();
        res.status(200).json({ task });
    } 
    catch (error) 
    {
        const errors = error.errors;
        res.status(422).json({task: {...errors}})
    }
})

module.exports = { 
    ChecklistDepend: ChecklistDependRouter,
    simple: SimpleRouter
}