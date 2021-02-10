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
function readInputText(clearInput){
    let inputTextObj = document.getElementById("input-text-command");
    let text = inputTextObj.value;
    if (clearInput == true){
        inputTextObj.value = '';
    }
    return text;
}

function handleChatMessage(sender, receiver, content)
{
    message = 
    {
        sender: sender,
        receiver: receiver,
        content: message
    }
    gameController.publish("new_command", message);
}

// declaring the variables for the button element
const btnEnter = document.getElementById("button-text-command");

// adding the event listeners for the buttons
btnEnter.addEventListener(
    'click',
    function(){
        let text = readInputText('yellow', true);
        console.log(text);
        handleChatMessage('robot_text', 'yellow', text);
    }
);

let subChatMessage = gameController.subscribe('new_command', (message) =>
{
    let sender = message.sender;
    let bot = message.receiver;
    let text = message.content;
});

// let yellow = gameController.subscribe("new_command", text);
// let green = gameController.subscribe("new_command", (text) => {console.log(`New message: ${text.content}`)});
// gameController.publish(new_command, text);
