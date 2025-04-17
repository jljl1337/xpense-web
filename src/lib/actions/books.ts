"use server";

import { revalidatePath } from "next/cache";

import ObjectsToCsv from "objects-to-csv";
import { z } from "zod";

import {
  createBook as createBookDB,
  deleteBook as deleteBookDB,
  updateBook as updateBookDB,
} from "@/lib/db/books";
import { getCategories } from "@/lib/db/categories";
import { getExpenses, getExpensesCount } from "@/lib/db/expenses";
import { getPaymentMethods } from "@/lib/db/payment-methods";
import { Expense } from "@/lib/db/types";
import { formatDateFromISO } from "@/lib/formats/date";
import { ID_SCHEMA } from "@/lib/schemas/id";
import {
  ID_NAME_DESCRIPTION_SCHEMA,
  NAME_DESCRIPTION_SCHEMA,
} from "@/lib/schemas/name-description";

export async function createBook(
  data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>,
) {
  const dataValidation = NAME_DESCRIPTION_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid name and description." };
  }

  const response = await createBookDB(
    dataValidation.data.name,
    dataValidation.data.description,
  );

  if (!response.error) {
    revalidatePath("/books");
  }

  return response;
}

export async function updateBook(
  data: z.infer<typeof ID_NAME_DESCRIPTION_SCHEMA>,
) {
  const dataValidation = ID_NAME_DESCRIPTION_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid ID, name and description." };
  }

  const response = await updateBookDB(
    dataValidation.data.id,
    dataValidation.data.name,
    dataValidation.data.description,
  );

  if (!response.error) {
    revalidatePath("/books");
  }

  return response;
}

export async function deleteBook(data: z.infer<typeof ID_SCHEMA>) {
  const dataValidation = ID_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid ID." };
  }

  const response = await deleteBookDB(dataValidation.data.id);

  if (!response.error) {
    revalidatePath("/books");
  }

  return response;
}

export async function exportBookToCSV(data: z.infer<typeof ID_SCHEMA>) {
  try {
    const dataValidation = ID_SCHEMA.safeParse(data);

    if (!dataValidation.success) {
      return { error: "Please enter a valid ID." };
    }

    const { data: expenseCount, error: expenseCountError } =
      await getExpensesCount({
        bookId: data.id,
      });

    if (expenseCountError) {
      return { error: expenseCountError };
    }

    if (expenseCount === 0) {
      return { error: "Book has no expenses." };
    }

    const pageCount = Math.ceil(expenseCount / 100);

    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    // Create an array of promises
    const expensePromises = pages.map((page) => {
      return getExpenses({
        bookId: data.id,
        page,
        page_size: 100,
      });
    });

    // Execute all promises in parallel
    const expenses = await Promise.all(expensePromises);
    const allExpenses = expenses.reduce((acc: Expense[], { data, error }) => {
      if (error) {
        throw new Error(error);
      }
      if (data) {
        return [...acc, ...data];
      }
      return acc;
    }, []);

    const categoriesPromise = getCategories({ bookId: data.id });
    const paymentMethodsPromise = getPaymentMethods({ bookId: data.id });

    const [
      { data: categories, error: categoriesError },
      { data: paymentMethods, error: paymentMethodsError },
    ] = await Promise.all([categoriesPromise, paymentMethodsPromise]);

    if (categoriesError || paymentMethodsError) {
      return { error: categoriesError || paymentMethodsError };
    }
    const finalExpenses = allExpenses.map((expense) => {
      const category = categories.find(
        (category) => category.id === expense.category_id,
      );
      const paymentMethod = paymentMethods.find(
        (paymentMethod) => paymentMethod.id === expense.payment_method_id,
      );

      if (!category || !paymentMethod) {
        throw new Error("Category or payment method not found");
      }

      return {
        id: expense.id,
        date: formatDateFromISO(expense.date),
        amount: expense.amount,
        remark: expense.remark,
        category: category.name,
        payment_method: paymentMethod.name,
        created_at: expense.created_at,
        updated_at: expense.updated_at,
      };
    });

    const csvData = await new ObjectsToCsv(finalExpenses).toString();

    return { data: csvData };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
