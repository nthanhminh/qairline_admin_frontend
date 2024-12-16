import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { PossibleLocale } from '@/types/common.type';
import styles from './styles.module.css'
import { NavBarPage } from '@/components/navBar/navBar.page';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as PossibleLocale)) {
        notFound();
    }
    
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();
    
    return (
        <html lang={locale} suppressHydrationWarning>
        <body>
            <NextIntlClientProvider messages={messages}>
            
                    {/* <div className={styles.container}>
                        <NavBarPage translate={{}} />
                        <div className={styles.content}>{children}</div>
                    </div> */}
                
            {children}
            </NextIntlClientProvider>
        </body>
        </html>
    );
}