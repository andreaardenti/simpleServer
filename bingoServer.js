var exp = require('express');
var bingo = require('bingo-extract');
var app = exp();

bingo.extract();
bingo.extract();
bingo.extract();
bingo.extract();

app.get('/numbers', function(req, res) {
    var a = bingo.getExtracted();
    res.json(a);
})

app.get('/numbers/:index', function(req, res) {
    var a = parseInt(req.params.number);
    console.log(a);
    if (req.query.extracted && req.query.extracted === "false") {
        res.json({"message": 'Il numero è presente'})
    } else {
        res.json({"message": 'Il numero non è presente'})
    }
    res.json();
})

//setto la porta di ascolto del server
app.listen(3011);