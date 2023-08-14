import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactPlayer from 'react-player';
import 'react-responsive-modal/styles.css';
import Web3 from 'web3';
import { Modal } from 'react-responsive-modal';
import DatePicker from 'react-datepicker';
import { HashLink } from 'react-router-hash-link';
const Nftcard = (props) => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };
    const newc2=React.useRef();
    const auc2=React.useRef();
    const bidval=React.useRef();
    const [bid, setBid] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    
    const [open2, setOpen2] = React.useState(false);
    const onOpenModal2 = () => setOpen2(true);
    const onCloseModal2 = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false);
    const onOpenModal3 = () => setOpen3(true);
    const onCloseModal3 = () => setOpen3(false);
    
    const [data, setData] = React.useState(props.data);
    const [link, setLink] = React.useState("/");
    async function list(){
        const {contract}=props.state;
        const { ethereum } = window;
        const accountss = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        console.log("list");
        let tim=endDate.getTime()/100000;
        tim=Math.ceil(tim);
        await contract.methods.dlist(data.id,newc2.current.value,tim,endDate.toString()).send({from:accountss[0]});

    }
    async function auclist(){
        const {contract}=props.state;
        const { ethereum } = window;
        const accountss = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        console.log("list");
        let tim=endDate.getTime()/100000;
        tim=Math.ceil(tim);
        await contract.methods.alist(data.id,auc2.current.value,tim,endDate.toString()).send({from:accountss[0]}).then((res)=>{
            console.log(res);
        });

    }
    React.useEffect(()=>{
        setData(props.data);
        console.log(props.data);
        setLink("/#"+props.data.name);
    },[props]);

    function redi(){
        window.location.href="http://localhost:5173#"+data.name;
    }
    async function cancel(){
        const {contract}=props.state;
        const { ethereum } = window;
        const accountss = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        console.log("cancel");
        await contract.methods.dcancel(data.id).send({from:accountss[0]}).then((res)=>{
            console.log(res);
        });
    }
    async function cancel2(){
        const {contract}=props.state;
        const { ethereum } = window;
        const accountss = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        console.log("cancel");
        await contract.methods.acancel(data.nftId).send({from:accountss[0]}).then((res)=>{
            console.log(res);
        });
    }
    async function accept(){
        const {contract}=props.state;
        const { ethereum } = window;
        const accountss = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        let tim=new Date().getTime()/100000;
        tim=Math.ceil(tim);
        await contract.methods.aaccept(data.nftId,tim).send({from:accountss[0]}).then((res)=>{
            console.log(res);
        });
    }
    async function buy(){
        const {contract}=props.state;
        const { ethereum } = window;
        const accountss = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        console.log("cancel");
        let vdate=new Date().getTime()/100000;
        vdate=Math.ceil(vdate);
        await contract.methods.dbuy(data.id,vdate).send({value:Web3.utils.toWei(data.price, "ether"),
            from:accountss[0],
            gas: Web3.utils.toHex(2100000)}).then((res)=>{
            console.log(res);
        });
    }
    async function placeBid(){
        const {contract}=props.state;
        const { ethereum } = window;
        const accountss = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        let dat=new Date();
        let tim=dat.getTime()/100000;
        tim=Math.ceil(tim);
        console.log(bid,data.nftId,tim);
        await contract.methods.auctionBid(data.nftId,tim).send({value:Web3.utils.toWei(bid, "ether"),
            from:accountss[0]}).then((res)=>{
            console.log(res);
        });
    }
    
    function bidvalchange(e){
        setBid(e.target.value);
    }

  return (
    <div>
    <Modal open={open} onClose={onCloseModal} center>
        <h2>List an Nft:</h2>
        <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()}
            inline
            />
        <input type="number" placeholder='Enter Starting Price' ref={auc2} /><br/>
        <Button onClick={auclist}>Submit</Button>
    </Modal>

    <Modal open={open3} onClose={onCloseModal3} center>
        <h2>Bid for this Nft:</h2>
        <input type="number" placeholder='Enter Bid Price' onChange={bidvalchange} /><br/>
        <Button onClick={placeBid}>Submit</Button>
    </Modal>

    <Modal open={open2} onClose={onCloseModal2} center>
        <h2>List an Nft:</h2>
        <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()}
            inline
            />
        <input type="number" placeholder='Enter Price' ref={newc2} /><br/>
        <Button onClick={list}>Submit</Button>
    </Modal>
    {data.videoLink==""?<></>:
    <Card className='cardeach' id={props.id} style={{ marginTop:'5vh' }}>
    <ReactPlayer className="vid" url={data.videoLink} controls={true} />
    <Card.Body>
      <Card.Title onClick={redi}>
      <HashLink smooth to={link} > {data.name}</HashLink></Card.Title>
      <Card.Text>
        <h4>Royalty percentage: {data.royaltyPercent} %</h4>
        <h6 style={{marginLeft:"auto"}}>Owner: {data.owner}</h6> 
        {props.condition=="ownauc"||props.condition=="allauc"?<div>
            Starting Price: {data.sprice} ETH<br/>
            Deadline: {data.date2.slice(10)}
            <h6 style={{marginLeft:"auto"}}>Current Bidder:{data.cowner!=data.powner?<>{data.cowner}</>:<>No bidder</>} </h6>
            <h6 style={{marginLeft:"auto"}}>Current Price: {data.cowner!=data.powner?<>{data.cprice} ETH</>:<>0 ETH</>}</h6>
            </div>:<></>}
      </Card.Text>
      {props.condition=="cancel"||props.condition=="buy"?<div>
        Price: {data.price} ETH<br/>
        Deadline: {data.date2.slice(10)}
      </div>:<div/>}
      {props.condition=="own"?<div>
        <Button variant="primary" onClick={onOpenModal2}>Direct Sell</Button>
        <Button variant="primary" onClick={onOpenModal}>Auction</Button></div>:
      props.condition=="cancel"?<Button variant="primary" onClick={cancel}>Cancel</Button>:
      props.condition=="buy"?<Button variant="primary" onClick={buy}>Buy</Button>:
      props.condition=="ownauc"?<div>
        <Button variant="primary"  onClick={accept}>Accept bid</Button>
        <Button variant="primary"  onClick={cancel2}>Cancel</Button></div>:
      props.condition=="allauc"?<Button variant="primary" onClick={onOpenModal3}>Place Bid</Button>:<div></div>}
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
  </Card>}
  </div>
  )
}

export default Nftcard