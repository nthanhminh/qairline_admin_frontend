import { BookingDetailPage } from "@/components/bookingDetail/bookingDetail.page";


export default async function BookingDetail({ params }: { params: { id: string } }) {
    const { id } = params; 

    return (
        <BookingDetailPage 
            id={id} 
            translate={{}} 
        />
    );
}
