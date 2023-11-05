// Import required packages and modules
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Prompt the user for input
inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    console.log(answers);
    var urlInput = document.getElementById("link");
    urlInput.innerHTML = answers;
    // Generate the QR code
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    // Save URL to a text file
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("Your QR code was generated.");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });


// document.addEventListener("DOMContentLoaded", () => {
//   const generateButton = document.getElementById("generate_qr");
//   const urlInput = document.getElementById("url_link");
//   const qrImage = document.querySelector("img");

//   generateButton.addEventListener("click", () => {
//     const url = urlInput.value;

//     if (url.trim() === "") {
//       alert("Please enter a valid URL.");
//     } else {
//       // Generate QR code
//       const qr_svg = qr.imageSync(url, { type: 'png' });
//       qrImage.src = "data:image/png;base64," + qr_svg.toString("base64");

//       // Save URL to a text file
//       const fs = require("fs");
//       fs.writeFile("URL.txt", url, (err) => {
//         if (err) throw err;
//         console.log("Your QR code was generated.");
//       });
//     }
//   });
// });