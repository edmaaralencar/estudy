"use client";

import { AiOutlineGoogle } from "react-icons/ai";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export function SignInButton() {
  function signInWithSocial() {
    signIn("google", { redirect: false }).then((callback) => {
      if (callback?.error) {
        return toast.error("Ocorreu um erro.");
      }

      if (callback?.ok && !callback.error) {
        return toast.success("Login realizado com sucesso.");
      }
    });
  }
  return (
    <Button onClick={signInWithSocial} size="lg" className="gap-2">
      <AiOutlineGoogle size={18} />
      Entre com Google
    </Button>
  );
}
