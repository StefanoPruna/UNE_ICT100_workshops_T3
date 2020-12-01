let stopList = ["a", ]

let app = document.getElementById("app")

//app.innerHTML = "test"

let paragraphs = peterRabbit.split(/\n\W*\n/)

function wordToObj(w)
{
  let obj = {}
  obj[w] = 1
  return obj
}

function wordVector(para)
{
  let words = para.split(/\W/)
  .filter((s) => s.length > 1)
  .map((s) => s.toLocaleLowerCase())
  .filter((s) => stopList.indexOf(s) < 0)
  .map((s) => wordToObj(s))
  .reduce((a, b) => combine(a, b), {})

  return words
}

function intersection(a, b)
{
  let result = {}
  for (let key in a)
   {
     if (b[key] !==undefined)
     {
      if (b[key] < a[key])
       result[key] = b[key]
      else 
       result[key] = a[key]
     }
   }

  return result
}

function combine(a, b)
{
  let result = { ...a }
  for (let k in a)
   {
     result[k] = a[k]
   }
  for (let k in b)
   {
     if (result[k] === undefined)
      result[k] = b[k]
    
     else
      result[k] = result[k] + b[k]
   } 
     
   return result
}

function size(obj)
{
  let sum = 0
  for (let key in obj)
   {
     sum = sum + obj[key]
   }
  return sum
}

function commonality(a, b)
{
  let numerator = size(intersection(a, b))
  let demoninator = size(combine(a, b))

  if (numerator === 0)
   return 0
  else 
   return 2 * numerator / demoninator
}

let vectors = paragraphs.map((para) => wordVector(para))

function totalRelevance(left)
{
  return vectors
  .map((right) => commonality(left, right))
  .reduce((a, b) => a + b, 0)
}

let byRelevance = vectors.slice().sort((a, b) => totalRelevance(b) - totalRelevance(a))

/*let debug = document.createElement("p")
//let example = combine({now: 1, mrs: 1}, {mrs: 2, mcgregor: 5})
let example = wordVector(paragraphs[3])

//debug.innerText = JSON.stringify(example) + "####"
app.append(debug)

let vectors = paragraphs.map((para) => wordVector(para))
*/

let compare = byRelevance[2]
for (let i in paragraphs)
{
  let para = paragraphs[i] 
  let vector = vectors[i]
  let p = document.createElement("p")
  let c = commonality(vector, compare)
  let colour = `rgba(0, 255, 0, ${c})`
  p.style.backgroundColor = colour

  let inCommon = intersection(vector, compare)

  p.innerText = para + JSON.stringify(inCommon) + c
  app.append(p)
}

//app.innerHTML = `
//${JSON.stringify(paragraphs)}`
