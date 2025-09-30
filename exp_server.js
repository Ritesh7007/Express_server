const express = require("express");
const path = require('path');
const app = express();

app.use((req, res, next) =>
{
    console.log(`${req.method} ${req.url}`);
    next();
});


app.use((req, res, next) =>
{
    const now = new Date().toLocaleString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
});


//routes
app.get("/", (req, res) => {
    res.send("Hello from Express.js!");
});

app.get("/about", (req, res) => {
    res.send("This is an Expree.js application built using routes and middleware.");
});

app.get("/contact", (req, res) => {
  res.send("Contact us at: contact@example.com");
});


app.get("/api/users", (req, res) => 
{
   let users = 
   [
    {id: 1, name: "Rio"},
    {id: 2, name: "Ritu"},
    {id: 3, name: "Riti"}
   ];
   res.json(users);
});

app.get("/api/users", (req, res) =>
{
    res.json(users);
});

app.post("/api/users", (req, res) =>
{
    const {name} = req.body;
    if(!name)
        {
            return res.status(400).json({error: "Name is required"});
        } 

        const newUser =
        {
            id: users.length + 1,
            name
        };
        users.push(newUser);
        res.status(201).json(newUser);
});

app.get("/weather/:city", (req, res) =>
{
    const city = req.params.city;
    const temp = Math.floor(Math.random() * (40 -20 + 1)) + 20;
    const weatherData = {
        city: city,
        temp: `${temp} degree`
    };
    res.json(weatherData);
});

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());


app.use((req, res, next) => 
{
    const now = new Date().toLocaleDateString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

