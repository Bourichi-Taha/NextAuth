"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const verification = async (token:string) => {
    const verificationToken = await getVerificationTokenByToken(token);

    if (!verificationToken) {
        return {
            error: "Token does not exist!"
        }
    }

    const hasExpired = new Date(verificationToken.expires) < new Date();

    if (hasExpired) {
        return {
            error: "Token has expired!"
        }
    }

    const user = await getUserByEmail(verificationToken.email);

    if (!user) {
        return {
            error: "Email does not exist!"
        }
    }

    await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            emailVerified: new Date(),
            email: verificationToken.email,
        }
    });

    await db.verificationToken.delete({
        where: {
            id: verificationToken.id,
        }
    });

    return {
        success: "Email verified!"
    }

}