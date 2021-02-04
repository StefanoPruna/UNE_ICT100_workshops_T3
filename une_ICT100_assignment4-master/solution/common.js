/*
You can add shared variables, functions and classes here.
These will be visible in all your solutions for the subtasks.
*/

async function waitForVoicesLoaded() {
    let setPromise = new Promise(
        function (resolve, reject) {
            let id;

            id = setInterval(() => {
                if (speechSynthesis.getVoices().length !== 0) {
                    resolve(speechSynthesis.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    );
    voiceList = await setPromise;
    return voiceList;
}

var __botVoices;
waitForVoicesLoaded().then(
    (result) => {
        let voiceList = result;
        __botVoices = [
            ['speak', voiceList[0]],
        ];
    }
);

function speak(robotID, sentence) {
    let utterance = new SpeechSynthesisUtterance(sentence);
    let voice = __botVoices.find((item) => {return item[0] == robotID});
    if (voice !== undefined){
        utterance.voice = voice[1];
    } else {
        // default
        utterance.voice = __botVoices[0];
    }

    // adding onstart and onend events to manage balloon GUI
    utterance.onstart = function(event){
        gameController.publish(
            'speech_event', 
            {
                eventType: 'start',
                bot: robotID,
                speech: sentence
            }
        );
    }

    utterance.onend = function(event){
        gameController.publish(
            'speech_event',
            {
                eventType: 'end',
                bot: robotID,
                speech: sentence
            }
        );
    }

    speechSynthesis.speak(utterance);
}