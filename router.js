import express from 'express';
const router = express.Router();

import {userRegistration, loginRegistration, logOut} from './src/controllers/userController.js'
import {fetchSingleEstate,updateSingleEstate, deleteSingleEstate, addEstateAgency, fetchAllAgencies} from './src/controllers/estateController.js';
import {addListing, updateListing, fetchAllListings, deleteSingleListing, fetchSingleListing} from './src/controllers/listingsController.js';
import {fetchHomes, addHome,updateHomes,deleteHomes,fetchSingleHome} from './src/controllers/homeController.js';

/* 
User Authentication.
 */
router.post('/users/register',userRegistration );
router.post('/users/login',loginRegistration );
router.get('/users/logout',logOut );


/* 
Real Estate Agencies.
 */
router.get('/estates/:id',fetchSingleEstate);
router.get('/estates/:id',updateSingleEstate);
router.delete('/estates/:id',deleteSingleEstate);
router.post('/estates/new', addEstateAgency);
router.get('/estates', fetchAllAgencies);


/* 
Listings Category.
 */
router.post('/listings/new', addListing);
router.get('/listings/:id',fetchSingleListing);
router.get('/listings', fetchAllListings);
router.get('/listings/:id',updateListing);
router.delete('/listings/:id', deleteSingleListing);

/* 
Homes.
 */
router.get('/homes', fetchHomes);
router.post('/homes/new', addHome);
router.put('/homes/:id', updateHomes);
router.delete('/homes/:id', deleteHomes);
router.get('/homes/:id', fetchSingleHome);
//default 200 OK
router.get("health", (req, res) => {
    res.send("OK");
});

export {router as adminRoute};