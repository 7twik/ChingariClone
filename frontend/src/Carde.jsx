import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactPlayer from 'react-player' 
import { AiFillLike,AiOutlineShareAlt} from "react-icons/ai";
import { FaRegComment,FaGratipay } from "react-icons/fa";
import Accordion from 'react-bootstrap/Accordion';
import 'react-responsive-modal/styles.css';
import copy from "copy-to-clipboard";
import Web3 from 'web3';
import { Modal } from 'react-responsive-modal';
const Carde = (props) => { 
  
  const newc=React.useRef();
  const newc2=React.useRef();
  const numc=React.useRef();
  React.useEffect(()=>{
    console.log(props);
  },[props]);
  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const copyToClipboard = () => {
    copy(urls);
    alert(`You have copied`);
}
  async function like(){
    const {contract}=props.state;
    const { ethereum } = window;
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    await contract.methods.like(props.link).send({from:accountss[0]}).then((res)=>{
      console.log(res);
    });
    console.log(props.id);
  }
  async function comment(){
    const {contract}=props.state;
    const { ethereum } = window;
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    await contract.methods.newcomment(props.link,newc.current.value).send({from:accountss[0]}).then((res)=>{
      console.log(res);
    });
  }
  
  async function comment2(){
    const {contract}=props.state;
    const { ethereum } = window;
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    await contract.methods.commentTip(props.link,newc2.current.value).send({value:Web3.utils.toWei(numc.current.value, "ether"),from:accountss[0]}).then((res)=>{
      console.log(res);
    });
  }
  function tip(){
    console.log(props.id);
  }
   let urls="localhost:5173/#"+props.name;
  
  return (<div>
     <Modal open={open} onClose={onCloseModal} center>
        <h2>Copy the link: &quot;{urls}&quot;</h2>
        <Button onClick={copyToClipboard}>
                    Copy to Clipboard
                </Button>
      </Modal>
      
    <Card className='cardeach' id={props.id} style={{ marginTop:'5vh' }}>
    <ReactPlayer className="vid" url={props.link} controls={true} />
    <Card.Body>
      <Card.Title className='cardtitle'><div className='inlinet'><h5>Video Name: &nbsp;</h5><h6>{props.name}</h6> </div>
          <div>
            <span><AiFillLike className='like' onClick={like} />{props.like} </span>
            <AiOutlineShareAlt className='share' onClick={onOpenModal} />
          </div>
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted lcts">
          
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
                    <li><input type="text" placeholder='Enter comment' ref={newc} /><button onClick={comment}>Send</button></li>
                    <li><input type="text" placeholder='Enter comment' ref={newc2} /><input type="number" placeholder='Enter tip' ref={numc} /><button onClick={comment2}>Send</button></li>
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
            </Accordion>
      </Card.Text>
    </Card.Body>
  </Card> 
  </div>
  )
}

export default Carde