import bcrypt from "bcrypt";
import User from "../models/User.js";

const changePassword = async (req, res) => {
    try {
        const {userId, oldPassword, newPassword} = req.body;

        const user = await User.findById({_id: userId});
        if(!user){
            return res.status(404).json({success: false, error: "User not found"});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(404).json({success: false, error: "wrong old password"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const newUser = await User.findByIdAndUpdate({_id: userId}, {password: hashedPassword}, {new: true});

        return res.status(200).json({success: true, user: newUser});
        
    } catch (error) {
        return res.status(500).json({success: false, error: "Setting side error"});
    }
}

export { changePassword };