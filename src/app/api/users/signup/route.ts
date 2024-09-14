import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/UserModel'
import { sendEmail } from '@/helpers/mailer'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server' // to send request and response

connect(); //call in every file

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody

        console.log(reqBody);

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already existed"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        const NewUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await NewUser.save();
        console.log(savedUser);

        //send mail
        await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id});

        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}