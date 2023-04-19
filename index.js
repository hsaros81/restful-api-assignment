const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//My "database"
let students = [
    { id: 1, name: 'Jukka Virtanen', age: 24, email: 'jukka.virtanen@student.hamk.fi', attending: true},
    { id: 2, name: 'Liisa Järvinen', age: 26, email: 'liisa.jarvinen@student.hamk.fi', attending: true},
    { id: 3, name: 'Maija Lampi', age: 26, email: 'maija.lampi@student.hamk.fi', attending: false},
    { id: 4, name: 'Ville Joki', age: 30, email: 'ville.joki@student.hamk.fi', attending: true},
    { id: 5, name: 'Mauri Ketonen', age: 44, email: 'mauri.ketonen@student.hamk.fi', attending: true},
    { id: 6, name: 'Sanna Marin', age: 37, email: 'sanna.marin@student.hamk.fi', attending: false},
    { id: 7, name: 'Paula Pantti', age: 37, email: 'paula.pantti@student.hamk.fi', attending: true},
    { id: 8, name: 'Väinö Velimies', age: 28, email: 'vaino.velimies@student.hamk.fi', attending: false},
    { id: 9, name: 'Miina Pelto', age: 29, email: 'miina.pelto@student.hamk.fi', attending: true},
];

app.get('/students', (req, res) => {
    res.render('students',
    {
        pagetitle: "Students of the class",
        maintext: "The list of all the students of the class!",
        students: students
    });
})


// List all the students
app.get('/api/students', (req,res) => {
    res.json(students);
});

//List one student
app.get('/api/students/:id', (req, res) => {
    const id = req.params.id;
    const student = students.find(student => student.id == id); 
    if (student)
    {
        res.json(student);
    }
    else
    {
        res.status(404).json(
            {
                msg: 'Student not found'    
            }
        )
    }   
});

//Create new student
app.post('/api/students/' , (req, res) => {
    if (!req.body.name || !req.body.age || !req.body.email || !req.body.attending)
    {
        res.status(400).json(
            { msg: 'Proper values not set'}
        )
    }
    else
    {
        const newId = students[students.length -1].id + 1; //Get the id where to save the new student

        const newStudent = {
            id : newId,
            name : req.body.name,
            age : req.body.age,
            email : req.body.email,
            attending : req.body.attending
        }
    
        students.push(newStudent);
        res.status(201).json(newStudent);
    }
});

//Update the student
app.patch('/api/students/:id', (req,res) => {
    const idToUpdate = Number(req.params.id);
    const newName = req.body.name;
    const newAge = req.body.age;
    const newEmail = req.body.email;
    const newAttending = req.body.attending;

    students.forEach(student => {
    if (student.id === idToUpdate)
    {
        student.name = newName;
        student.age = newAge;
        student.email = newEmail;
        student.attending = newAttending;
        res.status(200).json(student);
    }
    });
});

//Delete a student
app.delete('/api/students/:id' , (req,res) => { 
    const id = Number(req.params.id);
    students = students.filter(student => student.id != id);
    res.status(204).json(students);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));