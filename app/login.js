document.getElementById('login-btn').addEventListener('click', async() => {
    data = {
        username: document.getElementById('username-input').value,
        password: document.getElementById('password-input').value
    }

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

    const body = await response.json();
    console.log(body.token);
    sessionStorage.setItem('token', body.token); // write
})
