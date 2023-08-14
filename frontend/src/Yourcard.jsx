import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactPlayer from 'react-player' 
import { AiFillLike,AiOutlineShareAlt} from "react-icons/ai";
import { FaRegComment,FaGratipay } from "react-icons/fa";
import Accordion from 'react-bootstrap/Accordion';
import 'react-responsive-modal/styles.css';
import Web3 from 'web3';
import { Modal } from 'react-responsive-modal';

import DatePicker from 'react-datepicker';
// import subDays from 'date-fns/subDays';
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
// import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

const Yourcard = (props) => { 
  
  const newc=React.useRef();
  const newc2=React.useRef();
  const numc=React.useRef();
  React.useEffect(()=>{
    console.log(props);
  },[props]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  
  const [open2, setOpen2] = React.useState(false);
  const onOpenModal2 = () => setOpen2(true);
  const onCloseModal2 = () => setOpen2(false);


  async function list(){
    console.log(startDate+" , "+ endDate+ " , "+newc2.current.value+" , "+props.link);
    
    const {contract}=props.state;
    const { ethereum } = window;
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    await contract.methods.nftCreate(props.link,newc2.current.value,props.name).send({from:accountss[0]}).then((res)=>{
      console.log(res);
    });
  }
  // let urls="localhost:5173/#"+props.id;
  
  return (<div>
     <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
      </Modal>
      <Modal open={open2} onClose={onCloseModal2} center>
        <h2>Create an Nft:</h2>
        {/* <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()}
            inline
            /> */}
        <input type="number" placeholder='Enter Royalty' ref={newc2} /><br/>
        <Button onClick={list}>Submit</Button>
      </Modal>
      
    <Card className='cardeach' id={props.id} style={{ marginTop:'5vh' }}>
    <ReactPlayer className="vid" url={props.link} controls={true} />
    <Card.Body>
      <Card.Title className='cardtitle'>
        <div className='inlinet'><h5>Video Name: &nbsp;</h5><h6>{props.name}</h6> </div>
          <div>
            <span><AiFillLike className='like' />{props.like} </span>
            <AiOutlineShareAlt className='share' onClick={onOpenModal} />
          </div>
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted lcts">
      <Button variant="primary" onClick={onOpenModal2}>Create an NFT</Button>
        </Card.Subtitle>
        <div>
          <div><h5>Creator: </h5> <h6>{props.owner}</h6> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div className='inlinet'><h5>Revenue Generated:</h5> {Web3.utils.fromWei(props.revenue, 'ether')}</div> 
          </div>
      <Card.Text>
       <div  className='inlinet'><h5>Video Description: </h5> {props.desc}</div><br/>
        <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header><span><FaRegComment className='comment' />{props.comment} </span></Accordion.Header>
                <Accordion.Body>
                  <ul>
                     {props.comment==="0"?<div className="nopost">No Comments Yet</div>:
                    <div>{props.commenter.map((item,index)=>{
                        return(<li key={index}>
                            By: {item.commenter}<br/>Comment: {item.line}<br/>
                            Tip: {Web3.utils.fromWei(item.tip, 'ether')}</li>);
                    })}
                      </div>
                    }
                    </ul>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Buyers</Accordion.Header>
                <Accordion.Body>
                    <ol>{props.buyer==null?<div className="nopost">No Buyers Yet</div>:<div>
                        {props.buyer.map((item,index)=>{
                            return(<li key={index}>{item}</li>);
                        })}</div>}
                        </ol>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
      </Card.Text>
    </Card.Body>
  </Card> 
  </div>
  )
}

export default Yourcard