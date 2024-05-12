import { db } from "@/lib/db";


export const getResetTokenByEmail = async (email: string) => {
    try {
        const resetToken = await db.resetToken.findFirst({
            where: {
                email
            }
        });
        return resetToken;
    } catch (error) {
        return null;
    }
}


export const getResetTokenByToken = async (token: string) => {
    try {
        const resetToken = await db.resetToken.findUnique({
            where: {
                token
            }
        });
        return resetToken;
    } catch (error) {
        return null;
    }
}