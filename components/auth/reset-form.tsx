"use client";

import CardWrapper from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import * as z from "zod";
import {ResetSchema} from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";

const ResetForm = () => {

    const [error,setError]= useState("");
    const [success,setSuccess]= useState("");

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver:zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    const [isPending,startTransition] = useTransition();

    const onSubmit = async(values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");
        startTransition(()=>{
            reset(values).then((data:any)=>{
                if(data && data.error) setError(data.error);
                if(data && data.success) setSuccess(data.success);
            });
        });
    }


  return (
    <CardWrapper 
        headerLabel="Forgot your password"
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
                    
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    Send Reset Email
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default ResetForm