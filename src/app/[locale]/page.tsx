import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { UserPage } from '@/components/user/user.page';
 
export default function HomePage() {
  return (
    <UserPage translate={{}}/>
  )
}