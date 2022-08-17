/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {

  const [balance, setBalance] = useState(0.0)

  useEffect(() => {
    getBalance()
  }, [])

  async function getBalance(){

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    let accounts = await provider.send("eth_requestAccounts", [])
    let account = accounts[0]
    const balance = await provider.getBalance(account)
    const balanceInEth = ethers.utils.formatEther(balance)
    setBalance(balanceInEth)
  }

  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Metaverse Marketplace</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-pink-500">
              Mint NFT
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-pink-500">
              My NFTs
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-pink-500">
              Dashboard
            </a>
          </Link>
          Balance: {balance} Eth
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp