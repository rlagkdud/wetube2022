import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
//sandwitch - express앱이 만들어지고 난 후에 작성해야하는 코드임.

const handleHome = (req, res) => {
    return res.send("<h1>I still love you<h1>")
};
const handleLogin = (req, res) => {
    return res.send({ message: "Login here" });
};

const handleProtected = (req, res) => {
    return res.send("Welcome to the private lounge");
};

app.use(logger);

app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/protected", handleProtected);


const handleListening = () => console.log(`✅ Server listening on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);