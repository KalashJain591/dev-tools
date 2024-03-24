// const { default: axios } = require('axios');
const { default: axios } = require('axios');
const client = require('./client.js');
const express = require('express');
const app = express();
app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
app.get('/',async (req,res)=>{
    const cacheData = await client.get('data');
    if(cacheData){
        console.log('Data is coming from cache');
        return res.send(JSON.parse(cacheData));
    }

    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    console.log(response.data);
    app.get('/', async (req, res) => {
        const cacheData = await client.get('data');
        if (cacheData) {
            console.log('Data is coming from cache');
            return res.send(JSON.parse(cacheData));
        }

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(response.data);
        client.set('data', JSON.stringify(response.data), 'EX', 5);
        return res.send(response.data);
    });
    return res.send((response.data));
})