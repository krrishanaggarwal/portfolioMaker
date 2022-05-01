const deleteProjectButtons=document.querySelectorAll('.deleteProject')

async function deleteProject(event){
    const buttonElement=event.target
    const projectId=buttonElement.dataset.projectid;
    const csrfToken=buttonElement.dataset.csrf;
    console.log(csrfToken)
    console.log(projectId)

    const response=await fetch('/projectRemove/'+projectId+'?_csrf='+csrfToken,{
        method:'DELETE'
    });

    if (!response.ok){
        alert("something wrong")
        return;
    }
    buttonElement.parentElement.parentElement.remove()
}
for (const deleteElement of deleteProjectButtons){
    deleteElement.addEventListener('click',deleteProject)
}