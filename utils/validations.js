
function isEmpty(value){
    return !value || value.trim()==='';
}


function userInputAreValid(email,password){
    return (
email && email.includes('@') && password && password.trim().length>=6
    );
}





function validUserInfo(email,password,name){
    return (userInputAreValid(email,password) &&
    ! isEmpty(name));
}

module.exports=validUserInfo;