import User from "../models/User";
import fetch from 'node-fetch';
import bcrypt from "bcrypt";
import { response } from "express";

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
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope:"read:user user:email",
    }
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    return res.redirect(finalURL);
}

export const finishGithubLogin = async (req,res) => {
    const baseURL = 'https://github.com/login/oauth/access_token';
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    const tokenRequest = await (
        await fetch(finalURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();
    if("access_token" in tokenRequest){
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com"
        const userData = await (await fetch(`${apiUrl}/user`,{
            headers:{
                Authorization: `token ${access_token}`,
            }
        })).json();
        const emailData =  await (await fetch(`${apiUrl}/user/emails`,{
            headers:{
                Authorization: `token ${access_token}`,
            }
        })).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if(!emailObj){
            return res.redirect("/login");
        }
        const existingUser = await User.findOne({email: emailObj.email});
        if(existingUser){
            req.session.loggedIn = true;
            req.session.user = existingUser;
            return res.redirect("/");
        } else{
            //create an account
        }
    } else {
        return res.redirect("/login");
    }
}

export const edit = (req, res) => res.send("User Edit!");
export const remove = (req, res) => res.send("Remove User!");
export const logout = (req, res) => res.send("logout!");
export const see = (req,res) => res.send("see");
