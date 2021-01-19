class Resource
{
    constructor(name)
    {
        this.name = name;
    }
}

let kettle = new Resource("Kettle");
let plate = new Resource("plate");
let toaster = new Resource("toaster");
let cup = new Resource("cup");
let plug = new Resource("plug");

// function makeSomething(something, prepTime, resources)
// {
//     let promise = new Promise((resolve) =>
//     {
//         for (let r of resources)
//         {
//             console.log(`Using ${r.name} to make ${something}`);
//         }
//         setTimeout(() =>
//         {
//             console.log(`${something} is ready`);
//             resolve();
//         }, prepTime);
//     })
//     return promise;
// }

//The problem here is the 3 functions are running simultaneously
async function prepareBreakfast()
{
    console.log("Making breakfast");
    let promise = Promise.all([
        makeSomething("Toast", 4000, [plug, plate, toaster]),
        makeSomething("Coffee", 2000, [kettle, plug, cup]),
        makeSomething("Oatmeal", 6000, [plate, kettle])
    ]);
    await promise;
    console.log("Breakfast is read");
}

// prepareBreakfast();

//We have to use the built-in acquire() and release() functions
function makeSomething(something, prepTime, resources)
{
    let promise = new Promise(async (resolve, reject) =>
    {
        let acquired = [];
        try
        {
            for (let r of resources)
            {
                let token = await r.acquire();
                acquired.push([r, token]);
                console.log(`Using ${r.name} to make ${something}`);
            }
            setTimeout(() =>
            {
                console.log(`${something} is ready`);
                while (acquired.length > 0)
                {
                    let [r, token] = acquired.pop();
                    console.log(`Releasing ${r.name}`);
                    r.release(token);
                }
                resolve();
            }, prepTime);
        } catch (err)
        {
            while (acquired.length > 0)
            {
                let [r, token] = acquired.pop();
                console.log(`Releasing ${r.name}`);
                r.release(token);
            }
            reject(err);
        }
    })
    return promise;
}

prepareBreakfast(); //If we run the program at this stage, we are getting the "Deadlock" state

//To avoid the Deadlock state, we have to add the waitToken. Check the "concurrencty" JavaScript file