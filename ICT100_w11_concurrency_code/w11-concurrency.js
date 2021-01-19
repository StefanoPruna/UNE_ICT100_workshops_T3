// class pub/sub manager for event-driven approach
class PubSubManager {

    // constructor creating empty list
    // of subscribers
    constructor(verbose) {
        this.subscribers = [];
        this.lastId = 0; 
        this.verbose = verbose;
    }

    msg_to_str(message) {
        var str_obj = '';
        for (var key in message) {
            if (str_obj.length > 0) {
                str_obj += ', ';
            }
            str_obj += key + ' -> ' + message[key];
        }
        return '(' + str_obj + ')';
    }

    // method to publish a message for a topic
    // topic is a string
    // message is an object {}
    publish(topic, message){

        this.consoleLog('Publishing message ' +  this.msg_to_str(message) + ' for topic ' + topic);
        for (var index in this.subscribers) {
            if (this.subscribers[index].topic == topic) {
                this.consoleLog('Message for topic ' + topic + ' received by subscriber ' + this.subscribers[index].id)
                if (this.subscribers[index].callback.constructor.name === 'Function'){
                    new Promise((resolve) => {let outcome = this.subscribers[index].callback(message); resolve(outcome);});
                } else {
                    // Already async function
                    this.subscribers[index].callback(message);
                }
            }
        }
    }

    // method to subscribe to a topic
    // topic is a string
    // callback is a callback function with a single parameter message
    // the method return a subscriber id
    subscribe(topic, callback){
        this.lastId++;
        this.subscribers[this.subscribers.length] = {
            id: this.lastId,
            topic: topic,
            callback: callback
        }
        this.consoleLog('Created new subscriber for topic ' + topic + ' with id ' + this.lastId);
        return this.lastId;
    }

    // method to unsubscribe
    // subscriber_id is an int
    // the method return true if successfully unsubscribed or false otherwise
    unsubscribe(subscriber_id) {
        for (var index in this.subscribers){
            if (this.subscribers[index].id == subscriber_id) {
                this.consoleLog('Unsubscribing subscriber with id ' + subscriber_id + ' for topic ' + this.subscribers[index].topic);
                this.subscribers.splice(index,1);
                return true;
            }
        }

        return false;
    }

    sendLog(logText, logType){
        if (logText !== ''){
            this.publish('log', {
                logType: logType,
                logMessage: logText
            });
        }
    }

    log(logText) {
        this.sendLog(logText, 'info');
    }

    logError(logText) {
        this.sendLog(logText, 'error');
    }

    logWarning(logText) {
        this.sendLog(logText, 'warning');
    }

    logEvent(logText){
        this.sendLog(logText, 'event');
    }

    consoleLog(log){
        if (this.verbose){
            console.log(log);
        }
    }
}

// creating the pub/sub manager object
var manager = new PubSubManager(false);

class Resource{
    constructor(name){
        this.name = name;
        this.tokens = [];
        this.nextToken = 0;
    }

    async acquire(waitToken){
        if(waitToken === false && this.tokens.length > 0){
            return null;
        }
        let token = this.nextToken++;
        this.tokens.push(token);
        if (this.tokens.length > 1){
            // there was already an acquisition
            let isThisAcquisitionNext = () => {
                return this.tokens.length == 0 || this.tokens[0] === token;
            }
            let acquisitionPromise = new Promise(
                (resolve) => {
                    let subPromise = manager.subscribe('resource_released', (msg) => {
                        if (msg.name === this.name && isThisAcquisitionNext()){
                            resolve(subPromise);
                        }
                    });
                }
            ).then((sub) => {
                if (sub !== null){
                    manager.unsubscribe(sub);
                }
            });
            await acquisitionPromise;
        }
        return token;
    }

    release(token){
        let tokenIdx = this.tokens.findIndex((value) => {return value === token});
        if (tokenIdx >= 0){
            this.tokens.splice(tokenIdx,1);
            this.notify();
            return true;
        } else {
            return false;
        }
    }

    notify(){
        manager.publish('resource_released', {
            name: this.name
        });
    }
}

let kettle = new Resource('kettle');
let plug = new Resource('plug');
let plate = new Resource('plate');
let toaster = new Resource('toaster');
let cup = new Resource('cup');

function sleep(ms){
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

async function safeAcquire(resources){
    let acquired = [];
    try {
        while(acquired.length != resources.length){
            for (let r of resources){
                let token = await r.acquire(false);
                if (token !== null){
                    acquired.push([r, token]);
                    console.log(`Acquired ${r.name}`);
                } else {
                    while (acquired.length > 0){
                        let [r, token] = acquired.pop();
                        console.log(`Releasing ${r.name}`);
                        r.release(token);
                    }
                    await sleep(Math.random()*2000);
                    break;
                }
            }
        }
    } catch (err){
        console.log(err);
        while (acquired.length > 0){
            let [r, token] = acquired.pop();
            console.log(`Releasing ${r.name}`);
            r.release(token);
        }
        return null;
    }
    return acquired;
}

function makeSomething(something, prepTime, resources){
    let promise = new Promise(async (resolve, reject) => {
        let acquired = await safeAcquire(resources);
        if (acquired != null){
            setTimeout(() => {
                console.log(`${something} is ready`);
                while (acquired.length > 0){
                    let [r, token] = acquired.pop();
                    console.log(`Releasing ${r.name}`);
                    r.release(token);
                }
                resolve();
            }, prepTime);
        }
    })
    return promise;
}


async function prepareBreakfast(){
    console.log('Making breakfast');
    let promise = Promise.all([
        makeSomething('Toast', 4000, [plug, plate, toaster]),
        makeSomething('Coffee', 2000, [kettle, plug, cup]),
        makeSomething('Oatmeal', 6000, [plate, kettle])
    ]).catch((err) => console.log(err));
    await promise;
    console.log('Breakfast ready!');
}

prepareBreakfast();