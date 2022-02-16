

export const trending = (req,res) =>  {
    const videos = [
        {
            title:"hello",
        },
        {
            title: "Video #2",
        },
        {
            title: "video #3",
        },
    ]; 
    return res.render("home", {pageTitle: "Home", videos });
}
export const search = (req, res) => res.send("Search~!");

export const see = (req, res) => res.render("watch",{pageTitle:"Watch Video"});
export const edit = (req, res) => res.render("edit",{pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => {
    return res.send("delete video!")
} 
export const upload = (req, res) => res.send("upload video!")