document.getElementById('register-btn').addEventListener('click', async() => {
    // Get user input from input form
    data = {
        username: document.getElementById('username-input').value,
        name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value,
        password: document.getElementById('password-input').value
    }

    // Send post request to login endpoint containing user data
    const response = await fetch('/api/user/register', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: "same-origin",
        body: JSON.stringify(data),
    });

    // if the respones comes back OK then redirect to profile page
    if (response.status === 200 && response.ok === true) {
        window.location.replace('http://localhost:3000/views/profile.ejs')
    }
})
