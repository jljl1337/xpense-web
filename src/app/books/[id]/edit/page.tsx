export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="h-full w-full flex items-center justify-center">
      Edit Book: {id}
    </div>
  );
}
