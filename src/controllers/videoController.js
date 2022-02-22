import Video from "../models/Video";
 
export const home = (req,res) =>  {
    console.log("start");
    Video.find({},(error, videos) => {
        console.log("serching");
        return res.render("home", {pageTitle: "Home" , videos });
    });
    console.log("I should be the last one") 
}
export const search = (req, res) => res.send("Search~!");

export const watch = (req, res) => {
    const { id } = req.params;;
    return res.render("watch",{pageTitle:`Watching`});
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit",{pageTitle: `Editing`});
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const {title} = req.body;
    return res.redirect(`/videos/${id}`);
}
export const getUpload = (req,res) => {
    return res.render("upload",{pageTitle: "Upload Video"  });
}
export const postUpload = (req,res) => {
    // here I will add a video to the video array.
    const { title } = req.body;
    return res.redirect("/");
}