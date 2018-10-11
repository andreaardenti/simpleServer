var exp = require('express');
var bodyParser = require('body-parser');
var app = exp();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var users = [
    {
        name: "andrea",
        surname: "ardenti",
        id: "1"
    },
    {
        name: "andrea",
        surname: "rossi",
        id: "2"
    },
    {
        name: "carmelo",
        surname: "catania",
        id: "3"
    },
    {
        name: "carmelo",
        surname: "rossi",
        id: "4"
    },
    {
        name: "carlo",
        surname: "leonardi",
        id: "5"
    },
]

app.get('/users', function(req, res) {

    console.log("--------------------------------");
    console.log("req.params: ", req.params);
    console.log("req.query: ", req.query);
    console.log("req.body: ", req.body);

    if (req.query.name || req.query.surname){
        //creo un array vuoto dove inserire le ricorrenze trovate
        var filtered = [];
        for (var j = 0; j < users.length; j++) {
            if (users[j].name == req.query.name || users[j].surname == req.query.surname) {
                filtered.push(users[j]);
            }
        }
        res.status(200).json(filtered);
    }
    else
        res.json(users);
})

//creo la funzione GET nel server che mi restituisce l'oggetto con la posizione richiesta
app.get('/users/:index', function(req, res) {
    var i = parseInt(req.params.index);
    //se non è un numero... errore 400
    if (isNaN(i)) {
        res.status(400).json("Spiacente hai inserito una stringa invece dovevi inserire un intero...");

    // gestiamo la dimensione dell'array e restituiamo errore se facciamo il get di un valore maggiore della lunghezza dell'array stesso
    }else if (i >= users.length) {
        res.status(404).json("Spiacente ma la risorsa non è stata trovata!");
    }else {
        //altrimenti se è un numero mi stampa l'oggetto relativo alla posizione iesima
        res.json(users[i]);
    }
})

app.post('/users', function(req, res){
    var newPost = req.body;
    users.push(newPost);
    res.status(201).json();
})

app.put('/users/:index', function(req, res){
    var i = parseInt(req.params.index);
    users[i].name = req.body.name;
    users[i].surname = req.body.surname;
    users[i].id = req.body.id;
    res.json();
})

app.delete('/users/:index', function(req, res) {
    var i = parseInt(req.params.index);
    users.splice(i, 1);
    res.json();
})

//setto la porta di ascolto del server
app.listen(3002);
