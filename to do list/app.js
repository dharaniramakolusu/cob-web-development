let inputs=document.getElementById("inp");
let text=document.querySelector(".text");
function Add(){
    if(inputs.value == "")
    {
        alert("ENTER TASK")
    }
    else{
       let newEle= document.createElement("li");
       newEle.innerHTML=`${inputs.value}  <i class="fa fa-solid fa-trash"></i>`
       text.appendChild(newEle) ;
       inputs.value="";
       newEle.querySelector("i").addEventListener("click",remove);
       function remove(){
        newEle.remove()
       }
    }
}