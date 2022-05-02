
let datePicker=document.querySelectorAll('.datePickerId');
console.log(datePicker)

for(date of datePicker){
    date.max = new Date().toISOString().split("T")[0];
}



