import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Table from "@/components/data-table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-48 py-16 space-y-4">
      <div className="flex justify-between">
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
      </div>

      <Table />
    </main>
  );
}
