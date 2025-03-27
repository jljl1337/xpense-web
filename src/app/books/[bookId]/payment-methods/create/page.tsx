import { z } from "zod";

import NameDescriptionPage from "@/components/pages/name-description-page";
import { createPaymentMethod } from "@/lib/actions/payment-methods";
import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export default async function CreatePaymentMethodPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  async function action(data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>) {
    "use server";
    return createPaymentMethod({
      id: bookId,
      name: data.name,
      description: data.description,
    });
  }

  return (
    <NameDescriptionPage
      title={"Create Payment Method"}
      description={"Create a new payment method."}
      nameValue={""}
      descriptionValue={""}
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
      submitButtonLabel={"Create"}
      action={action}
    />
  );
}
