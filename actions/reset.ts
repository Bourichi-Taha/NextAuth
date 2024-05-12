"use server";
import { getUserByEmail } from "@/data/user";
import { sendResetEmail } from "@/lib/mail";
import { generateResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid Email!",
        };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            error: "User does not exist!"
        }
    }

    if (!existingUser.emailVerified) {
        return {
            error: "Verify your email first!"
        }
    }

    const resetToken = await generateResetToken(email);

    await sendResetEmail(resetToken.email, resetToken.token);


    return {
        success: "Reset Email sent!"
    }
}