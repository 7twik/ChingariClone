import React,{ useState,useEffect } from 'react'
import './App.css'
import Chingari from './contracts/Chingari.json'
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './HomePage';
import Your from './Your';
import Web3 from 'web3';
import Ownnft from './Ownnft';
import Allnft from './Allnft';
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [state, setStatee] = React.useState({
    web3: null,
    contract: null,
  });
  const { ethereum } = window;
  React.useEffect(() => {
    async function template() {
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    var accountInterval = setInterval(async function() {
      const account = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (account[0] !== accountss[0]) {
        window.location.reload();
      }
    }, 100);
    
  }
  template();
  },[]);

  const notify = () => toast("Please switch network this app is deployed on Mumbai testnet,\n if you are using Metamask then switch to Mumbai testnet, \n chainID:80001, \n symbol: Matic, \n RPC URL: https://rpc-mumbai.maticvigil.com/, \nName: Mumbai Testnet");
  
  const notify2 = () => toast("Metamask is not downloaded please go to https://metamask.io/ and download it");
  async function template() {
    const web3 = new Web3(Web3.givenProvider||"ws://localhost:9545");
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    var accountInterval = setInterval(async function() {
      const networkId2 = await web3.eth.net.getId();
      if (networkId !== networkId2) {
        window.location.reload();
      }
    }, 100);
    if(networkId!==5777)
    {
      notify();
    }
    else{
      const deployedNetwork = Chingari.networks[networkId];
      const contract = new web3.eth.Contract(
        Chingari.abi,
        deployedNetwork.address
      );
      console.log(contract);
      setStatee({ web3: web3, contract: contract });
    }
  }
  useEffect(() => {
    if (window.ethereum == null) {
      alert("MetaMask not installed; using read-only defaults");
      console.log("MetaMask not installed; using read-only defaults")
      setProvider(Web3.getDefaultProvider());
      notify2();
    } else {
      
     template();
    }
  }, []);
  const [loading, setLoading] = useState(1);
  const loader=()=>{
    setLoading(loading*-1);
  }
  return (
    <div className='app'>
      {loading===-1?<div className="loader"></div>:<div>
     <ToastContainer />
      <Routes>
            <Route path="/" element={<HomePage state={state} />}/>
            <Route path="/yourAccount" element={<Your state={state} loader={loader} />}/>
            <Route path="/yourNft" element={<Ownnft state={state} />}/>
            <Route path="/nft" element={<Allnft state={state} />}/>
        </Routes>
        </div>}
    </div>
  )
}

export default App
