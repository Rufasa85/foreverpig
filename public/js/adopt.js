document.querySelector("#adoptBtn").addEventListener("click",e=>{
    console.log(e.target);
    const userId = e.target.getAttribute("data-userid");
    console.log(userId)
    const pigId = e.target.getAttribute("data-pigid");
    console.log(pigId)
    fetch(`/api/pigs/${pigId}`,{
        method:"PUT",
        body:JSON.stringify({
            CaretakerId:userId
        }),
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