import express from "express";

const PORT = 4000;

const app = express();
//sandwitch - express앱이 만들어지고 난 후에 작성해야하는 코드임.
const handleHome = (req, res) => {
    return res.send("I still love you")
};
const handleLogin = (req, res) => {
    return res.send("Login here");
}

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`✅ Server listening on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);