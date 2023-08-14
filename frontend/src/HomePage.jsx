import React from 'react'
import Nave from './Nave'
import Carde from './Carde'
const HomePage = ({state,loader}) => {
  const name=React.useRef();
  const category=React.useRef();
  const owner=React.useRef();
  const [data, setData] = React.useState(null);
  const [datab, setDatab] = React.useState(null);
  const { ethereum } = window;
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const href = window.location.href.substring(
      window.location.href.lastIndexOf('#') + 1,
    );
    if (window.location.href.lastIndexOf('#') > 0) {
      document.getElementById(href)?.scrollIntoView({
        behavior: "smooth"
      });
    }
    
  });
  React.useEffect(() => {
    const getData= async()=>{
      const {contract}=state;
      const accountss = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      await contract.methods.allDisplay().call().then((res)=>{
        console.log(res);
        setData(res);
        setDatab(res);
      });
      
      //console.log(data);
    };
    getData();
  },[state]);
  async function filte(){
    let filterdata=[];
    let totdata=datab;
    totdata.filter((item)=>{
      if(name!=null&&name.current.value!=""){
        if(item.videoName.includes(name.current.value)){
          filterdata.push(item);
        }
      }
      if(name!=null&&name.current.value!=""){
        totdata=filterdata;
      }
    });
    totdata.filter((item)=>{
      if(owner!=null&&owner.current.value!=""){
        if(item.owner.includes(owner.current.value)){
          filterdata.push(item);
        }
      }
      if(name!=null&&name.current.value!=""){
        totdata=filterdata;
      }
    });
    totdata.filter((item)=>{
      if(category!=null&&category.current.value!=""){
        if(item.videoName==name.current.value){
          filterdata.push(item);
        }
      }
      if(category!=null&&category.current.value!=""){
        totdata=filterdata;
      }
    });
      setData(totdata);
    
  }
  React.useEffect(()=>{
    console.log(data);
  },[data])
  return (
    <div className='home'>
        <Nave state={state} />
        <div className="cardes">
          <div className="searchbar">
            <input type="text" placeholder="Filter by name" className="search" ref={name} />
            <input type="text" placeholder="Filter by owner" className="search" ref={owner} />
            <input type="text" placeholder="Filter by category" className="search" ref={category} />
            <button className="searchbtn" onClick={filte}>Search</button>
          </div>
          {data==null?<div className="nopost">No Posts Yet</div>:<div>{
          (data.map((item,index)=>{
              return(<div id={item.videoName} key={index}>
                <Carde id={index} state={state} link={item.videoLink}  name={item.videoName} desc={item.videoDescription} owner={item.owner} listed={item.listed} like={item.videoLikes} comment={item.videoComments} revenue={item.revenue} commenter={item.comments} liker={item.likers} buyers={item.buyers} />
              </div>);
          }))}
            </div>}
        </div>

        </div>
  )
}

export default HomePage