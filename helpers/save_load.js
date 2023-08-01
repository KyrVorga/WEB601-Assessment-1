const fs = require("fs");
// generic funtion to read and return an object from a json file
// const read = async (path) => {
//     await fs.readFile(path, (err, data) => {
//         if (err) throw err;
//         return JSON.parse(data.toString());
//     });
// };


// const save = async (path, json) => {
//     //console.log(json);
//     await fs.writeFile(path, JSON.stringify(json, null, 2), (err) => {
//         if (err) {
//             console.log('Failed to write updated data to file');
//             return;
//         }
//         console.log('Updated file successfully');
//     });
// };

const read = (path) => {
    console.log(path)
    
    fs.readFileSync(path, (err, data) => {
        console.log(data)
        if (err) throw err;
        return JSON.parse(data.toString());
    });
};


const save = (path, json) => {
    //console.log(json);
    fs.writeFileSync(path, JSON.stringify(json, null, 2), (err) => {
        if (err) {
            console.log('Failed to write updated data to file');
            return;
        }
        console.log('Updated file successfully');
    });
};

module.exports = { read, save };