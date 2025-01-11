import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(password === confirmPassword)
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });

        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exist..!" });

        }

        // hashing
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
        })
        await newUser.save()
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({
                message: "Registered Successfully...!", user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                }
            })
        }



    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server Error" });


    }

}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            res.status(404).json({ message: "invalid email or password" });

        }
        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({
            message: "Login Successfully...", user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server Error" });

    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({ message: "User Logout Successfully....! " });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server Error" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.user._id;


        const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json({ filteredUser });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });

    }
}