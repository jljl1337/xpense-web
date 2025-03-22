export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="h-full w-full flex items-center justify-center">
      Book: {id}
    </div>
  );
}
