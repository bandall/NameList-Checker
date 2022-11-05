export const home = (req, res) => {
    res.sendFile(process.env.ASSET_PATH + "/index.html");
}