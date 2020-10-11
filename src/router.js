'use strict'
import express from 'express';
const Router = express.Router();

/* 
Controller Imports 
*/

import {userRegistration, loginRegistration, logOut} from './controllers/userController.js'
import {fetchSingleEstate,updateSingleEstate, deleteSingleEstate, addEstateAgency, fetchAllAgencies} from './controllers/estateController.js';
import {addListing, updateListing, fetchAllListings, deleteSingleListing, fetchSingleListing} from './controllers/listingsController.js';
import {fetchHomes, addHome,updateHomes,deleteHomes,fetchSingleHome} from './controllers/homeController.js';

/* 
User Authentication.
 */
Router.post("/users/register",userRegistration );
Router.post("/users/login",loginRegistration );
Router.get("/users/logout",logOut );
/* 
Real Estate Agencies.
 */
Router.get("/estates/:id",fetchSingleEstate);
Router.get("/estates/:id",updateSingleEstate);
Router.delete("/estates/:id",deleteSingleEstate);
Router.post("/estates/new", addEstateAgency);
Router.get("/estates", fetchAllAgencies);


/* 
Listings Category.
*/
Router.post("/listings/new", addListing);
Router.get("/listings/:id",fetchSingleListing);
Router.get("/listings", fetchAllListings);
Router.get("/listings/:id",updateListing);
Router.delete("/listings/:id", deleteSingleListing);
/* 
Homes.
 */
Router.get("/homes", fetchHomes);
Router.post("/homes/new", addHome);
Router.put("/homes/:id", updateHomes);
Router.delete("/homes/:id", deleteHomes);
Router.get("/homes/:id", fetchSingleHome);

//default 200 OK
Router.get("health", (req, res) => {
    res.send("OK");
});

export {Router as AdminRoute};