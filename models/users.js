const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')


// skething the schema 

const userSchema = new mongoose.Schema({
    // unique id will be generated by default in MongoDb
    // setting all the feilds to required

    username:{
        type:String,
        required:true
    },
    firstName:{
         type:String,
          
    },
    otherNames:{
        type:String,
         
    },
    provider:{
        type:String,
         
    },
    msisdn:{
        type:String,
        required:true
    },
    password:{
        type:String,
         
    },
    countryCode:{
        type:String,
        default:"GH"
    },
    isoCode:{
        type:String,
        default:"233"
    },
    email:{
      type:String,
      
    },
    gender:{
        type:String
    }
    
})

// generating and accessing authoriztion token
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, name: this.username },
		process.env.JWTPRIVATEKEY, // defined in .env file
		{ expiresIn: "7d" }
	);
	return token;
    }

    // Joi pluggin validation
    const validate = function(user){
        const schema = Joi.object({
            username:Joi.string().min(3).required(),
            firstName:Joi.string(),
            otherNames:Joi.string(),
            provider:Joi.string(),
            msisdn:Joi.string().min(9).max(14).required(),
            password:Joi.string().required(), // setting up strong password.
            countryCode:Joi.string().uppercase(),
            isoCode:Joi.string(),
            email:Joi.string().email(),
            gender:Joi.string()

        })
        return schema.validate(user)
    }

const User = mongoose.model('user',userSchema)

module.exports={User,validate}