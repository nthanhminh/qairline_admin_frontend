'use client'
 
import { useSearchParams } from 'next/navigation'
import { ForgotPage } from "@/components/forgotpassword/forgotpassword.page";

export default function LoginPageHome() {
    //   const t = useTranslations('HomePage');
    const searchParams = useSearchParams();
    const code:string = searchParams.get('code') ?? '';
    const email:string = searchParams.get('email') ?? '';
    const codeConvertedNumber = parseInt(code);
    return (
        <ForgotPage email={email} code={codeConvertedNumber} translate={{}}/>
    );
}