import { redirect } from "next/navigation";

import { z } from "zod";

import NameDescriptionPage from "@/components/pages/name-description-page";
import { createBook } from "@/lib/actions/books";
import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export default async function CreateBookPage() {
  async function action(data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>) {
    "use server";
    const response = await createBook({
      name: data.name,
      description: data.description,
    });

    if (response.error) {
      return response;
    }

    redirect(`/books`);
  }

  return (
    <NameDescriptionPage
      title={"Create new book"}
      description={"Create a new book."}
      nameValue={""}
      descriptionValue={""}
      nameFieldLabel={"Book Name"}
      descriptionFieldLabel={"Book Description"}
      nameFieldPlaceholder={"Trip ABC"}
      descriptionFieldPlaceholder={"Optional"}
      nameFieldDescription={
        "This is the name of your book. It is suggested to be unique."
      }
      descriptionFieldDescription={"This is the description of your book."}
      submitButtonLabel={"Create"}
      action={action}
    />
  );
}
