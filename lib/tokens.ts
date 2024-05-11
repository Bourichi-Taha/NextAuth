import { getVerificationTokenByEmail } from "@/data/verification-token";
import {v4 as uuid} from "uuid";
import { db } from "./db";


export const generateVerificationToken = async (email: string) => {
    const token = uuid();

    const expires = new Date(new Date().getTime() + 3600*1000);//3600sec in 1 hour *1000 conerting to millisec

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id:existingToken.id,
            }
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            expires,
            token,
        },
    });

    return verificationToken;

}