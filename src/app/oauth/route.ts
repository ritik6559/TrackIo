'use server'

import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {AUTH_COOKIE} from "@/features/auth/constants";

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId");
    const secret = request.nextUrl.searchParams.get("secret");

    if(!userId || !secret) {
        return new NextResponse("Missing fields")
    }

    const { account } = await createAdminClient();
    const session = await account.createSession(userId, secret);

    (await cookies()).set(AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    return NextResponse.redirect(`${request.nextUrl.origin}/`);
}
