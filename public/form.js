
let datePicker=document.querySelectorAll('.datePickerId');

for(date of datePicker){
    date.max = new Date().toISOString().split("T")[0];
}



