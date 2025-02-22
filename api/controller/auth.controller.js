import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { username, email, password, fullName, phone } = req.body;

    try {

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email or username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                role: 'user',
                fullName: fullName,
                phone: phone
            }
        });



        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const age = 1000 * 60 * 60 * 24 * 7;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: false,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const {
            password: userPassword, ...userInfo
        } = user

        res
            .cookie("token", token, {
                httpOnly: true,
                maxAge: age,
            })
            .status(200)
            .json(userInfo)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "logout success" });
};
