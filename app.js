const Express = require("express");
const path = require('path');
const CheckListRouter = require("./Source/Routes/checklist");
const RootRouter = require("./Source/Routes/Index");

const TaskRouter = require("./Source/Routes/task");
const methodOverride = require("method-override");

require("./config/database");

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));  
app.use(methodOverride("_method", {methods: ['POST', 'GET']}));

app.use(Express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "Source/views"));
app.set("view engine", 'ejs');

app.use('/', RootRouter);
app.use('/checklist', CheckListRouter);
app.use('/checklist', TaskRouter.ChecklistDepend);
app.use('/tasks', TaskRouter.simple);

app.listen(3000, function(){
    console.log("Server Rodando!");
});