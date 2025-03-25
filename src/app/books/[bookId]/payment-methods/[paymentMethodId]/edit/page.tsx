import { redirect } from "next/navigation";

import { z } from "zod";

import NameDescriptionPage from "@/components/pages/name-description-page";
import { updatePaymentMethod } from "@/lib/actions/payment-methods";
import { getPaymentMethods } from "@/lib/db/payment-methods";
import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export default async function EditPaymentMethodPage({
  params,
}: {
  params: Promise<{ bookId: string; paymentMethodId: string }>;
}) {
  const { bookId, paymentMethodId } = await params;

  const { data: paymentMethods, error } = await getPaymentMethods(bookId);

  if (error) {
    redirect("/error");
  }

  const paymentMethod = paymentMethods?.find(
    (paymentMethod) => paymentMethod.id === paymentMethodId,
  );

  if (!paymentMethod) {
    redirect("/error");
  }

  async function action(data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>) {
    "use server";
    const response = await updatePaymentMethod({
      id: paymentMethodId,
      name: data.name,
      description: data.description,
    });

    if (response.error) {
      return response;
    }

    redirect(`/books/${bookId}/payment-methods`);
  }

  return (
    <NameDescriptionPage
      title={"Edit Payment Method"}
      description={"Edit the payment method details."}
      nameValue={paymentMethod.name}
      descriptionValue={paymentMethod.description}
      nameFieldLabel={"Payment Method Name"}
      descriptionFieldLabel={"Payment Method Description"}
      nameFieldPlaceholder={"Credit Card"}
      descriptionFieldPlaceholder={"Optional"}
      nameFieldDescription={
        "This is the name of your payment method. It is suggested to be unique."
      }
      descriptionFieldDescription={
        "This is the description of your payment method."
      }
      submitButtonLabel={"Update"}
      action={action}
    />
  );
}
