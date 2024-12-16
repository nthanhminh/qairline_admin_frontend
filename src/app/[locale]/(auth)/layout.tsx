import styles from './styles.module.css'
export default function AuthLayout({children} : {
    readonly children: React.ReactNode
}) {
    return (
        <div className={styles.authContainer}>
            {children}
        </div>
    );
}