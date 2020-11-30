async function sleep(ms)
{
    let promiseSleep = new Promise((resolve) => 
                                   {
                                    setTimeout(resolve, ms);
    });
    await promiseSleep;
}

sleep(3000); console.log("ciao")

await sleep(3000); console.log("ciao") //If I don't put the await command in front of the function when I call it, it won't execute it, but console.log only

async function process1()
{
    await sleep(5000);
    console.log("Ecco il processo 1");
}

async function process2()
{
    await sleep(2000);
    console.log("Ecco invece il processo 2");
}

process1(); process2(); //Again the same happens here where the function process2 will be executed before the process1 because the sleep time is shorter

/*</pending> Ecco invece il processo 2
 Ecco il processo 1
 process1(); await process2();
 Ecco il processo 1
 Ecco invece il processo 2
*/

await process1(); await process2(); //But adding the await command in front of the functions, it will execute the process1 first regardless of the sleep milliseconds assigned