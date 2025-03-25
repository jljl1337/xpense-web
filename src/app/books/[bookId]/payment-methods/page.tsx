import { redirect } from "next/navigation";

import PaymentMethodsClientPage from "@/app/books/[bookId]/payment-methods/page-client";
import { getPaymentMethods } from "@/lib/db/payment-methods";

export default async function PaymentMethodsPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const { data: paymentMethods, error } = await getPaymentMethods(bookId);

  if (error) {
    redirect("/error");
  }

  return (
    <PaymentMethodsClientPage
      bookId={bookId}
      paymentMethods={paymentMethods!}
    />
  );
}
