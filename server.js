const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();
const upload = multer();

app.engine('.hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.get('/about', (req, res) => {
    res.render('about');
  });
  
  app.get('/contact', (req, res) => {
    res.render('contact');
  });
  
  app.get('/info', (req, res) => {
    res.render('info', { layout: 'dark' });
  });
  
  app.get('/history', (req, res) => {
    res.render('history');
  });
  
  app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name });
  });

  app.post('/contact/send-message', upload.single('design'), (req, res) => {
    
    const { author, sender, title, message } = req.body;
    const fileName = req.file ? req.file.originalname : null;

    if(author && sender && title && message) {
      res.render('contact', { isSent: true, fileName });
    }
    else {
      res.render('contact', { isError: true });
    }
  });

  app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});