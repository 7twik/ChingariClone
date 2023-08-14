import React from 'react'
import Button from 'react-bootstrap/Button';
import Create from './Create'
import Nave from './Nave';
import Yourcard from './Yourcard';
const Your = (props) => {
    const [show, setshow] = React.useState(-1);
    const [data, setData] = React.useState([]);
    const { ethereum } = window;
    function loader(){
      props.loader();
    }
    React.useEffect(() => {

        const getData= async()=>{
          let owndata=[];
          const {contract}=props.state;
          const accountss = await ethereum.request({
            method: 'eth_requestAccounts',
          });
          
          await contract.methods.allDisplay().call().then((res)=>{
            console.log(res);
            res.filter((item)=>{
              console.log(item.owner.toLowerCase(),accountss[0]);
              if(item.owner.toLowerCase()==accountss[0]){
                owndata.push(item);
              }
            });
            console.log(owndata);
            setData(owndata);
          });
          //console.log(data);
        };
        getData();
      },[props.state]);
  return (
    <div>
        <Nave state={props.state} />
        <Button onClick={()=>{setshow(show*-1)}}>Add Video</Button>
        {(show==1)?<Create state={props.state} loader={loader} />:<div></div>}
        <h2 style={{color:"white",textAlign:"center",paddingTop:"5vh"}}>Your Posts:</h2>
        <div className="cardes">
        {data==null?<div className="nopost">No Posts Yet</div>:<div>{
          (data.map((item,index)=>{
              return(<div key={index}>
                <Yourcard id={index} state={props.state} link={item.videoLink}  name={item.videoName} desc={item.videoDescription} owner={item.owner} listed={item.listed} like={item.videoLikes} comment={item.videoComments} revenue={item.revenue} commenter={item.comments} liker={item.likers} buyers={item.buyers} />
              </div>);
          }))}
            </div>}</div>
    </div>
  )
}

export default Your