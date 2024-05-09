"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";



export const register = async(values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!",
        };
    }

    const {email,password,username} = validatedFields.data;

    const hashedPass =  await bcrypt.hash(password,10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {
            error: "Email already in use!"
        }
    }

    await db.user.create({
        data: {
            username,
            email,
            password:hashedPass,
        },
    });

    //TODO: sent verification token email

    return {
        success: "Email sent!",
    };
}