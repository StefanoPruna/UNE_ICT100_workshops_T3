/* 
TODO: Task 1 => add a click event to the button 'button-text-command' 
parse natural language commands to teleport robots
around the restaurant. The parsed robot and destination
must be published as a message for the topic
'new_command'. The message for this topic has the following
structure:
{
    robotID: <the name ID of the robot in the command>,
    landmarkID: <the name ID of the destination landmark>
}

BONUS TASK (0.5 bonus marks) => add a click event to the
button 'button-voice-command' that listens to the user's command,
parse it as above and publish the message on 'new_command' topic.
As long as the parser and publisher are correct it is not 
important if the speech-to-text fails to correctly recognise
the voice command.
*/

// function to read from the input text boxes

// const gameController = new PubSubManager();

// function readInputText(robot, clearInput){
//     let inputTextObj = document.getElementById("input-text-command");
//     let text = inputTextObj.value;
//     if (clearInput == true){
//         inputTextObj.value = '';
//     }
//     return text;
// }

// // declaring the variables for the button element
// const btnEnter = document.getElementById("button-text-command");

// // adding the event listeners for the buttons
// btnEnter.addEventListener(
//     'click',
//     function(){
//         let text = readInputText('yellow', true);
//         console.log(text);
//         handleChatMessage('robot_text', 'yellow', text);
//     }
// );

// gameController.publish("new_command", {robot: "yellow"});


//QUIZ 5
const manager = new PubSubManager();

function Ciao(msg)
{
    console.log("Ciao " + msg.name);
}

function goodbye(msg)
{
    console.log("Arrivederci " + msg.name);
}

let sub1 = manager.subscribe("say_something", goodbye);
let sub2 = manager.subscribe("say_something_different", Ciao);

manager.publish("say_something", {name: "Ste"});
manager.publish("say_something_different", {name: "Ste"});


//

var result = 0;
function change(msg)
{
    let n = msg.number;
    if(n < 10)
    {
        result = n*2;
        manager.publish("do_change", {number: result});
    }
    else{
        result = n/2;
        manager.publish("stop", {});
    }
}
let sub3 = manager.subscribe("do_change", change);
let sub4 = manager.subscribe("stop", (msg) => {console.log(result)});

manager.publish("do_change", {number: 2});
//It will multiply the number by 2(n*2 and change the result, in this case 4, then keep doing until reach 16, 4*2=8, 8*2=16, and will go to else statemenet and divide by 2
//But then stop the function and print the result 16/2=8
//


const managers = new PubSubManager();
function multiply(msg)
{
    let n = msg.number * 5;
    managers.publish("topic1", {number: n});//topic1 call the sum function according to myVar1
    managers.publish("topic2", {number: n});
}

function sum(msg)
{
    let n = msg.number + 10;
    managers.publish("topic3", {number: n});//call topic3
}
function divide(msg)
{
    let n = msg.number / 2;
    managers.publish("topic3", {number: n});
}

let myVar1 = managers.subscribe("topic1", sum);//call topic1 and then function sum
let myVar2 = managers.subscribe("topic2", divide);
let myVar3 = managers.subscribe("topic3", (msg) => { console.log(msg.number) });//display the result
let myVar4 = managers.subscribe("topic4", multiply);

managers.unsubscribe(myVar2);
managers.publish("topic4", {number: 2});
//First we publish the message from topic4/multiply(2*5=10),then it will go to topic1/sum(10+10=20)and topic2/divide(20/2=10), but we unsubscribed topic2
//so we will only sum for topic1 and then we will display the result for topic3

//

const mymanager = new PubSubManager();
function logger(msg)
{
    console.log("this is a " + msg.feeling + " " + msg.target);
}
function isPositiveFeeling(msg)
{
    console.log(msg.feeling == "good");
}

let maVar1 = mymanager.subscribe("check_feeling", isPositiveFeeling);
let maVar2 = mymanager.subscribe("log", logger);

mymanager.publish("log", {feeling: "good", target: "day"});

//

var userVisible = true;
function engageUser()
{
    console.log("Ciao Umano");
}

let approach = new Promise(
    (resolve, reject) =>
    {
        if(userVisible === true)
        {
            console.log("There is a user");
            resolve(engageUser);
        }
        else{
            reject("there isn't any");
        }
    }
).then((behaviour) => behaviour()).catch((error) => console.log("Error " + error));
//The Promise will check if there is a user visible and if there is, it will fulfil/resolve the Promise and call the function passed as parameter in ".then" 
//and display what it's in the console.log, then will run/fulfil/resolve the function engageUser