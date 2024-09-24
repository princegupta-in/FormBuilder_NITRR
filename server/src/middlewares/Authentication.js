import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export default async function middleware(req, res) {
    const cookies = req.cookies;
    const jwt = cookies.jwt;
    const url = req.url;

    if(url.includes('/signin')){
        if(jwt){
            try {
                verify(jwt, secret);
                return NextResponse.redirect('/profile');
            } catch (error) {
                return NextResponse.next();
            }
        }
    }

    if (url.includes('/profile') || url.includes('/formpage') || url.includes('/formbuilder')) {
        if(!jwt){
            return NextResponse.redirect('/signin');
        }
        try {
            verify(jwt, secret);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect('/signin');
        }
    }
    return NextResponse.next();
}