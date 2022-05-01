let scrollBtn = document.querySelector(".scroll-button span");
let dropDownBtn=document.querySelectorAll(".dropdown-item")

var url=window.location.pathname;
username=url.split("/")[2]

function displayTheme(theme){
    if (theme.theme=="Light"){
        document.documentElement.style.setProperty('--primary-color', 'red');

    }
    else if(theme.theme=="Dark"){
        document.documentElement.style.setProperty('--primary-color', '#5e5e5e');
    }
    else{
        document.documentElement.style.setProperty('--primary-color', 'green');
    }
}


async function getTheme(){
    const response=await fetch(`/themes/${username}`);

    const responseData=await response.json();
    console.log(responseData)

    if (responseData){
        displayTheme(responseData)
    }
   

}

function modifyTheme(event){
  const csrfToken=event.dataset.csrf;
    const theme={
       theme: event.value,
        user:username
    }

    console.log(event)
    console.log(`/updateTheme/${username}?_csrf=${csrfToken}`);
    fetch('/updateTheme/'+username+'?_csrf='+csrfToken,{
        method:"POST",
        body:JSON.stringify(theme),
        headers:{
          'Content-Type':'application/json'
        }


    });

    getTheme()
}

window.onscroll = function() {
    if(document.documentElement.scrollTop > 20){
      nav.classList.add("sticky");
      scrollBtn.style.display = "block";
    }else{
      nav.classList.remove("sticky");
      scrollBtn.style.display = "none";
    }
  }


for (button of dropDownBtn){
  button.addEventListener('click',function(event){
    ele=event.target;
    modifyTheme(ele)
  })
}

getTheme()