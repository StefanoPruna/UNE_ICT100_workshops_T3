reBox = 'toy car';
"toy car"
greenBox = 'toy soldier'
"toy soldier"
blueBox = 'toy car'
"toy car"
reBox === greenBox
false
reBox === blueBox
true
storage = greenBox;
"toy soldier"
greenBox = 'plant'
"plant"
greenBox
"plant"
storage
"toy soldier"
greenBox = undefined
undefined
greenBox = null
null
redBox.length
reBox.length
7
reBox.toString.length
0
(reBox.toString()).length
7
simpleVar = 200
200
(simpleVar.toString()).length
3
myGlobal = 10;
10
function myFun(localParam)
{
    sum = myGlobal + localParam;
    return sum;
}
undefined
myGlobal
10
myFun(5)
15
anotherVar = 5;
5
myFun(anotherVar)
15
pointer = myFun
ƒ myFun(localParam)
{
    sum = myGlobal + localParam;
    return sum;
}
pointer(7)
17
anonymFun = function(param1)
{
    console.log(param1);
}
ƒ (param1)
{
    console.log(param1);
}
anonymFun(0)
VM1283:3 0
undefined
function metaFunction(param1, callback)
{
    result = callback(param1);
    return result;
}
undefined
metaFunction(7, myFun);
17
arrowFunc = (param1, param2) =>
{
    return param1 + param2;
}
(param1, param2) =>
{
    return param1 + param2;
}
arrowFunc(1,2)