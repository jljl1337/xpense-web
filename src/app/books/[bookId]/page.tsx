export default async function BookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  return (
    <div className="h-full w-full flex items-center justify-center">
      Book: {bookId}
    </div>
  );
}
