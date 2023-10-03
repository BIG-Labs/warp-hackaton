'use client';

import Nav from '@/components/Nav'
import './globals.css'
import { InfoResponse, WalletProvider, getInitialConfig } from '@terra-money/wallet-kit'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [defaultNetworks, setDefaultNetworks] = useState<InfoResponse>();

  useEffect(() => {
    (async () => {
      const networks = await getInitialConfig();
      setDefaultNetworks(networks);
    })()
  }, []);

  return (
    <html lang="en">
      <body>
        {
          defaultNetworks ? <WalletProvider defaultNetworks={defaultNetworks}>
            <Nav />
            <div className='text-center'>
              <h1 className="head_text">
                <span>Warp Hackaton</span>
              </h1>
              <span className="font-bold">Powered by Big labs</span>
            </div>
            {children}
          </WalletProvider> : <p>Loading...</p>
        }
      </body>
    </html>
  )
}
