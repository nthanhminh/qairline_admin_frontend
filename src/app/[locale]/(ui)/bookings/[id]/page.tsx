import { BookingDetailPage } from "@/components/bookingDetail/bookingDetail.page";

const BookingDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id: string = (await params).id

  return (
    <BookingDetailPage
      id={id}
      translate={{}}
    />
  );
};

export default BookingDetail;
