'use client'
 
import { useSearchParams } from 'next/navigation'
import { VerifyPage } from "@/components/verifyCode/verifyCode.page";

export default function LoginPageHome() {
    const searchParams = useSearchParams();
    const email:string = searchParams.get('email') ?? '';
    //   const t = useTranslations('HomePage');
    return (
        <VerifyPage email={email} translate={{}}/>
    );
}