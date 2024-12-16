import { FlightDetailPage } from '@/components/flightDetail/flightDetail.page';

export default async function FlightDetail({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id: string = (await params).id

    return (
        <FlightDetailPage 
            id={id} 
            translate={{}} 
        />
    );
}
