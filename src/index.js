'use strict';
import express from 'express';
const Router = express.Router();
import {AdminRoute} from '../router.js'

Router.use('/admin', AdminRoute);

Router.get('/', (req, res) => {
    res.send('api works');
});

export { Router };