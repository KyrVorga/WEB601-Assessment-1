const axios = require('axios');

document.getElementById('login').addEventListener('click', login())


function login() {
    let username = document.getElementById('username').innerText;
    let password = document.getElementById('password').innerText;
    console.log(username, password)
    // axios.post('/api/user/login', {
    //     username: username,
    //     password: password
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
}

// function alert(){
//     alert('Hello there, I am being submitted')
// }

