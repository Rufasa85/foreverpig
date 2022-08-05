const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        email:loginForm.querySelector("#login-email").value,
        password:loginForm.querySelector("#login-password").value,
    };
    console.log(userObj);
    const loginUrl = `/api/${document.querySelector("#acct-type-login").value}s/login`
    console.log(loginUrl);
    fetch(loginUrl,{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/profile"
        } else {
            alert("trumpet sound")
        }
    })
})