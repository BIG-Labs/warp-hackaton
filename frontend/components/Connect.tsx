import React, { useEffect } from 'react';
import { useConnectedWallet, useWallet } from '@terra-money/wallet-kit';

function Connect() {
  const chainId = 'pisco-1';
  const connectedWallet = useConnectedWallet();
  const { connect, disconnect, availableWallets } = useWallet();

  useEffect(() => {
  }, [connectedWallet]);

  return (
    <section>
      {connectedWallet ? (
        <>
          <button className='bg-black text-white rounded-md pl-6 pr-6 pt-3 pb-3 w-full' onClick={() => disconnect()}>terra1...
            {connectedWallet.addresses[chainId].substring(
              connectedWallet.addresses[chainId].length - 6,
            )}</button>
        </>
      ) : (
        availableWallets.map(({ id, name, isInstalled }) => (
          <button className='bg-black text-white rounded-md pl-6 pr-6 pt-3 pb-3 w-full' onClick={() => connect(id)} disabled={!isInstalled} key={id}>
            Connect
          </button>
        ))
      )}
    </section>
  );
}

export default Connect;