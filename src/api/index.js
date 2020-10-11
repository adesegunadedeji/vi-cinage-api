'use strict';
import express from 'express';
//import routes from 
import {adminRoutes} from '../router.js'
const Router = express.Router();
Router.use("/v1.0", adminRoutes);
export { Router };