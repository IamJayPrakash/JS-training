console.log("hello node js!!");
var fs = require("fs");

//creating a new txt file---------------------------------
fs.appendFile(
  "myfile.txt",
  "\rHello, this the the first file i created,(creating a new file).\r",
  function (err) {
    if (err) throw err;
    console.log("Saved!");
  }
);

//---reading the file--------
var reading_txt_file = fs.readFileSync("myfile.txt", function (err) {
  if (err) throw err;
  console.log("text content read form file");
});
console.log(reading_txt_file.toString());

//opening a file

var opening_txt_file = fs.open("myfile.txt", "w", function (err) {
  if (err) throw err;
  console.log("file opened");
});

//writing to a file------

var writing_txt_file = fs.writeFileSync(
  "myfile.txt",
  "\rhello, visitor this is the new content(after write operation)\r",
  function (err) {
    if (err) throw err;
    console.log("Write operation done in file....!");
  }
);

//updating a file content

var updating_txt_file = fs.appendFileSync(
  "myfile.txt",
  "\rthis is data after updating the file content.(file content updated/added).!\r",
  function (err) {
    if (err) throw err;
    console.log("updating file done..!");
  }
);

//renaming a file created----------------
// var renaming_text_file = fs.rename("myfile.txt", "myfile1.txt", function (err) {
//   if (err) throw err;
//   console.log("file renamed successfully..!");
// });

// deleting the file content---------------

// var deleting_text_file = fs.unlinkSync("myfile1.txt", function (err) {
//   if (err) throw err;
//   console.log("file deleted successfully");
// });

//reading file (here used utf-8 encoding rather than toString())-----
var read_data = fs.readFileSync("myfile.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log(read_data);


