import React, { useState } from 'react'
import axios from "axios";
import "./App.css"
import { motion } from "framer-motion";
import Nave from './Nave';
const Create = ({state,loader}) => {
    const name=React.useRef();
    const desc=React.useRef();
    const cate=React.useRef();
    const [viddone, setViddone] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("no image selected");
  const { ethereum } = window;
  const[isloading,loading]=useState(false);
  const submitOne = async (event) => {
    alert("Please wait this process takes a while, please don't refresh the page")
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `805560e0545638ab59c5`,
            pinata_secret_api_key: `73cb41cb79201e2ecc6349eea0577a23c2e33979b9554b70dfdbb6cdecd15fee`,
            "Content-Type": "multipart/form-data",
          },
        });
        if(resFile)
        {
            setViddone(true);
        }
        const {contract}=state;
        const accountss = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.methods.create(ImgHash,name.current.value,desc.current.value,cate.current.value,0).send({from:accountss[0]});
        
        setFile(null);
        setFileName("no image selected");
      } catch (e) {
       console.log(e);
      }
    }
    alert("Successfully Image Uploaded");
    
  }
  const retrieveFile = (e) => {
    let data = e.target.files[0]; //files array of files object
    // console.log(data);
    console.log(data.type);
    if(data.type.slice(0,5) !== 'video')
    {
        console.log("error");
        alert("Please select a video file");
        data=null;
        e.target.value=null;
    }
    else{
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
        setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
    }
    e.preventDefault();
  };
  return (
    <div>
      {isloading?<></>:
        <div className='outAdd'>
        <div className='addTop'>
        <motion.div
            className="box"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <div className="file-field input-field">
            <h3 className='addImText'>Add Video<br /></h3>
            <div className="addFileText">
                <input
                type="file"
                required
                onChange={retrieveFile} />
            </div>
            <div className="fields">
                <label>Video Name:</label>
                <input className='videoname' ref={name} placeholder='Enter Video Name' type="text"  />
            </div>
            <div className="fields">
                <label>Video Description:</label>
                <textarea className="textf" ref={desc} placeholder="Enter Video Description" id="desc" />
            </div>
            <div className="fields">
                <label>Video Category:</label>
                <input className='videoname' ref={cate} placeholder='Enter category' />
            </div>
            <motion.div
                className="box"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <button disabled={viddone} onClick={submitOne} className='submitAdd'>Submit</button>
            </motion.div>
            </div></motion.div>

        </div>
        </div>}
    </div>
  )
}

export default Create