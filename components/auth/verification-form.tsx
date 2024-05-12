"use client";

import { Loader } from "lucide-react";
import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { verification } from "@/actions/varification";
import FormError from "../form-error";
import FormSuccess from "../form-success";

const VerificationForm = () => {

    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    const [loading,setLoading] = useState(true);

    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const onSubmit = useCallback(async()=>{
        if (success || error) {
            return;
        }
        if (!token) {
            setError("Token not found!");
            return;
        }
        await verification(token).then((data:any)=>{
            if(data.success) setSuccess(data.success);
            if(data.error) setError(data.error);
        }).catch(()=> {
            setError("Something went wrong!")
        }).finally(()=>{
            setLoading(false);
        });
    },[token,success,error]);

    useEffect(()=>{
        onSubmit();
    },[onSubmit]);

  return (
    <CardWrapper
        headerLabel="Confirm your verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
    >
        <div className="flex items-center w-full justify-center">
            {
                loading ? (
                    <Loader className="h-6 w-6 animate-spin" />
                ) : (
                    <>
                        <FormSuccess message={success} />
                        {!success && <FormError message={error} />}
                    </>
                )
            }
        </div>
    </CardWrapper>
  )
}

export default VerificationForm