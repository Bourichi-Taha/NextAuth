"use client";

import CardWrapper from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);


    const searchParams = useSearchParams();

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already linked with another provider" : "";

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values).then((data: any) => {
                if (data && data.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data && data.success) {
                    form.reset();
                    setSuccess(data.success);
                }
                if (data && data.twoFactor) {
                    setShowTwoFactor(true);
                }

            }).catch(() => {
                setError("Something went wrong!");
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
                        {
                            !showTwoFactor ? (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
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
                                        render={({ field }) => (
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
                                                <Button size={"sm"} variant={"link"} asChild className="px-0 font-normal text-xs text-muted-foreground hover:text-black/80">
                                                    <Link href={"/auth/reset"}>
                                                        Forgot password?
                                                    </Link>
                                                </Button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            ) : (
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Code
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="123456"
                                                    disabled={isPending}
                                                    
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )

                        }
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {
                            showTwoFactor ? "Confirm" : "Login"
                        }
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm