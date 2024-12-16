import { NavBarPage } from '@/components/navBar/navBar.page';
import styles from './styles.module.css'

export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <NavBarPage translate={{}} />
            <div className={styles.content}>{children}</div>
        </div>
    );
}
