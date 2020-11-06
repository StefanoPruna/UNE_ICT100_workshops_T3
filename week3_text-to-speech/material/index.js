function readInputText(botName, clearInput)
{
    inputTextObj = document.getElementById(`input-text-${botName}`);
    text = inputTextObj.value;
    if(clearInput == true)
    {
        inputTextObj.value = '';
    }
    return text;
}

const btnTextPico = document.getElementById('text-pico');
const btnTextBit = document.getElementById('text-bit');

btnTextPico.addEventListener
('click', function()
 {
    text = readInputText('pico', true);
    console.log(text); //in this way the robot talk/write the test in the console
    showTextBalloon('pico', text); //in this way it will show the balloon with the text
    //speak('pico', text); //with speak() function the robot will speak
 }
);

btnTextBit.addEventListener
('click', function()
 {
     text = readInputText('bit', true);
     console.log(text);
     showTextBalloon('bit', text);
     //speak('bit', text);
 });