var data = require("../data.json");
const fs = require('fs')

exports.addAccount = function(request, response) {   
	// var mydata = JSON.parse(data);
	// alert(mydata[0].name);
	// alert(mydata[0].age);
	// alert(mydata[1].name);
	// alert(mydata[1].age);

// 	fs.readFile('data.json', 'utf-8', (err, data) => {
//     if (err) {
//         throw err;
//     }

//     // parse JSON object
//     const user = JSON.parse(data.toString());

//     // print JSON object
//     console.log(user);
// });

	//console.log('hi');
	var hold = {'name':request.query.name,'description':request.query.description};
	data.acc.push(hold);
	console.log(data.acc)
	var json = JSON.stringify(hold);
	var fs = require('fs');
	// fs.writeFile('data.json', json, 'utf8', callback);
// 	fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//     obj = JSON.parse(data); //now it an object
//     obj.table.push(hold); //add some data
//     json = JSON.stringify(obj); //convert it back to json
//     fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
// }});
function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}
jsonReader('./data.json', (err, customer) => {
    if (err) {
        console.log('Error reading file:',err)
        return
    }// increase customer order count by 1
    fs.writeFile('./data.json', JSON.stringify(data), (err) => {
        if (err) console.log('Error writing file:', err)
    })
})
//appends an "active" class to .popup and .popup-content when the "Open" button is clicked
//alert("Accounts soon!")
response.end();
 }

// exports.addAccounts = function(request,response) {
// 	//alert("A");
// 	var name = request.query.name;
// 	var description = request.query.description;
// 	// console.log(request.body)
// 	// console.log(name);
// 	var hold = {'name':request.query.name,'description':request.query.description};
// 	data.acc.push(hold);
// 	//data.acc.push(name);
// 	response.send('Name: ' + name  + " Description: " + description);
// 	//response.send(description);
// }
