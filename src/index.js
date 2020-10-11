'use strict';
import express from 'express';
const Router = express.Router();

//import routes from 
import {AdminRoute} from './router.js'

Router.use("/admin", AdminRoute);
Router.get("/", (req, res) => {
    res.send('API  routes work');
});




export { Router };