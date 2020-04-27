const Joi = require('joi')
const express = require('express')
const router = express.Router()
router.use(express.json())


const Users = [{
    id: 1,
    name: "Vincenzo",
    age: 29
},
{
    id: 2,
    name: "Bea",
    age: 20
}];


router.get('/', (req, res, next) => {
    res.send('Hello World from Router index.js')
})

router.get('/api/users/:id', (req, res, next) => {
    const user = Users.find(c => c.id == parseInt(req.params.id));
    if(!user) return res.status(404).send("The user with the given ID was not found.")
    res.send(user)
})


router.get('/api/users', (req, res, next) => {
    res.json(Users)

})


router.put('/api/users/:id', (req,res,next) => {
    const user = Users.find(c => c.id == parseInt(req.params.id));
    if(!user) return res.status(404).send("The user with the given ID was not found.")
     
    const schema = {
        name: Joi.string().min(3).required(),
        age: Joi.number().min(18).max(99).required()
    };
    //Create validation put in to result 
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(result.error.details[0].message);
        
    user.name = req.body.name;
    user.age = req.body.age;
    res.send(user)
});

router.delete('/api/users/:id', (req,res,next) => {
    const user = Users.find(c => c.id == parseInt(req.params.id));
    if(!user) return res.status(404).send("The user with the given ID was not found.")

    const index = Users.indexOf(user);
    Users.splice(index, 1);
    res.send(user)
}) 

router.post('/api/users/', (req, res, next) => {
    //Create Joi schema object
    const schema = {
        name: Joi.string().min(3).required(),
        age: Joi.number().min(18).max(99).required()
    };
    //Create validation put in to result 
    const result = Joi.validate(req.body, schema);
    //If there is an error send 400 status, with a details message
    if (result.error) return res.status(400).send(result.error.details[0].message);
    //Create new user check if
    const user = {
        id: Users.length + 1,
        name: req.body.name,
        age: req.body.age
    };

    Users.push(user)
    res.send(user)

})


module.exports = router