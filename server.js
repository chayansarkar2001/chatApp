import express from "express"
import path from "path"
import { fileURLToPath } from "url";

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename, __dirname, path.join(__dirname, "./dist/index.html"))background-DaNNCzGf.jpg

app.use("/assets", express.static(path.join(__dirname, "./dist/assets")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist/index.html"))
})
app.get("*", (req, res) => {
    res.redirect("/")
})

const PORT = 8080
const HOST = "192.168.31.124"

app.listen(PORT, HOST, () => {
    console.log(`server is running on ${HOST}:${PORT}`)
})
