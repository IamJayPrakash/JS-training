console.log("=--------this is an example of callback() in js=-------------------");

var First_name = "jay";
var Last_name = "Prakash";

// function 1-------------
function show_name(a, b) {
    console.log(`My name is ${a} ${b}`);
}

// function 2-------------------------
function show_details(c, d, callback) {
    console.log(`My first name is ${c}`);
    console.log(`My last name is ${d}`);
    callback(c, d);
}
// calling 2nd function and passing the attributes and the first function as an argument ------------------
show_details(First_name, Last_name, show_name);

// ======================Nested callback in js====================================================
console.log("");
console.log("-------This output for nested callback---------------");

function function1(callback) {
    setTimeout(function () {
        console.log("function 1 executed..!.");
        callback();
    }, 600);
}

function function2(callback) {
    setTimeout(function () {
        console.log("function 2 executed..!.");
        callback();
    }, 800);
}

function function3(callback) {
    setTimeout(function () {
        console.log("function 3 executed..!.");
        callback();

    }, 1000);
}

function startFunctions() {
    function1(function () {
        function2(function () {
            function3(function () {
                console.log("All functions executed..!.");
            });
        });
    });
}

startFunctions();

// =====================Promises (handling callback hell)=======================

function promiseFunction1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Function 1 executed via help of promises. .!.");
            resolve();
        }, 1100);
    });
}

function promiseFunction2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Function 2 executed via help of promises...!.");
            resolve();
        }, 1300);
    });
}

function promiseFunction3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Function 3 executed via help of promises..!.");
            resolve();
        }, 1500);
    });
}

function startPromiseFunctions() {
    promiseFunction1()
        .then(promiseFunction2)
        .then(promiseFunction3)
        .then(() => {
            console.log("All functions executed via help of promises...!.");
        })
        .catch((error) => {
            console.error("An error occurred:", error);
        });
}

startPromiseFunctions();