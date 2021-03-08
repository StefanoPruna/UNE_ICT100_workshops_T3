//FOR THIS CODE USE PLAYCODE EDITOR
let obj = 
{
  "hello": (name) =>
  {
    console.log("hello " + name)
  },
  "test": (name) =>
  {
    console.log(" test " + name)
  }
}
console.log(obj["hello"]("hello"))

//Or we can call the object inside as following
let obj = 
{
  "hello": (name) =>
  {
    console.log("hello " + name)
  },
  "test": (name) =>
  {
    console.log(" test " + name)
  }
}
console.log(obj.test("world"))

//

let a =1
let b = 2
console.log(`a is ${a} and b is ${b}`)

let arr = ["a", "b", "c"];
for (let x in arr)
{
  x = "change?"; //the array list will not change outside of this loop, but inside only
  console.log(x); //the result is change three times
}
console.log(arr); //the result is ["a", "b", "c"]

//

let arr = [
  ["a","b","c"],
  ["d","e","f","j"],
  ["g","h","i"]
]
console.log(arr[1][2]) //the result is f
console.log(arr[1][0]) //the result is d
console.log(arr[1].length) //the result is 4
console.log(arr.length) //the result is 3
console.log(arr[1].push("z"))//the result is 5, because we add z into the 2nd line


//Callback function
function angryResponse(msg)
{
    if(msg.content == "Ciao")
        console.log("Don't say ciao to me");
    else
        console.log("I don't want to talk to you");
}

function happyResponse(msg)
{
    if(msg.content == "Ciao")
        console.log("Ciao to you");
    else
        console.log("It's so nice to meet you");
}

let repeat = (msg) => console.log(msg.content); //This is the callback function that we assigned to a var repeat

let smile = function (msg) { console.log(":)") };

//manager.subscribe("new_message", repeat);
smile({});//it will print :) just generic function

repeat({content:"Ciao"});

//

let arr = [1, 2, 3]

console.log(arr.filter((a) => a % 2 == 0))
//console.log(arr)
//filter returns a filtered copy of the array, but doesn't modify the original

console.log(arr.map((a) => a*2))
//console.log(arr)
//map returns a transformed copy of the array, but doesn't modify the original

let myArr = [1, 3, 5]
console.log(myArr.reduce((a, b) => a+b,0))
//reduce does what command there is after, in this case sum all the numbers in the array starting with the number after the comma

console.log(myArr.reduce((a, b) => a*b,2))
//reduce does what command there is after, in this case multiply/product of all the numbers in the array starting with the number after the comma

//

function doSomething(something)
{
  something();
}
doSomething(() => {console.log("Hello")});
//the doSomething function accepts another function as parameter and invoking; the argument something() is a callback function.
//we are trying to run a console.log command as a callback function of doSomething(), however console.log is expecting an argument that we don't provide.
//for this reason, we create another function, something(), that doesn't take any argument, which is the argument for doSomething() that console.log is expecting

//alternative way to do the above function, in this example, console.log function is the argument
function doSomething()
{
  console.log("Hello")
}
doSomething()

//

//IN A PROMISE OBJECT, IF THE PROIMISE IS FULFILLED OR REJECTED, WE USE THEN
const promise1 = new Promise((resolve, reject) => {
  resolve('Success!');
});

promise1.then((value) => {
  console.log(value);
  // expected output: "Success!"
});

p.then(onFulfilled[, onRejected]);

p.then(value => {
  // fulfillment
}, reason => {
  // rejection
});
//we don't return a value with promise, but resolve or reject,

//

//we will access the try block and log "i try", then we will generate the error in catch, but the error is before the console.log, so we don't log it, then
//it will move to finally block and run the bad function;
//if we put the console.log before the throw error in the catch block, we will see that log too
function bad()
{
    throw(Error("This is a bad bug"));
}
try{
    console.log("I try");
    bad();
}
catch (err)
{
    throw(err);
    console.log("Whoops");
}
finally
{
    console.log("At least I tried");
}
