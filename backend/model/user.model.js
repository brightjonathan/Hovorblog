import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid emaial",
        ], //for validating an email...
    },
    password: {
        type: String,
        require: true,
        minLength:[6, "password must be up to 6 characters"]
    },
    photo:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    phone: {
        type: String,
        default: "+234 (0) 9123 456 789",
      },
      bio: {
        type: String,
        maxLength: [500, "Bio must not be more than 500 characters"],
        default: "Hovor blog can cover a wide range of topics, including personal experiences, hobbies, interests, professional insights, news, and more.",
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
}, {
    timestamps: true
})

//Encrypting the password before saving it to the database
userSchema.pre('save', async function(next) { 

    //if the password is not modified go to next piece of code
    if(!this.isModified("password")) return next();

    //bcrypting or hiding the password 
    const hashedpassword = bcryptjs.hashSync(this.password, 10);
    this.password = hashedpassword;
    next();
});

const User = mongoose.model('User', userSchema);
export default User;