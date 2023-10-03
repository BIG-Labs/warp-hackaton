'use client';

import { useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import { useConnectedWallet, useLcdClient, useWallet } from "@terra-money/wallet-kit";
import { contracts } from "@/constants/contracts";

export default function Table() {
  const lcd = useLcdClient();
  const wallet: any = useConnectedWallet();
  const headers: any = ['Lower Bound', 'Upper Bound', 'Amount USDC', 'Amount Luna'];
  const [values, setValues] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      // const response = await lcd.wasm.contractQuery(contracts.contract, {
      //   get_positions: {
      //     user: wallet?.terraAddress
      //   }
      // });
      setValues([]);
      setLoading(false);
    })();
  }, [wallet]);

  return (
    <LoadingComponent isLoading={loading} values={values}>
      <table className="w-full h-full border-collapse mb-3">
        <thead>
          <tr className="table_row">
            {
              headers.map((v: string) => (
                <th key={v} className='small text-right'>
                  {v}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            values.map((row: any) => (
              <tr key={row.id}>
                <td className="text-right pt-4">{row.lower_bound}</td>
                <td className='text-right pt-4'>{row.uper_bound}</td>
                <td className='text-right pt-4'>{row.base_amount}</td>
                <td className='text-right pt-4'>{row.quote_amount}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </LoadingComponent>
  );
}