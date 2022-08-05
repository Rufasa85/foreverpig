document.querySelector("#newPigForm").addEventListener("submit",e=>{
    e.preventDefault();
    const pigObj = {
        name:document.querySelector("#name").value,
        dob:document.querySelector("#dob").value,
        description:document.querySelector("#description").value,
    }
    fetch("/api/pigs",{
        method:"POST",
        body:JSON.stringify(pigObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})