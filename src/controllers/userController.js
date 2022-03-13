import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join",{pageTitle: "Join" });
export const postJoin = async (req, res) => {
    const {name, email, userName, password, password2, location} = req.body;
    const pageTitle = "Join"
    if(password !== password2){
        return res.status(400).render("join",{pageTitle, errorMessage:"Password confirmation does not match."})
    }
    const exists = await User.exists({$or: [{userName}, {email}] });
    if(exists){
        return res.status(400).render("join", {pageTitle, errorMessage:"This username/email is already taken." });
    }
    
    try{
        await User.create({
        name, 
        userName,
        email,
        password, 
        location,
        });
        return res.redirect("/login")
    } catch(error){
        return res.status(400).render("join",{pageTitle:"Upload Video", errorMessage: error._message, });
    }
};
export const getLogin = (req, res) => res.render("login", {pageTitle:"Login"});
export const postLogin = async(req, res) => {
    const {userName, password}  = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({userName})
    if(!user){
        return res.status(400).render("login", {pageTitle, errorMessage:"An accout with this username does not exists."} );
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {pageTitle, errorMessage:"Wrong password!"} );
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}

export const startGithubLogin = (req,res) => {
    const baseURL = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: "1d01261be08ba0ad4090",
        allow_signup: false,
        scope:"read:user user:email",
    }
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    return res.redirect(finalURL);
}

export const edit = (req, res) => res.send("User Edit!");
export const remove = (req, res) => res.send("Remove User!");
export const logout = (req, res) => res.send("logout!");
export const see = (req,res) => res.send("see");
