const Joi=require("joi");

module.exports.listingSchema=Joi.object({
    listing:Joi.object({
           title: Joi.string().min(5).max(100).required(),
           price: Joi.number().min(0).required(),
           location: Joi.string().min(3).required(),
           description: Joi.string().required(),
           image:Joi.optional().allow("",null),
           country:Joi.string().required()
    }).required().options({stripUnknown:true})
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating: Joi.number().min(1).max(5),
        name: Joi.string().required(),
        comment: Joi.string().required()
    }).required().options({stripUnknown:true})
})