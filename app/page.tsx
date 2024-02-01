import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Table from "@/components/table";
import { CreateButton } from "@/components/button";
import Search from "@/components/search";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="flex min-h-screen flex-col px-48 py-16 space-y-4">
      <section className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-tight">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>

        <Avatar>
          <AvatarImage src="https://github.com/ulwanluthfi.png" />
          <AvatarFallback>UL</AvatarFallback>
        </Avatar>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between">
          <Search placeholder="Search Todo..." />

          <CreateButton />
        </div>
        <Table query={query} currentPage={currentPage} />
      </section>
    </main>
  );
}
