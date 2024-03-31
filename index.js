const express = require('express');
const app = express();
const port = process.env.PORT || 3001; 
const userController = require('./userController');
const sequelize = require('./db');

app.use(express.json());
app.use('/user',userController);
app.get('/', (req, res) => {
    res.send('Hello World');
})    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

sequelize
  .sync({alter:true})
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));