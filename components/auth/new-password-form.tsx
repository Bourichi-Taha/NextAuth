"use client";

import CardWrapper from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import * as z from "zod";
import {NewPasswordSchema} from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {

    const [error,setError]= useState("");
    const [success,setSuccess]= useState("");

    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    if (!token) {
        setError("Token not found!");
    }

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver:zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            token:token || ""
        }
    });

    const [isPending,startTransition] = useTransition();

    const onSubmit = async(values: z.infer<typeof NewPasswordSchema>) => {
        if (!token) {
            return;
        }
        setError("");
        setSuccess("");
        startTransition(()=>{
            newPassword(values).then((data:any)=>{
                if(data && data.error) setError(data.error);
                if(data && data.success) setSuccess(data.success);
            });
        });
    }


  return (
    <CardWrapper 
        headerLabel="Enter a new password"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
    >
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
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
                    Change password
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default NewPasswordForm