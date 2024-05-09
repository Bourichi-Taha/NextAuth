import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string({
        required_error:"Email is required!",
        invalid_type_error:"Email is required!",
    }).email({
        message: "Enter a valid Email!",
    }),
    password: z.string({
        required_error:"Password is required!",
        invalid_type_error:"Password is required!",
    }).min(1,{
        message: "Password is requied!",
    }),
});