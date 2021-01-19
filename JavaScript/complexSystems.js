//In the following code, we process one line at the time
// function makeSomething(something)
// {
//     console.log(`${something} is ready`);
// }

// function prepareBreakfast()
// {
//     console.log("Making breakfast");
//     makeSomething("Toast");
//     makeSomething("Coffee");
//     makeSomething("Nutella");
//     console.log("Breakfast is ready!");
// }

// prepareBreakfast();

//We are now setting some times in between each time we call the function with the built-in setTimeout() function
// function makeSomething(something, prepTime)
// {
//     setTimeout(() => 
//     {
//         console.log(`${something} is ready`);
//     }, prepTime);
// }

// function prepareBreakfast()
// {
//     //We are giving some wait time, in this case seconds, before running each code
//     console.log("Making breakfast");
//     makeSomething("Toast", 4000);
//     makeSomething("Coffee", 2000);
//     makeSomething("Nutella", 6000);
//     console.log("Breakfast is ready!");
// }

// prepareBreakfast();

//The setTimeout() function is asynchronous and thus the commands are immediately executed
//With promise we can synchronize when we call the functions together

// function makeSomething(something, prepTime)
// {
//     let promise = new Promise((resolve) => 
//     {
//         setTimeout(() =>
//         {
//             console.log(`${something} is ready`);
//             resolve();
//         }, prepTime);
//     })
//     return promise;
// }

//Synchronized function now
// function prepareBreakfast()
// {
//     console.log("Making breakfast now: ");
//     makeSomething("Toast", 4000).then(() =>
//     {
//         makeSomething("Coffee", 2000).then(() =>
//         {
//             makeSomething("Nutella", 6000).then(() =>
//             {
//                 console.log("Breakfast is ready now");
//             });
//         });
//     });
// }
// prepareBreakfast();

//The problem is now the makeSomething() function is asynchronous
//thus, we have to use the await and Promise.all commands
function makeSomething(something, prepTime)
{
    let promise = new Promise((resolve) =>
    {
        setTimeout(() =>
        {
            console.log(`${something} is ready`);
            resolve();
        }, prepTime);
    })
    return promise;
}

async function prepareBreakfast()
{
    console.log("Making breakfast now: ");
    let promise = Promise.all([
        makeSomething("Toast", 4000),
        makeSomething("Coffee", 2000),
        makeSomething("Nutella", 6000)
    ]);
    await promise;
    console.log("Breakfast is ready now!");
}
prepareBreakfast();