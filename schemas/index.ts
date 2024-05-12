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
    name: z.string({
        required_error:"name is required!",
        invalid_type_error:"name is required!",
    }).min(4,{
        message: "name must contain at least 4 characters!"
    })
});


export const ResetSchema = z.object({
    email: z.string({
        required_error:"Email is required!",
        invalid_type_error:"Email is required!",
    }).email({
        message: "Enter a valid Email!",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string({
        required_error:"Password is required!",
        invalid_type_error:"Password is required!",
    }).min(8,{
        message: "Password is requied(min: 8 characters!)",
    }),
    token: z.string(),

});