const fs = require("fs");

// Read json file
fs.readFile("./data.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    try {
        // Note that jsonString will be a < Buffer > since we did not specify an
        // encoding type for the file. But it'll still work because JSON.parse() will
        // use < Buffer >.toString().
        const user = JSON.parse(jsonString);
        console.log(user.username," is logged in"); 
    } catch (err) {
        console.log("Error parsing JSON string:", err);
        return;
    }
});

// Render / Parse json file
function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}
jsonReader("./data.json", (err, user) => {
    if (err) {
        console.log(err);
        return;
    }
console.log(user.username," is logged in"); 
});

// Write json file
const newUser = {
    username: "Xander",
    password: "Password123"
};

const jsonString = JSON.stringify(newUser)fs.writeFile('./data.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})