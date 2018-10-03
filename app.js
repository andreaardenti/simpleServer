var exp = require('express');
var bodyParser = require('body-parser');
var app = exp();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var counter = 0;  //inizializzo un contatore usato nei verbi GET e DELETE
var tokens  = ["abc", "def", "ghi"];
var posts = [     //creo il json
    {
        title: "Titolo del post",
        description: "La description del mio post",
        id: "1"
    },
    {
        title: "Titolo del secondo post",
        description: "La description del mio secondo post",
        id: "2"
    },
    {
        title: "Titolo del terzo post",
        description: "La description del mio terzo post",
        id: "3"
    }
]

app.get('/', function(req, res) {
    counter++;
    res.json({message:'HelloWorld'});
})

//creo la funzione GET nel server
app.get('/posts', function(req, res) {
    console.log(req.query.appId);
    res.json(posts);
})

//creo la funzione POST nel server
app.post('/posts', function(req, res){
    var newPost = req.body;
    posts.push(newPost);
    res.status(201).json();
})

//creo la funzione PUT nel server
app.put('/posts/:index', function(req, res) {
    var i = parseInt(req.params.index);
    //posts[i] = editPost;
    posts[i].title = req.body.title;
    posts[i].description = req.body.description;
    res.json();
})

console.log(posts.length);

//errore 400 = errore di richiesta da parte del client
//errore 404 = risorsa non trovata

app.get('/posts/:id', function(req, res) {
    var i = parseInt(req.params.id);

    //gestiamo l'inserimento non numerico del client per l'interrogazione del json
    if (isNaN(i)) {
        return res.status(400).json();
    };

    //gestiamo la dimensione dell'array e restituiamo errore se facciamo il get di un valore maggiore della lunghezza dell'array stesso
    // if(req.query.posts.length < posts.length){
    //     res.status(404).json();
    // }else res.json(posts[i]);
})

app.delete('/posts/:index', function(req, res) {
    var i = parseInt(req.params.index);
    posts.splice(i, 1);
    res.json();
})


app.get('/pippo', function(req, res) {
    counter++;
    var x = {message:'Ciao !!', counter: counter};
    res.json(x);
})

app.delete('/pippo', function(req, res) {
    counter--;
    var x = {message:'Sono nel delete !!', counter: counter};
    res.json(x);
})

//verifica se un token è presente nell'array tokens
app.get("/caio", function (req, res) {
    if (tokens.indexOf(req.query.id) > -1) {
        res.status(200).json("Sei autenticato");
    }else res.status(401).json("mbare cchi bboi?");
})

//verifichiamo che l'id sia un numero e che sia un multiplo di 9, altrimenti restituisce errore
app.get('/tizio', function(req, res) {
    var i = parseInt(req.query.token);
    var j = parseInt(req.query.module);
    if (isNaN(i) || isNaN(j)) {
        return res.status(400).json({message: "Hai inserito un carattere"});
    } else if (i%j == 0){
        res.status(200).json({message: "ok modulo esatto, trasi"});
    } else res.status(401).json({message: "spiacente!"});
})

//inserisco un nuovo token nell'array tokens
app.post('/sempronio', function(req, res){
    var newPost = req.body.token;
    tokens.push(newPost);
    res.status(201).json({message: "token creato"});
})

//funzione get di sempronio - restituisce il contenuto dell'array tokens
app.get('/sempronio', function(req, res) {
    console.log(req.query);
    res.json(tokens);
})

//verifica se un token è presente nell'array tokens
app.get("/sempronio2", function (req, res) {
    if (tokens.indexOf(req.query.id) > -1) {
        res.status(200).json("Sei autenticato");
    }else res.status(401).json("mbare cchi bboi?");
})

//setto la porta di ascolto del server
app.listen(3001);
