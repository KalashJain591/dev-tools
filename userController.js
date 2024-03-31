const User =  require('./user-model');
const router = require('express').Router();

router.get('/all-users',(req,res)=>{
    User.findAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
    });
});


router.post('/create',(req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const phone = req.body.phone;

    User.create({
      firstName: firstName,
      lastName: lastName,
      age: age,
      phone: phone
    })
      .then(result => {
        console.log('Created User');
        res.status(201).json({
          message: 'User created successfully!',
          user: result
        });
      })
      .catch(err => {
        console.log(err);
      }); 
});

router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    User.findByPk(id)
    .then(user => {
        return user.destroy();
    })
    .then(result => {
        console.log('User deleted');
        res.status(200).json({
            message: 'User deleted successfully!'
        });
    })
    .catch(err => {
        console.log(err);
    });
});

router.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const firstName = req.body?.firstName;
    const lastName = req.body?.lastName;
    const age = req.body?.age;
    const phone = req.body?.phone;

    User.findByPk(id)
    .then(user => {
        user.firstName = firstName ? firstName : user.firstName;
        user.lastName = lastName ? lastName : user.lastName;
        user.age = age ? age : user.age;
        user.phone = phone ? phone : user.phone;
        return user.save();
    })
    .then(result => {
        console.log('User updated');
        res.status(200).json({
            message: 'User updated successfully!',
            user: result
        });
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;