const express = require('express')
const router = express.Router()

router.use(express.json());

const users = [{
    id: 1,
    user: 'Vincenzo Schiavone',
    age: 29
},
{
    id: 2,
    user: 'Bea Schiavone',
    age: 26
}];

router.get('/', (req,res) => {
    res.send('Hello from the Router folder!')
})

router.get('/home', (req,res) => {
    res.render('home', null)
}) 

router.get('/users', (req,res) => {
    
    res.json(users)
})

router.get('/users/:id', (req,res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) res.status(404).send("The User with this given ID was not found.");
    res.send(user)
})


router.post('/users', (req,res) => {
    const user ={
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    users.push(user);
    res.send(user);
})

module.exports = router;