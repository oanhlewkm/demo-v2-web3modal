
const HASH = "0x35a4c9e0021a918030818cf58fcf99bc3cc8ff8f69f7fd76e2bc53e9d4290ea3";
import { fetchTransaction } from '@wagmi/core'
 
const Transaction = () => {

  const fetchHash = async () => {
    if (!HASH) return;
    const transaction = await fetchTransaction({
      hash: HASH,
    });
    console.log(transaction);
  }
  
  return (
    <>
      <h6>Transaction</h6>
      <button
        onClick={fetchHash}
        style={{
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        Fetch
      </button>
    </>
  )
}

export default Transaction;