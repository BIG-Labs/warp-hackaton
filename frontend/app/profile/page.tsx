import Card from "@/components/Card";
import Table from "@/components/Table";

export default function Home() {
  return (
    <section className='w-full flex flex-col items-center pt-3'>
      <div className="flex w-full flex-col lg:flex-row gap-3 justify-center">
        <div className="w-full lg:w-3/6">
          <Card name="Profile">
            <Table />
          </Card>
        </div>
      </div>
    </section>
  )
}
