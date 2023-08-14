import React from 'react'
import Nave from './Nave'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nftcard from './Nftcard';

const Allnft = (props) => {
    const [data, setData] = React.useState([]);
    const [data2, setData2] = React.useState([]);
    const { ethereum } = window;
    React.useEffect(() => {
        async function getData(){
            const {contract}=props.state;
            const accountss = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            await contract.methods.dshow().call().then((res)=>{
                console.log(res);
                setData(res);
            });
            await contract.methods.ashow().call().then((res)=>{
                console.log(res);
                setData2(res);
            });
        }
        getData();
    }, [props.state]);
  return (
    <div>
        <Nave state={props.state} />
        <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
        >
        <Tab eventKey="home" title="Direct Sell">
            {data==null?<div className="nopost">No Nfts Yet</div>:<div className='cardes'>{data.map((item,index)=>{
                return(<Nftcard condition="buy" state={props.state} key={index} data={item} />);
            })}</div>}
        </Tab>
        <Tab eventKey="profile" title="Auction">
            {data2==null?<div className="nopost">No Nfts Yet</div>:<div className='cardes'>{data2.map((item,index)=>{
                    return(<Nftcard condition="allauc" state={props.state} key={index} data={item} />);
                })}</div>}
        </Tab>
        
        </Tabs>
    </div>
  )
}

export default Allnft