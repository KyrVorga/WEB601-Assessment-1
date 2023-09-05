// const fs = require("fs");

// // Read json file
// fs.readFile("./data.json", "utf8", (err, jsonString) => {
//     if (err) {
//         console.log("File read failed:", err);
//         return;
//     }
//     try {
//         // Note that jsonString will be a < Buffer > since we did not specify an
//         // encoding type for the file. But it'll still work because JSON.parse() will
//         // use < Buffer >.toString().
//         const user = JSON.parse(jsonString);
//         console.log(user.username," is logged in"); 
//     } catch (err) {
//         console.log("Error parsing JSON string:", err);
//         return;
//     }
// });

// // Render / Parse json file
// function jsonReader(filePath, cb) {
//     fs.readFile(filePath, (err, fileData) => {
//         if (err) {
//             return cb && cb(err);
//         }
//         try {
//             const object = JSON.parse(fileData);
//             return cb && cb(null, object);
//         } catch (err) {
//             return cb && cb(err);
//         }
//     });
// }
// jsonReader("./data.json", (err, user) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
// console.log(user.username," is logged in"); 
// });

// // Write json file
// const newUser = {
//     username: "Xander",
//     password: "Password123"
// };

// const jsonString = JSON.stringify(newUser)
// fs.writeFile('./data.json', jsonString, err => {
//     if (err) {
//         console.log('Error writing file', err)
//     } else {
//         console.log('Successfully wrote file')
//     }
// })


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
