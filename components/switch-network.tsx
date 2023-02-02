import { Chain, getNetwork } from '@wagmi/core'
import { switchNetwork } from '@wagmi/core'
import { useEffect, useState } from 'react';

const SwitchNetwork = () => {
  const { chain, chains } = getNetwork();
  const [chainsSwitch, setChainsSwitch] = useState<Chain[]>([]);
  const [currentChain, setCurrentChain] = useState<Chain | undefined>(chain);

  const handleSwitchChain = async (newChain: Chain) => {
    if (!newChain) return; 
      try {
        const network = await switchNetwork({
          chainId: newChain.id,
        });
        console.log(network)
        setCurrentChain(network);
      } catch (error) {
        console.log("error handleSwitchChain", error)
      }
  }

  useEffect(() => {
    if (currentChain) {
      const list = chains.filter(el => el.id !== chain?.id);
      setChainsSwitch(list);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChain]);

  return (
    <>
      <h6>SwitchNetwork</h6>
      {chainsSwitch.length > 0 && (
        <>
          {chainsSwitch.map(el => (
            <button
              key={el.id}
              onClick={() => handleSwitchChain(el)}
              style={{
                marginRight: "8px",
              }}
            >
              Chain {el.name} - ID: {el.id}
            </button>
          ))}
        </>
      )}
    </>
  )
}

export default SwitchNetwork;