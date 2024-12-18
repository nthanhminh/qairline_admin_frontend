import { NavBarPage } from '@/components/navBar/navBar.page';
import styles from './styles.module.css'
import { UserPage } from '@/components/user/user.page';

export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <NavBarPage translate={{}} />
            <div className={styles.content}>
                <UserPage translate={{}}></UserPage>
                {children}
            </div>
        </div>
    );
}
