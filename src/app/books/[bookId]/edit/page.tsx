import { redirect } from "next/navigation";

import { z } from "zod";

import NameDescriptionPage from "@/components/pages/name-description-page";
import { updateBook } from "@/lib/actions/books";
import { getBooks } from "@/lib/db/books";
import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const { data: books, error } = await getBooks({ id: bookId });

  if (error) {
    redirect("/error");
  }

  async function action(data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>) {
    "use server";
    const response = await updateBook({
      id: bookId,
      name: data.name,
      description: data.description,
    });

    if (response.error) {
      return response;
    }

    redirect(`/books/${bookId}`);
  }

  const book = books[0];

  const { name, description } = book;

  return (
    <NameDescriptionPage
      title={"Edit book"}
      description={"Edit the book details."}
      nameValue={name}
      descriptionValue={description}
      nameFieldLabel={"Book Name"}
      descriptionFieldLabel={"Book Description"}
      nameFieldPlaceholder={"Trip ABC"}
      descriptionFieldPlaceholder={"Optional"}
      nameFieldDescription={
        "This is the name of your book. It is suggested to be unique."
      }
      descriptionFieldDescription={"This is the description of your book."}
      submitButtonLabel={"Update"}
      action={action}
    />
  );
}
