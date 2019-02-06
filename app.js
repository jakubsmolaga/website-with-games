const express = require('express');
const hbs = require('hbs');

const PORT = process.env.PORT || 3000;
let app = express();
app.set('view engine', 'hbs');
app.set('view options', {layout: 'layout.hbs'})
app.use(express.static('static'));

var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    let block=blocks[name];
    if (!block)block=blocks[name]=[];
    block.push(context.fn(this));
});
hbs.registerHelper('block', function(name) {
    let val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
});

app.get('/',        (req, res) => res.render('index.hbs',   {title: 'HOME PAGE'   }));
app.get('/about',   (req, res) => res.render('about.hbs',   {title: 'ABOUT PAGE'  }));
app.get('/games',   (req, res) => res.render('games.hbs',   {title: 'GAMES PAGE'  }));
app.get('/contact', (req, res) => res.render('contact.hbs', {title: 'CONTACT PAGE'}));

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));
