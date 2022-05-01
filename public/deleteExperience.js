const deleteExperienceButtons=document.querySelectorAll('.deleteExperience')

async function deleteExp(event){
    const buttonElement=event.target
    const expId=buttonElement.dataset.experienceid;
    const csrfToken=buttonElement.dataset.csrf;

    const response=await fetch('/removeExperience/'+expId+'?_csrf='+csrfToken,{
        method:'DELETE'
    });

    if (!response.ok){
        alert("something wrong")
        return;
    }
    buttonElement.parentElement.parentElement.parentElement.parentElement.remove()
}
for (const deleteElement of deleteExperienceButtons){
    deleteElement.addEventListener('click',deleteExp)
}