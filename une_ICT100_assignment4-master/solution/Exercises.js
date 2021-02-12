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

//
let docx = nlp("Today is a sunny day. I look forward to go to the beach and buy a gelato");
console.log(docx.match("#Adjective").first().text());
console.log(docx.match("#Verb").last().text());
console.log(docx.match("#Noun").last().text());

//

const yourmanager = new PubSubManager();

function ping(msg)
{
    console.log("ping");
    yourmanager.publish("pong", {});
}
function pong(msg)
{
    console.log("pong");
    yourmanager.publish("ping", {})
}
yourmanager.subscribe("ping", ping);
yourmanager.publish("ping", {});
//When publishing a new message for the topic "ping", this message will be intercepted by  the subscriber invoking the function ping.
//ping() will log "ping" on the console and publish a message for the topic "pong". However, there are not subscribers for the topic "pong"
//and nothing else will happen
//If we had a subscriber for the topic "pong" invoking the pong(), we would have the two function keep calling each other with an infinite loop

//

let qualified = [];
function arrivedAtFinishLine(msg)
{
    if(qualified.length < 100)
        qualified.publish(msg.name);
}
manager.subscribe("new_participant_at_finish_line", arrivedAtFinishLine);
manager.publish("new_participant_at_finish_line", {name: "Loske"});
manager.publish("new_participant_at_finish_line", {name: "Snake"});
manager.publish("new_participant_at_finish_line", {name: "Yoda"});
//This code will ensure that only the first 100 participants arriving at the finish line and generating the even for the topic "new_participant_at_finish_line"
//and store the names in the list array qualified evey time a new subscriber generate the even for the topic

//
x = "0"
//x -=1
//x +=1
x+=1
document.write(x)

let [a, b] = [7, 8, 9]
document.write(a, b)

x = 3
y = 4
for (let [xx, yy] of [
    [x-1, y-1],
    [x, y-1],
    [x+1, y-1],
    //[x, y], //It won't print the coordinates "34", because we didn't use [x, y]
    [x-1, y],
    [x+1, y+1]])
    {
    console.log(`${xx} ${yy}`)
    }

//
//USE CODESANDBOX
let app = documnet.getElementById("app")
for(let y=0;y<10;y++)
{
    let button = document.createElement("button")
    button.innerText = `${y}`
    button.onclick =(evt) =>
    {
        console.log(`Now you have clicked, y is ${y}`)
    }
    app.append(button)
}
//it creates the 10 button with the for loop;
//then with the even onclick we log in the console when we click
//the button