export const trending = (req,res) =>  res.render("home");
export const search = (req, res) => res.send("Search~!");

export const see = (req, res) => res.render("watch");
export const edit = (req, res) => {
    return res.send("Video Edit~!");
}
export const deleteVideo = (req, res) => {
    return res.send("delete video!")
} 
export const upload = (req, res) => res.send("upload video!")
