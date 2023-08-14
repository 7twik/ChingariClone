import React from 'react'
import Nave from './Nave'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nftcard from './Nftcard';

const Ownnft = (props) => {
    const [data, setData] = React.useState([]);
    const [ddata, setDdata] = React.useState([]);
    const [datac, setDatac] = React.useState([]);
    const { ethereum } = window;
    React.useEffect(() => {
        async function getData(){
            let ownddata=[];
            let ownadata=[];
            const {contract}=props.state;
            const accountss = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            await contract.methods.nftown(accountss[0]).call().then((res)=>{
                console.log(res);
                setDdata(res);
            });
            await contract.methods.dshow().call().then((res)=>{
                console.log(res);
                res.filter((item)=>{
                    if(item.owner.toLowerCase()==accountss[0]){
                        ownddata.push(item);
                    }
                });
                setData(ownddata);
            });
            await contract.methods.ashow().call().then((res)=>{
                console.log(res);
                res.filter((item)=>{
                    if(item.owner.toLowerCase()==accountss[0]){
                        ownadata.push(item);
                    }
                });
                setDatac(ownadata);
            });
        }
        getData();
    }, [props.state]);
    
  return (
    <div>
        <Nave state={props.state} />
        <Tabs
        defaultActiveKey="All"
        id="uncontrolled-tab-example"
        className="mb-3"
        >
        <Tab eventKey="Direct" title="Direct Sell">
            {data==null?<div className="nopost">No Nfts Yet</div>:
            <div className='cardes'>{data.map((item,index)=>{
                return(<Nftcard condition="cancel" state={props.state} key={index} data={item} />);
            })}</div>}
        </Tab>
        <Tab eventKey="Auction" title="Auction">
            {datac==null?<div className="nopost">No Nfts Yet</div>:
            <div className='cardes'>{datac.map((item,index)=>{
                return(<Nftcard condition="ownauc" state={props.state} key={index} data={item} />);
            })}</div>}
        </Tab>
        <Tab eventKey="All" title="All">
        {ddata==null?
            <div className="nopost">No Nfts Yet</div>:
            <div className='cardes'>{ddata.map((item,index)=>{
                return(<Nftcard condition="own" id={index} state={props.state} key={index} data={item} />);
            })}</div>}
        </Tab>
        </Tabs>
    </div>
  )
}

export default Ownnft