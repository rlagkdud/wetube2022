import User from "../models/User";

export const getJoin = (req, res) => res.render("join",{pageTitle: "Join" });
export const postJoin = async (req, res) => {
    const {name, email, userName, password, location} = req.body;
    const pageTitle = "Join"
    const usernameExits = await User.exists({userName});
    if(usernameExits){
        return res.render("join", {pageTitle, errorMessage:"This username is already taken." });
    }
    const emailExists = await User.exists({email});
    if(emailExists){
        res.render("join", {pageTitle, errorMessage:"This email is already taken."})
    }
    await User.create({
        name, 
        userName,
        email,
        password, 
        location,
    });
    return res.redirect("/login")
};
export const login = (req, res) => res.send("Log in!");

export const edit = (req, res) => res.send("User Edit!");
export const remove = (req, res) => res.send("Remove User!");
export const logout = (req, res) => res.send("logout!");
export const see = (req,res) => res.send("see");
