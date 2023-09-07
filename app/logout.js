document.getElementById('logout-btn').addEventListener('click', async() => {
   
    
    // Send get request to the logout endpoint
    const response = await fetch('/api/user/logout', {
        method: "GET"
    });

    
    // if the respones comes back OK then redirect to about page
    if (response.status === 200 && response.ok === true) {
        window.location.replace('http://localhost:3000/views/about.ejs')
    }

})