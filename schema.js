const Joi=require('joi');
const review = require('./models/review');
const category=[ 'trending',
            'rooms',
            'mountains',
            'iconic-cities',
            'child-care',
            'family',
            'farm',
            'arctic',
            'boats',
            'hiking',
            'adventure',
            'pub']
module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        country:Joi.string().required(),
        location:Joi.string().required(),
        image:Joi.string().allow('',null),
        category:Joi.string().valid(...category).insensitive()
    }).required()
});

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().required()
    }).required(),
});