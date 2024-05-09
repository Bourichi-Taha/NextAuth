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


export const RegisterSchema = z.object({
    email: z.string({
        required_error:"Email is required!",
        invalid_type_error:"Email is required!",
    }).email({
        message: "Enter a valid Email!",
    }),
    password: z.string({
        required_error:"Password is required!",
        invalid_type_error:"Password is required!",
    }).min(8,{
        message: "Password must contain at least 8 characters!"
    }),
    username: z.string({
        required_error:"Username is required!",
        invalid_type_error:"Username is required!",
    }).min(4,{
        message: "Username must contain at least 4 characters!"
    })
});