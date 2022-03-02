const express = require("express");
const fs = require("fs");
const path = require("path"); 

const PORT = process.env.PORT || 3001; 

const app = express(); 

app.use(express.urlencoded ( { extended: true }));
app.use(express.json());
app.use(express.static('public')); 

// request data
const {notes} = require("./Develop/db/db.json"); 

function createNewNote (body, notesArray) {
    const note = body; 
    notesArray.push(note); 

    // path to write file 
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes : notesArray }, null, 2)
    );
    // return finished code to post route for response
    return note; 
};

// get route 
app.get("/api/notes", (req, res) => {
    res.json(notes); 
    console.log(notes);
});

// post route
app.post('/api/notes', (req, res) => {
    const note = createNewNote(req.body, notes); 
    res.json(notes);
});

// route to index.html 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
}); 

// rouet to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// listening on
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🏎️`);
});
