import express from "express";

const PORT = 4000;

const app = express();
//sandwitch - express앱이 만들어지고 난 후에 작성해야하는 코드임.

const gossipMiddleware = (req, res, next) => {
    console.log(`someone is goint to : ${req.url}~!!`);
    next();
}
const handleHome = (req, res) => {
    return res.send("<h1>I still love you<h1>")
};
const handleLogin = (req, res) => {
    return res.send({ message: "Login here" });
}

app.get("/", gossipMiddleware, handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`✅ Server listening on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);