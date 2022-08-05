const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit",e=>{
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(pos=>{
        console.log(pos.coords)
        const userObj = {
            email:signupForm.querySelector("#signup-email").value,
            city:signupForm.querySelector("#signup-city").value,
            numPigs:signupForm.querySelector("#signup-numPigs").value,
            password:signupForm.querySelector("#signup-password").value,
            lat:pos.coords.latitude,
            lng:pos.coords.longitude
        };
        console.log(userObj);
        const loginUrl = `/api/${document.querySelector("#acct-type-signup").value}s`
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
})