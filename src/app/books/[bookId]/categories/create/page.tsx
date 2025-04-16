import { redirect } from "next/navigation";

import { z } from "zod";

import NameDescriptionPage from "@/components/pages/name-description-page";
import { createCategory } from "@/lib/actions/categories";
import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export default async function CreateCategoryPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  async function action(data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>) {
    "use server";
    const response = await createCategory({
      id: bookId,
      name: data.name,
      description: data.description,
    });

    if (response.error) {
      return response;
    }

    redirect(`/books/${bookId}/categories`);
  }

  return (
    <NameDescriptionPage
      title={"Create category"}
      description={"Create a new category."}
      nameValue={""}
      descriptionValue={""}
      nameFieldLabel={"Category Name"}
      descriptionFieldLabel={"Category Description"}
      nameFieldPlaceholder={"Utility"}
      descriptionFieldPlaceholder={"Optional"}
      nameFieldDescription={
        "This is the name of your category. It is suggested to be unique."
      }
      descriptionFieldDescription={"This is the description of your category."}
      submitButtonLabel={"Create"}
      action={action}
    />
  );
}
