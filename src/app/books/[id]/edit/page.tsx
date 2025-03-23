import { redirect } from "next/navigation";

import { z } from "zod";

import NameDescriptionPage from "@/components/pages/name-description-page";
import { updateBook } from "@/lib/actions/books";
import { getBooks } from "@/lib/db/books";
import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: books, error } = await getBooks();

  if (error) {
    redirect("/error");
  }

  const { id } = await params;

  async function action(data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>) {
    "use server";
    return updateBook({ id, name: data.name, description: data.description });
  }

  const book = books?.find((book) => book.id === id);
  if (!book) {
    redirect("/error");
  }
  const { name, description } = book;
  const nameValue = name;
  const descriptionValue = description;

  return (
    <NameDescriptionPage
      title={"Edit book"}
      description={"Edit the book details."}
      nameValue={nameValue}
      descriptionValue={descriptionValue}
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
