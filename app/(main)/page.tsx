import Statistic from "@/components/dashboard/Statistic";
import Table from "@/components/dashboard/Table";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  return (
    <main className="!w-full bg-bg mb-[32px]">
      <PageHeader title="Dashboard" />
      <Statistic />
      <Table />
    </main>
  );
}
