// import {useTranslations} from 'next-intl';

import { FlightPage } from "@/components/flight/flight.page";
import { FlightDetailPage } from "@/components/flightDetail/flightDetail.page";

 
export default function FlightsPage() {
    //   const t = useTranslations('HomePage');
      return (
        // <FlightPage translate={{}}/>
        <FlightDetailPage translate={{}}/>
      );
    }