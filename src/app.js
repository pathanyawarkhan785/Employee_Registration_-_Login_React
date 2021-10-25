const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname, "../public");
const tempPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));


let conn = require("./db/conn.js");
const Register = require("./models/registers.js");

app.set('view engine', 'hbs');
app.set('views', tempPath);

app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/index", (req, res) => {
    res.render("index");
});


app.get("/register", (req, res) => {
    res.render("register");
});


app.post("/register",   async(req, res) => {
    try {
        const registerEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            age: req.body.age
        });
        console.log(registerEmployee);
        const registerData = await registerEmployee.save() ;
        console.log(registerData);
        res.status(201).render("index.hbs") ;
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
    console.log(req.body);
}) ;

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});