let API = 'https://crmgulistonacademy.herokuapp.com/api'
let ism = window.localStorage.getItem('login')
async function render (ism) {
    let response = await fetch(API + `/groups/${ism}`)
    let groups = await response.json()
    groups[0].map((el,i)=> {
        group.innerHTML += `
        <a onclick="renderStudent(${el.id})" class="list-group-item list-group-item-action">${el.group_name}</a>
        `
    })
}
render (ism)
async function renderStudent(id) {
    let response = await fetch(API + `/groupStudent/${id}`)
    let groups = await response.json()
    let group = groups[0][0].group_name
    groupName.innerHTML = ''
    groupName.innerHTML += `
    <h2 class="elements-card-title text-center text-white m-0 mx-auto">${group}</h2>
    `
    let respons = await fetch(API + '/students')
    let students = await respons.json()
    let student = students.filter(el => el.group_name == group)
    tbody.innerHTML = ""
    student.map((el,i)=> {
        tbody.innerHTML += `
        <tr>
            <td>${++i}</td>
            <td>${el.name} ${el.surname}</td>
            <td>${el.contact}</td>
            <td>
               <input onclick="tokenStudent(event,${el.id})" type="checkbox">
            </td>
        </tr>
        `
    })
}
async function tokenStudent (event,id) {
    await fetch(API + `/students/${id}`,{
        method: 'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token_id: true})
    })

    let res = await fetch( API + '/students/token', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
    })
    let token = await res.json()
    // console.log(token.jwt);
}

