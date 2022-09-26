let btn = document.querySelector('#btn')
btn.onclick = async (e) => {
    e.preventDefault()
    let log = login.value
    window.localStorage.setItem("login",log)
    const password = pass.value
    const res =  await fetch('https://crmgulistonacademy.herokuapp.com/api/login', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({login:log,password})
    })
    if(res.ok) {
        window.location = 'Teacher-AllStudents.html'
    }
}