'use strict'
import express from 'express';
const Router = express.Router();

/* 
Controller Imports 
*/
import {userRegistration, loginRegistration, logOut,allUsers} from './controllers/userController.js'
import {fetchSingleEstate,updateSingleEstate, deleteSingleEstate, addEstateAgency, fetchAllAgencies} from './controllers/estateController.js';
import {addListing, updateListing, fetchAllListings, deleteSingleListing, fetchSingleListing} from './controllers/listingsController.js';
import {fetchHomes, addHome,updateHomes,deleteHomes,fetchSingleHome} from './controllers/homeController.js';

/* 
User Authentication.
 */
Router.post("/user/register",userRegistration );
Router.post("/user/login",loginRegistration );
Router.get("/user/logout",logOut );
Router.get("/user/all",allUsers );

/* 
Real Estate Agencies.
 */
Router.get("/agency/:id",fetchSingleEstate);
Router.get("/agency/:id",updateSingleEstate);
Router.delete("/agency/:id",deleteSingleEstate);
Router.post("/agency/new", addEstateAgency);
Router.get("/agency/all", fetchAllAgencies);


/* 
Listings Category.
*/
Router.post("/listing/new", addListing);
Router.get("/listing/:id",fetchSingleListing);
Router.get("/listing", fetchAllListings);
Router.get("/listing/:id",updateListing);
Router.delete("/listing/:id", deleteSingleListing);
/* 
Homes.
 */
Router.get("/home/all", fetchHomes);
Router.post("/home/new", addHome);
Router.put("/home/:id", updateHomes);
Router.delete("/home/:id", deleteHomes);
Router.get("/home/:id", fetchSingleHome);

//default 200 OK
Router.get("health", (req, res) => {
    res.send("OK");
});

export {Router as adminRoutes};