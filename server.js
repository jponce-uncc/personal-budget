// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const mongoose = require('mongoose')
const budgetModel = require("./models/budget_schema")
const bodyParser = require("body-parser");

let url = 'mongodb://localhost:27017/';

app.use(cors());

/* nconst budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
        {
            title: 'Phone Bill',
            budget: 40
        },
        {
            title: 'Car',
            budget: 215
        },
        {
            title: 'Dog Food',
            budget: 60
        },
        {
            title: 'Insurance',
            budget: 100
        },
    ]
}; */


app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        budgetModel.find({})
        .then((data)=>{
            res.json(data);
            mongoose.connection.close();
        })
        .catch((connectionError)=>{
            console.log(connectionError);
        })
    })
    .catch((connectionError)=>{
        console.log(connectionError);
    })
});

app.post('/budget/add', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connected to the database");
        let postData = new budgetModel({
            title: req.body.title,
            value: req.body.value,
            color: req.body.color
        });
        budgetModel.insertMany(postData)
            .then((data)=>{
                res.json(data);
                mongoose.connection.close();
            })
            .catch((connectionError)=>{
                res.json(connectionError);
                console.log(connectionError);
            })
    })
    .catch((connectionError)=>{
        console.log(connectionError);
    })

});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});