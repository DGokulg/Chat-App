import { OAuth2Client } from "google-auth-library"
import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT)
const googleAuth = async (req, res) => {
    try {
        // console.log(req.body)
        const { credential } = req.body

        const ticket = await client.verifyIdToken(
            {
                idToken: credential,
                audience: process.env.GOOGLE_OAUTH_CLIENT
            }
        )
        const payload = ticket.getPayload()


        console.log(payload)
        const email = payload.email

        const year = 2000 + parseInt(email.substring(0, 2), 10)
        const passed_out = year + 4
        const curr_year = new Date().getFullYear()

        const user = await User.findOne({ email: email })


        if (!user) {
            // if (payload.hd && payload.hd === "drngpit.ac.in") {
            //     if (passed_out <= curr_year) {
            //         await User.create({
            //             google_id: payload.id,
            //             name: payload.name,
            //             email: payload.email,
            //             passed_out: passed_out.toString(),
            //             role: "alumni"
            //         })
            //     }
            //     else {
            //         // console.log("He is a student")
            //         await User.create({
            //             google_id: payload.sub,
            //             name: payload.name,
            //             email: payload.email,
            //             passed_out: passed_out.toString(),
            //             role: "student"
            //         })
            //     }
            //     res.status(200).json({
            //         message: "login sucessfull",
            //         token: token,
            //         user: payload
            //     })
            // }
            // else {
            //     res.status(401).json(
            //         {
            //             message: "invalid email ID"
            //         }
            //     )
            // }

            await User.create({
                google_id: payload.sub,
                name: payload.name,
                email: payload.email,
                passed_out: passed_out.toString(),
                role: "alumni"
            })
            res.status(200).json({
                message: "login sucessfull",
                token: token,
                user: payload
            })
        }

        else {
            // console.log("user already exists")
            const token = generateToken(user)
            // if (payload.hd && payload.hd === "drngpit.ac.in") {
            //     res.status(200).json({
            //         message: "login sucessfull",
            //         token: token,
            //         user: payload
            //     })
            // }
            // else {
            //     res.status(401).json(
            //         {
            //             message: "invalid email ID"
            //         }
            //     )
            // }
            res.status(200).json({
                message: "login sucessfull",
                token: token,
                user: payload
            })
        }


    }
    catch (e) {
        console.log(e)
        res.status(401).json({
            message: "failed to login"
        })
    }
}

export default googleAuth