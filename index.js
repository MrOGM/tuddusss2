// Imports 
    import express from "express";
    import bodyParser from "body-parser";
    import { dirname } from "path";
    import { fileURLToPath } from "url";
    import mongoose from "mongoose";




// declaracion de variables
    const app = express();
    const port = 3000;
    const __dirname = dirname(fileURLToPath(import.meta.url));
    



// Conexion a mongodb
    mongoose.connect('mongodb+srv://Admin-OG:pw123@cluster0.vy0qj8g.mongodb.net/fruitDB');





// Creacion de esquema, modelo y primer item   
    const itemsSchema = mongoose.Schema({
        name: String,
    });

    const Item = mongoose.model('Item', itemsSchema);




// Instalacion express y bodyparser    
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('views'));




// Iniciar servidor en port 3000
    app.listen(port, () => {
        console.log(`Port working on ${port}`);
    });



// array con toda la info
    var Arraytudus = [];




// Home
    app.get("/", async (req, res) => {
    
        try {
            // Use await to wait for the query to complete
            const items = await Item.find({});
            res.render("index.ejs", { Arraytudus: items });

        }catch (err) {
            console.error('Error:', err.message);
        }
    });




// submit 
    app.post("/submit", async (req, res) => {
        // obtaining data for the task in the todo list and insert it on the array
        const recentTudu = req.body.tuduData;
        const newItem = new Item({
            name: recentTudu,
        });
        await newItem.save();

        // Reload the data from the database
        try {
            // Use await to wait for the query to complete
            const items = await Item.find({});
            res.render("index.ejs", { Arraytudus: items });
        } catch (err) {
            console.error('Error:', err.message);
        }
    });

// submit 
    app.post("/delete", async (req, res) => {
        // obtaining data for the task in the todo list and insert it on the array
        const recentDelete = req.body.checkbox;
        // Reload the data from the database
        try {
            console.log(recentDelete);
            const result = await Item.deleteOne({ name: recentDelete });
            res.redirect("/")

        } catch (err) {
            console.error('Error:', err.message);
        }
    });



