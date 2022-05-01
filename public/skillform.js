let addSkillBtn = document.getElementById('addTechSkills');
let techSkillList = document.querySelector('.technicalList');
let deleteButtons = document.querySelectorAll('i')
let len=deleteButtons.length

addSkillBtn.addEventListener('click', function (event) {
    event.preventDefault();
    let newSkill = document.createElement('div');
    newSkill.classList.add("row","skillrow")
    newSkill.innerHTML =
        `
    <div class="column">
        <label for="skill">Add Your Skill</label>
        <input type="text" class="inputSkill" name="skill" id="skill" required>
    </div>
    <div class="column"> 

        <label for="level">Add your Proficiency</label>
        <input type="number" class="inputSkill" name="level" id="level" required>
        <i class="fa fa-trash-o deleteSkill" style="font-size:20px;margin-left:20px;color:rgb(240, 95, 95)"></i>
    </div>
       
    </div>
    `
    techSkillList.appendChild(newSkill)
    deleteButtons = document.querySelectorAll('i')
    len=deleteButtons.length
    for (deleteElement of deleteButtons) {
        deleteElement.addEventListener('click', deleteBlock)
    }
})


function deleteBlock(event) {
    if (len<=1){
        alert("Need atleast 1 skill")
        return
    }
    const buttonElement = event.target
    buttonElement.parentElement.parentElement.remove()
    len-=1
}
for (deleteElement of deleteButtons) {
    deleteElement.addEventListener('click', deleteBlock)
}
