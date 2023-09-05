document.getElementById('login-btn').addEventListener('click', async() => {
    // Get user input from input form
    data = {
        username: document.getElementById('username-input').value,
        password: document.getElementById('password-input').value
    }
    
    // Send post request to login endpoint containing user data
    const response = await fetch('/api/user/login', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "same-origin",
        body: JSON.stringify(data),
    });

    // FIXME - Should check the response to see if its an error or not. then attempt to store the token
    // Recieve response
    // const body = await response.json();
    // console.log(body.token);

    // // Store token into session storage
    // sessionStorage.setItem('token', body.token); // write
})
