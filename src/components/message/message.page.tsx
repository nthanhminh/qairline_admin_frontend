import { FC } from "react";
import styles from './styles.module.css'
import Image from "next/image";
import { error } from "console";
import { useGlobalContext } from "@/contexts/global.context";
interface MessageProps {
    type: number;
    message: string;
}
export const MessagePage: FC<MessageProps> = ({type, message}) => {
    const { isShowMessage, setIsShowMessage } = useGlobalContext();
    const handleCloseMessage = () => {
        setIsShowMessage(false);
    }
    return (
        <div className={`${styles.messageContainer} ${isShowMessage ? styles.show : ''}`}>
            <div className={styles.icon}>
                <Image src={type === 1 ? '/images/check.png' : '/images/cross.png'} width={24} height={24} alt="" unoptimized></Image>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{type === 1 ? 'Successfully' : "Error"}</div>
                <div className={styles.description}>
                    {message}
                </div>
            </div>
            <div className={styles.close} onClick={() => {handleCloseMessage()}}>
                &times;
            </div>
        </div> 
    )
}