'use strict';
import express from 'express';
const Router = express.Router();
import {adminRoute} from '../router.js'

Router.use('/admin', adminRoute);

Router.get('/', (req, res) => {
    res.send('api works');
});

export { Router };