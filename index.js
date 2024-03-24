const client = require('./client.js');
const express = require('express');
const app = express();

async function init(){
    const result = await client.set('name', 'nodejs');
    return 1;
    // await client.expire('name', 5);
    // const value = await client.get('name');
    // console.log(value);
    // const allValues = await client.mget('msg:1','msg:2');
    // console.log(allValues);
    // await client.set('value','1');
    // await client.incr('value');
    // const value = await client.get('value');
    // console.log(value);
    // await client.set('testing','Welcome bhai in Redis');
    // console.log(await client.getrange('testing',0,21));

}
init();