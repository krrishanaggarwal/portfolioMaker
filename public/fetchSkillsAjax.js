let skillElements= document.getElementById('skillBarAjax')

let skillBarsList= document.getElementById('skillsBars')
var url=window.location.pathname;
console.log(window.location.pathname)
username=url.split("/")[2]


async function getSkillsForUser(){
    const response=await fetch(`/skills/${username}`);
    console.log(response)
    const responseData=await response.json();
    console.log(responseData)
    const skillBarsList=createSkillsList(responseData);
    if(skillElements){
        skillElements.innerHTML=""
        skillElements.appendChild(skillBarsList)
    }



}

function createSkillsList(skills){
    
    for (const skill of skills){
        if(skill.skill && skill.skill.length>0){
        let skillBox=document.createElement('div')
        skillBox.innerHTML=`
          <li><h3>${skill.skill}</h3></li>
          <span class="bar"><span style="width:${skill.proficiency}%"></span></span>
        `
        skillBarsList.appendChild(skillBox)}
    }

    return skillBarsList
}

getSkillsForUser()