import res from "express/lib/response";
import User from "../models/User";

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
    const exists = await User.exists({userName});
    if(!exists){
        return res.status(400).render("login", {pageTitle:"Login", errorMessage:"An accout with this username does not exists."} );
    }
    //check if password correct
    res.end();
}

export const edit = (req, res) => res.send("User Edit!");
export const remove = (req, res) => res.send("Remove User!");
export const logout = (req, res) => res.send("logout!");
export const see = (req,res) => res.send("see");
