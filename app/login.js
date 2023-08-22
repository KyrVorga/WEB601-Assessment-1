document.getElementById('login').addEventListener('click', async() => {
    data = {
        username: document.getElementById('username').innerText,
        password: document.getElementById('password').innerText
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
    console.log(response.json());
})
