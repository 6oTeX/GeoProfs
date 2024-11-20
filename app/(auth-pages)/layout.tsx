import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-full w-full flex flex-col justify-around h-svh p-4">
      <header className="flex justify-between items-start w-full">
        <Link href="/" className="text-2xl">
          GeoProfs
        </Link>
        <Link href="/" className="border hover:opacity-80 px-4 py-2 rounded ">
          Back
        </Link>
      </header>
      <div className="m-auto">{children}</div>
    </div>
  );
}
