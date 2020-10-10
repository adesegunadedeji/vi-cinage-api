'use strict'
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ListingsSchema = new Schema ({
    listings_type: { type: String, required: true},

}, { timestamps: true } );

 const Listing = mongoose.model('Listing', ListingsSchema);

export default Listing;