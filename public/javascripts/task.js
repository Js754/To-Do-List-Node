const setTagAsDone = async (element, id) => {
    event.preventDefault();
    try 
    {
        const headers = new Headers({"Content-Type" : 'application/json'});
        const body = JSON.stringify({task: {done: element.checked}});
        const response = await fetch(`/tasks/${id}?_method=put`, { headers: headers, body: body, method: 'PUT' });
        const data = await response.json();
        const stateTask = data.task;
        let parent = element.parentNode;

        if(stateTask.done)
        {
            element.checked = true;
            parent.classList.add("has-text-success");
            parent.classList.add("is-italic");
        }
        else
        {
            element.checked = false;
            parent.classList.remove("has-text-success");
            parent.classList.remove("is-italic");
        }
    } 
    catch (error) 
    {
        alert("Erro Ao Atualizar a Tarefa");
    }
}