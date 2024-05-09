"use client";

import CardWrapper from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import * as z from "zod";
import {LoginSchema} from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";

const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const {isSubmitting} = form.formState;

    const onSubmit = async(values: z.infer<typeof LoginSchema>) => {
        setTimeout(()=>{
            console.log(values);
        },6000);
        console.log("done")
    }


  return (
    <CardWrapper 
        headerLabel="Welcome back"
        backButtonHref="/auth/register"
        backButtonLabel="Dont&apos;t have an account?"
        showSocial
    >
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="john.doe@example.com"
                                        type="email"
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="********"
                                        type="password"
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError  />
                <FormSuccess  />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    Login
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm