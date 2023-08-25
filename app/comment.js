document.getElementById('submit-comment').addEventListener('click', async() => {

    const input = document.getElementById('comment-input').value
    const token = sessionStorage.getItem('token')
    let data = {
        "input": input,
        "token": token
    }
    console.log(data)
    const response = await fetch('/api/comment/', {
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
})