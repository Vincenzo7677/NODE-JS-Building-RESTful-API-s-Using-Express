const express = require('express')
const Joi = require('@hapi/joi')

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

router.get('/', (req, res) => {
    res.send('Hello from the Router folder!')
})

router.get('/home', (req, res) => {
    res.render('home', null)
})

router.get('/users', (req, res) => {
    res.json(users)
})

router.get('/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) res.status(404).send("The User with this given ID was not found.");
    res.send(user)
})

router.post('/users', (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const user = {
        id: users.length + 1,
        user: req.body.user,
        age: req.body.age
    };
    users.push(user);
    res.send(user);
});

router.put('/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) res.status(404).send("The User with this given ID was not found.");

    user.user = req.body.user;
    user.age = req.body.age;

    res.send(user)
});

function validateUser(user) {
    const schema = Joi.object({
        user: Joi.string().required(),
        age: Joi.number().integer().required()
    });
    return schema.validate(user,{});
}

module.exports = router;