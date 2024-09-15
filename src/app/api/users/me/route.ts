import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

//Profile Backend Part
export async function POST(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");

        if(!user){
            return NextResponse.json({error: "User did not Found"}, {status: 500});
        }
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}