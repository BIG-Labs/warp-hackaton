'use client';

import Card from "@/components/Card";
import Input from "@/components/Input";
import { contracts } from "@/constants/contracts";
import { LCDClient, LCDClientConfig, MnemonicKey, Wallet } from '@terra-money/feather.js';
import { uint, cond, fn, msg, variable, job, ts, WarpSdk } from '@terra-money/warp-sdk';

export default function Home() {
  const piscoLcdClientConfig: LCDClientConfig = {
    lcd: 'https://pisco-lcd.terra.dev',
    chainID: 'pisco-1',
    gasAdjustment: 1.75,
    gasPrices: { uluna: 0.15 },
    prefix: 'terra',
  };

  const lcd = new LCDClient({
    'pisco-1': piscoLcdClientConfig,
  });

  const wallet = new Wallet(lcd, new MnemonicKey({ mnemonic: 'slot wasp glad glue party grab solve skirt divide elite exhaust step coyote make certain execute release wash usage canoe ignore next alpha prepare' }));

  const sdk = new WarpSdk(wallet, piscoLcdClientConfig);
  const sender = wallet.key.accAddress(piscoLcdClientConfig.prefix);

  const nextExecution = variable
    .static()
    .kind('uint')
    .name('next_execution')
    .value(ts.date(new Date('2023-04-10T12:30:00.000Z')))
    .onSuccess(fn.uint(uint.expr(uint.simple(ts.days(1)), 'add', uint.env('time'))))
    .onError(fn.uint(uint.expr(uint.simple(ts.hours(1)), 'add', uint.env('time'))))
    .compose();

  const condition = cond.uint(uint.env('time'), 'gt', uint.ref(nextExecution));

  const createJobMsg = job
    .create()
    .name('test')
    .description('This job tests stuff')
    .labels([])
    .recurring(true)
    .requeueOnEvict(true)
    .reward('50000')
    .cond(condition)
    .var(nextExecution)
    .msg(msg.execute(contracts.contract, { test: {} }))
    .compose();

  const onClick = async (e: any) => {
    e.preventDefault();
    const response = await sdk.createJob(sender, createJobMsg);
    console.log(response);
  }

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
              <button onClick={onClick} className="custom_button p-4 bg-black rounded-md text-white">Deposit</button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
