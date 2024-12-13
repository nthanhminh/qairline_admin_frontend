import { FlightDetailPage } from '@/components/flightDetail/flightDetail.page';

export default async function FlightDetail({ params }: { params: { id: string } }) {
    const { id } = params; 

    return (
        <FlightDetailPage 
            id={id} 
            translate={{}} 
        />
    );
}
