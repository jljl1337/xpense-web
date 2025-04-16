import { redirect } from "next/navigation";

import { z } from "zod";

import NameDescriptionPage from "@/components/pages/name-description-page";
import { updateCategory } from "@/lib/actions/categories";
import { getCategories } from "@/lib/db/categories";
import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ bookId: string; categoryId: string }>;
}) {
  const { bookId, categoryId } = await params;

  const { data: categories, error } = await getCategories({ id: categoryId });

  const category = categories[0];

  if (error) {
    redirect("/error");
  }

  async function action(data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>) {
    "use server";
    const response = await updateCategory({
      id: categoryId,
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
      title={"Edit category"}
      description={"Edit the category details."}
      nameValue={category.name}
      descriptionValue={category.description}
      nameFieldLabel={"Category Name"}
      descriptionFieldLabel={"Category Description"}
      nameFieldPlaceholder={"Utility"}
      descriptionFieldPlaceholder={"Optional"}
      nameFieldDescription={
        "This is the name of your category. It is suggested to be unique."
      }
      descriptionFieldDescription={"This is the description of your category."}
      submitButtonLabel={"Update"}
      action={action}
    />
  );
}
