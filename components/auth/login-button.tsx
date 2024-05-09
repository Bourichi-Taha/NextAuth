"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children :React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

const LoginButton = (props:LoginButtonProps) => {

    const {children,asChild,mode="redirect"} = props;

    const router = useRouter();

    if (mode === "modal") {
        return (
            <span>
                TODO: MODAL
            </span>
        )
    }


    const onClick = () => {
        router.push("/auth/login")
    }

  return (
    <span className="cursor-pointer" onClick={onClick}>
        {
            children
        }
    </span>
  )
}

export default LoginButton