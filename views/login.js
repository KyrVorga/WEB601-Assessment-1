const axios = require('axios');

function login(username, password) {
    axios.post('/api/user/login', {
        username: username,
        password: password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}