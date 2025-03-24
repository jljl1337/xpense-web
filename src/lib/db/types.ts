import { Database } from "@/lib/db/types.g";

export type Book = Database["xpense"]["Tables"]["book"]["Row"];
export type Category = Database["xpense"]["Tables"]["category"]["Row"];
