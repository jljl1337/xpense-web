import NameDescriptionPage from "@/components/pages/name-description-page";
import { createBook } from "@/lib/actions/books";

export default async function CreateBookPage() {
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
      action={createBook}
    />
  );
}
