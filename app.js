const express = require("express")
const cors = require("cors")
const {
    authRoutes
} = require("./routes/auth");
const {
    UsersRoutes
} = require("./routes/users");
const passport = require("./passport");
const app = express();

const PORT = 3200;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(cors());
app.get('/', async (request, response) => {
    //response.send("test");
    response.status(400).json({
        "type": "not found"
    })
});

app.get('/details/:userId', async (request, response) => {
    console.log(request.params);
});

app.get('/details', async (request, response) => {
    console.log(request.query);
});

app.use(passport.initialize());
authRoutes(app, passport);
UsersRoutes(app, passport);
app.listen(PORT, () => console.log(`App available on port ${PORT}`))