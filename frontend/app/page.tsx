import Card from "@/components/Card";
import Input from "@/components/Input";

export default function Home() {
  return (
    <section className='w-full flex flex-col items-center pt-3'>
      <div className="flex w-full flex-col lg:flex-row gap-3 justify-center">
        <div className="w-full lg:w-3/6">
          <Card name="New position">
            <div className="w-full flex flex-col justify-center gap-6">
              <div className="flex flex-col gap-4">
                <Input name="Upper bound" placeholder="Insert the upper bound" />
                <Input name="Lower bound" placeholder="Insert the lower bound" />
                <Input name="Interval rate" placeholder="Insert the interval rate" />
              </div>
              <button className="custom_button p-4 bg-black rounded-md text-white">Deposit</button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
