import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePic:{
        type: String,
        default: "",
    },
    profilePicId:{
        type: String,
        default: "",
    },
    bio:{
        type: String,
        default: "",
    }
},{timestamps: true});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);  // Await the salt generation
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;