let videos = [
    {
        title:"first video",
        rating:5,
        comments:2,
        createdAt:"2 minutes ago",
        views:1,
        id:1,
    },
    {
        title:"second video",
        rating:3,
        comments:55,
        createdAt:"1 minutes ago",
        views:70,
        id:2,
    },
    {
        title:"third video",
        rating:4,
        comments:22,
        createdAt:"20 minutes ago",
        views:90,
        id:3,
    },
]; 

export const trending = (req,res) =>  {
    return res.render("home", {pageTitle: "Home", videos });
}
export const search = (req, res) => res.send("Search~!");

export const watch = (req, res) => {
    const { id } = req.params;
    console.log("show video", id);
    const video = videos[id-1];
    return res.render("watch",{pageTitle:`Watching: ${video.title}` , video});
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("edit",{pageTitle: `Editing: ${video.title}`, video});
}
export const postEdit = (req, res) => {
    
}