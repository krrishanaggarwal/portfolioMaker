let addTechUsedBtn=document.getElementById('addMoreTechUsed')
let techStackList=document.querySelector('.TechStackList');
let techUsedDiv=document.querySelectorAll('.techDiv')[0]
let deleteButtons = document.querySelectorAll('i')
let len=deleteButtons.length
addTechUsedBtn.addEventListener('click',function(event){
    event.preventDefault()
    console.log("clicked");
    let newtech=techUsedDiv.cloneNode(true)
    const inputElements=newtech.querySelectorAll(' .inputSkill')
    for (i of inputElements){
        console.log(i.value)
        i.value=""
    }
    techStackList.appendChild(newtech)
    let deleteButtons=document.querySelectorAll('i')
    len=deleteButtons.length
    for (deleteElement of deleteButtons){
        console.log(deleteElement.innerHTML)
        deleteElement.addEventListener('click',deleteBlock)
    }
});

function deleteBlock(event){
    if (len<=1){
        alert("Need atleast 1 skill")
        return
    }
    const buttonElement=event.target
    buttonElement.parentElement.parentElement.parentElement.remove()
    len-=1
}

for (deleteElement of deleteButtons){
    console.log(deleteElement.innerHTML)
    deleteElement.addEventListener('click',deleteBlock)
}