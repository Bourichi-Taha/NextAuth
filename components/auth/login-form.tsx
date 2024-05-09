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
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

const LoginForm = () => {

    const [error,setError]= useState("");
    const [success,setSuccess]= useState("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [isPending,startTransition] = useTransition();

    const onSubmit = async(values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(()=>{
            login(values).then((data:any)=>{
                if(data && data.error) setError(data.error);
                if(data && data.success) setSuccess(data.success);
            });
        });
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
                                        disabled={isPending}
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
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    Login
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm