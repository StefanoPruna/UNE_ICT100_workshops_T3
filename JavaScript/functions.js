let obj = 
{
  "hello": (name) =>
  {
    console.log("hello " + name)
  },
  "test": (name) =>
  {
    console.log(" test " + name)
  }
}
console.log(obj["hello"]("hello"))

//Or we can call the object inside as following
let obj = 
{
  "hello": (name) =>
  {
    console.log("hello " + name)
  },
  "test": (name) =>
  {
    console.log(" test " + name)
  }
}
console.log(obj.test("world"))