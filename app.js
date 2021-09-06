const express = require("express")
const cors = require("cors")

const app = express();

const PORT = 3400;

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

app.post('/login', async (request, response) => {
    console.log(request.body)
    // response.send(request.body)
    let bodyRes = request.body;
    bodyRes.password == "testpass" && bodyRes.username == "test" ? response.send(request.body) : response.status(401).send("Wrong username & password")
});

app.listen(PORT, () => console.log(`App available on port ${PORT}`))