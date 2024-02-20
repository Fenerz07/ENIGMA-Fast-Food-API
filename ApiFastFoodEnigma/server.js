const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//lien supabase
const supabaseUrl = 'https://cbubkcfcccqvzcgijuhi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidWJrY2ZjY2NxdnpjZ2lqdWhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzM4Mjc1MCwiZXhwIjoyMDIyOTU4NzUwfQ.3-r5AUg5PjhL3fazwRmxLry5_HWlGohNM-sQJGUBP9g';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

//utilisation de morgan et bodyParser pour les logs et les requêtes
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//parselles pour l'affichage,l'ajout et la suppréssion des produits
app.get('/products', async (req, res) => {
    const { data, error } = await supabase.from('products').select();
    res.json(data);
});

app.post('/products', async (req, res) => {
    console.log(req.body);
    const { data, error } = await supabase.from('products').insert(req.body);
    res.send("Insertion réussie");
});

app.delete('/products/:id', async (req, res) => {
    const { data, error } = await supabase.from('products').delete().eq('id', req.params.id);
    res.send("Suppression réussie");
});

//parselles pour l'affichage,l'ajout et la suppréssion des categories
app.get('/categories', async (req, res) => {
    const { data, error } = await supabase.from('categories').select();
    res.json(data);
});

app.post('/categories', async (req, res) => {
    console.log(req.body);
    const { data, error } = await supabase.from('categories').insert(req.body);
    res.send("Insertion réussie");
});

app.delete('/categories/:id', async (req, res) => {
    const { data, error } = await supabase.from('categories').delete().eq('id', req.params.id);
    res.send("Suppression réussie");
});

//Port pour affichage des données
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));