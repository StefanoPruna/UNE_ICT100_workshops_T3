// function to read from the input text boxes
function readInputText(botName, clearInput){
    let inputTextObj = document.getElementById(`input-text-${botName}`);
    let text = inputTextObj.value;
    if (clearInput == true){
        inputTextObj.value = '';
    }
    return text;
}

function handleChatMessage(sender, receiver, chatMessage)
{
    message = 
    {
        sender: sender,
        receiver: receiver,
        content: chatMessage
    }
    manager.publish('new_chat_message', message);
}

// declaring the variables for the two button elements
const btnTextPico = document.getElementById('text-pico');
const btnTextBit = document.getElementById('text-bit');

// adding the event listeners for the buttons
btnTextPico.addEventListener(
    'click',
    function(){
        let text = readInputText('pico', 'You said: ' + true);
        //showTextBalloon('pico', text);
        handleChatMessage('user_text', 'pico', 'You wrote: ' + text);
        //speak('pico', text);
    }
);

btnTextBit.addEventListener(
    'click',
    function(){
        let text = readInputText('bit', "He said: " + true);
        //showTextBalloon('bit', text);
        handleChatMessage('user_text', 'bit', 'He wrote: ' + text);
        //speak('bit', text);
    }
);

const btnTalkPico = document.getElementById('talk-to-pico');

btnTalkPico.addEventListener('click', function()
{
    let text;
    listen((result) => 
    {
        let text = 'You said: ' + result;
        handleChatMessage('user_speech', 'pico', text);
        //speak('pico', text);
    });
})

const btnTalkBit = document.getElementById('talk-to-bit');

btnTalkBit.addEventListener('click', function()
{
    let text;
    listen((result) =>
    {
        let text = 'He said: ' + result;
        handleChatMessage('user_speech', 'bit', text);
    });
})

let subBalloon = manager.subscribe('speech_event', (message) => 
{
    let eventType = message.eventType;
    let bot = message.bot;
    let text = message.speech;
    if (eventType === 'start')
    {
        showTextBalloon(bot, text);
    }
    else
     hideTextBalloon(bot);
});

let subChatMessage = manager.subscribe('new_chat_message', (message) =>
{
    let sender = message.sender;
    let bot = message.receiver;
    let text = message.content;
    /*if (sender === 'user_speech') //This is the way the teacher did
    {
        text = `You said: ${text}`;
    }
    else
      text = `You wrote: ${text}`;*/
    speak(bot, text);
})
