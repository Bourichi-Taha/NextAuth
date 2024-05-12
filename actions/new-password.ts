"use server";
import bcrypt from "bcryptjs";
import { getResetTokenByToken } from "@/data/reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>) => {

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    const {token,password} = validatedFields.data;

    const resetToken = await getResetTokenByToken(token);

    if (!resetToken) {
        return {
            error: "Token does not exist!"
        }
    }

    const hasExpired = new Date(resetToken.expires) < new Date();

    if (hasExpired) {
        return {
            error: "Token has expired!"
        }
    }

    const user = await getUserByEmail(resetToken.email);

    if (!user) {
        return {
            error: "Email does not exist!"
        }
    }

    const hashedPass = await bcrypt.hash(password,10);

    await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            password:hashedPass
        }
    });

    await db.resetToken.delete({
        where: {
            id: resetToken.id,
        }
    });

    return {
        success: "Password Changed!"
    }

}