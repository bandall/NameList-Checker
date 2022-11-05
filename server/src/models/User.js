import mongoose from "mongoose";
import bcrpyt from "bcrypt";
import crypto from "crypto";
const userSchema = mongoose.Schema({
    type: { type:String },
    name: { type:String, required:true },
    phoneNumber: { type:String, required:true },
    region: { type:String },
    date: { type:Date },
    IP: { type:String, required:true }
})

userSchema.pre("save", async function() {
    if(this.isModified("name")) {
        this.name = crypto.createHash('sha256').update(this.name).digest('hex');
    }
    if(this.isModified("phoneNumber")) {
        this.phoneNumber = crypto.createHash('sha256').update(this.phoneNumber).digest('hex');
    }
})

const User = mongoose.model("User", userSchema);
export default User;