// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Chingari {
    struct video{
        string videoLink;
        string videoName;
        string videoDescription;
        uint256 videoPrice;
        bool listed;
        uint256 videoLikes;
        uint256 videoComments;
        string videoCategory;
        address[] likers;
        comment[] comments;
        address owner;
        uint256 revenue;
        address[] buyers;
        nftdet[] nftarr;
        uint256 royaltyPercent;
        uint256 ownPercent;
    }
    event success(string, string,uint);
    struct videonomap{
        string videoLink;
        string videoName;
        string videoDescription;
        uint256 videoPrice;
        bool listed;
        uint256 videoLikes;
        uint256 videoComments;
        string videoCategory;
        address[] likers;
        comment[] comments;
        address owner;
        uint256 revenue;
        address[] buyers;
        uint256 royaltyPercent;
        uint256 ownPercent;
    }
    struct comment{
        string line;
        address commenter;
        uint256 tip;
    }
    address[] creators;
    mapping (address => string[]) public vList;
    mapping(string => video) public linktoOwner;
    
    mapping(string=>bool) linkexist;

    //NFT vars
    struct nftdet{
        string videoLink;
        uint256 royaltyPercent;
        address owner;
        string name;
        bool onsell;
        uint256 id;
    }

    struct alisting{
        uint256 nftId;
        uint256 sprice;
        uint256 cprice;
        uint256 date;
        address powner;
        address cowner;
        bool corrupt;
        string date2;
    }
    struct dlisting{
        uint256 nftId;
        uint256 price;
        uint256 date;
        bool corrupt;
        string date2;
    }
    struct blisting{
        string videoLink;
        uint256 royaltyPercent;
        address owner;
        string name;
        bool onsell;
        uint256 id;
        uint256 price;
        uint256 date;
        bool corrupt;
        string date2;
    }
    struct auclisting{
        string videoLink;
        uint256 royaltyPercent;
        address owner;
        string name;
        bool onsell;
        uint256 nftId;
        uint256 sprice;
        uint256 cprice;
        uint256 date;
        address powner;
        address cowner;
        bool corrupt;
        string date2;
    }
    uint256 nftCount=0;
    uint256[] darray;
    uint256[] aarray;
    mapping(address => uint256[]) nft;
    mapping(uint256 => nftdet) nftDetails; 
    mapping(uint256 => alisting) nftaList;
    mapping(uint256 => dlisting) nftdList;


    // function ownDisplay(address _user)public view returns(videonomap[] memory){
    //     videonomap[] memory temp=new videonomap[](vList[_user].length);
        
    //     for(uint256 i=0;i<vList[_user].length;i++){
    //         temp[i].owner = linktoOwner[vList[_user][i]].owner;
    //         temp[i].videoLink = linktoOwner[vList[_user][i]].videoLink;
    //         temp[i].videoName = linktoOwner[vList[_user][i]].videoName;
    //         temp[i].videoDescription = linktoOwner[vList[_user][i]].videoDescription;
    //         temp[i].videoPrice = linktoOwner[vList[_user][i]].videoPrice;
    //         temp[i].listed = linktoOwner[vList[_user][i]].listed;
    //         temp[i].videoLikes = linktoOwner[vList[_user][i]].videoLikes;
    //         temp[i].videoComments = linktoOwner[vList[_user][i]].videoComments;
    //         temp[i].videoCategory = linktoOwner[vList[_user][i]].videoCategory;
    //         temp[i].likers = linktoOwner[vList[_user][i]].likers;
    //         temp[i].comments = linktoOwner[vList[_user][i]].comments;
    //         temp[i].revenue = linktoOwner[vList[_user][i]].revenue;
    //         temp[i].buyers = linktoOwner[vList[_user][i]].buyers;
    //         temp[i].royaltyPercent = linktoOwner[vList[_user][i]].royaltyPercent;
    //         temp[i].ownPercent = linktoOwner[vList[_user][i]].ownPercent;

    //     }
    //     return temp;
    // }
    function allSize()public view returns(uint256){
        uint256 k=0;
        for(uint256 i=0;i<creators.length;i++){
            for(uint256 j=0;j<vList[creators[i]].length;j++){
                k++;
            }
        }
        return k;
    }
 
    function allDisplay()public view returns(videonomap[] memory){
        uint256 siz=allSize();
        videonomap[] memory temp=new videonomap[](siz);
        uint256 k=0;
        for(uint256 i=0;i<creators.length;i++){
            for(uint256 j=0;j<vList[creators[i]].length;j++){
                temp[k].owner = linktoOwner[vList[creators[i]][j]].owner;
                temp[k].videoLink = linktoOwner[vList[creators[i]][j]].videoLink;
                temp[k].videoName = linktoOwner[vList[creators[i]][j]].videoName;
                temp[k].videoDescription = linktoOwner[vList[creators[i]][j]].videoDescription;
                temp[k].videoPrice = linktoOwner[vList[creators[i]][j]].videoPrice;
                temp[k].listed = linktoOwner[vList[creators[i]][j]].listed;
                temp[k].videoLikes = linktoOwner[vList[creators[i]][j]].videoLikes;
                temp[k].videoComments = linktoOwner[vList[creators[i]][j]].videoComments;
                temp[k].videoCategory = linktoOwner[vList[creators[i]][j]].videoCategory;
                temp[k].likers = linktoOwner[vList[creators[i]][j]].likers;
                temp[k].comments = linktoOwner[vList[creators[i]][j]].comments;
                temp[k].revenue = linktoOwner[vList[creators[i]][j]].revenue;
                temp[k].buyers = linktoOwner[vList[creators[i]][j]].buyers;
                temp[k].royaltyPercent = linktoOwner[vList[creators[i]][j]].royaltyPercent;
                temp[k].ownPercent = linktoOwner[vList[creators[i]][j]].ownPercent;
                k++;
            }
        }
        return temp;
    }
  
    function create(string memory link,string memory _name,string memory _desc,string memory _cate,uint256 val) public{
        
       require(linkexist[link]==false,"NFT already created for this video");
        bool already=false;
        for(uint256 i=0;i<creators.length;i++){
            if(creators[i]==msg.sender){
                already=true;
                break;
            }
        }
        if(!already){
            creators.push(msg.sender);
        }
        vList[msg.sender].push(link);
        linktoOwner[link].owner = msg.sender;
        linktoOwner[link].videoLink = link;
        linktoOwner[link].videoName = _name;
        linktoOwner[link].videoDescription = _desc;
        linktoOwner[link].videoCategory = _cate;
        linktoOwner[link].videoPrice = val;
        linktoOwner[link].videoLikes = 0;
        linktoOwner[link].listed=false;
        linktoOwner[link].videoComments = 0;
        linktoOwner[link].revenue = 0;  
        linktoOwner[link].ownPercent = 100;
        linktoOwner[link].royaltyPercent = 0;
        linkexist[link]=true;
    }
    function like(string memory link) public payable{
        linktoOwner[link].videoLikes++;
        linktoOwner[link].likers.push(msg.sender);
        linktoOwner[link].revenue += msg.value;
        payable(linktoOwner[link].owner).transfer(msg.value*linktoOwner[link].ownPercent/100);
        for(uint256 i=0;i<linktoOwner[link].nftarr.length;i++){
            payable(linktoOwner[link].nftarr[i].owner).transfer(msg.value*linktoOwner[link].nftarr[i].royaltyPercent/100);

        }
    }
    function newcomment(string memory link,string memory _comment) public{
        linktoOwner[link].videoComments++;
        comment memory nw;
        nw.line = _comment;
        nw.commenter = msg.sender;
        nw.tip = 0;
        linktoOwner[link].comments.push(nw);
    }
    function commentTip(string memory link,string memory _comment) public payable{
        linktoOwner[link].videoComments++;
        comment memory nw;
        nw.line = _comment;
        nw.commenter = msg.sender;
        nw.tip = msg.value;
        linktoOwner[link].comments.push(nw);
        linktoOwner[link].revenue += msg.value;
        payable(linktoOwner[link].owner).transfer(msg.value*linktoOwner[link].ownPercent/100);
        for(uint256 i=0;i<linktoOwner[link].nftarr.length;i++){
            payable(linktoOwner[link].nftarr[i].owner).transfer(msg.value*linktoOwner[link].nftarr[i].royaltyPercent/100);
        }
    }

    
    //nft creation
    function alist(uint256 id,uint256 price,uint256 date,string memory date2) public{
        require(nftDetails[id].owner==msg.sender,"You are not the owner of this NFT");
        require(nftDetails[id].onsell==false,"NFT already on sell");
        nftDetails[id].onsell=true;
        nftaList[id].nftId=id;
        nftaList[id].sprice=price;
        nftaList[id].cprice=price;
        nftaList[id].date=date;
        nftaList[id].powner=msg.sender;
        nftaList[id].cowner=msg.sender;
        nftaList[id].corrupt=false;
        nftaList[id].date2=date2;
        aarray.push(id);
    }
    function auctionBid(uint256 id,uint256 date) public payable{
        require(nftaList[id].corrupt==false,"NFT is corrupted");
        require(nftaList[id].sprice<msg.value,"Bid more than starting price");
        require(nftaList[id].cprice<msg.value,"Bid more than current price");
        require(nftaList[id].date>=date,"You are late");
        require(nftaList[id].powner!=msg.sender,"You are the owner of this NFT");
        if(nftaList[id].cowner!=nftaList[id].powner){
            payable(nftaList[id].cowner).transfer(nftaList[id].cprice);
        }
        nftaList[id].cprice=msg.value;
        nftaList[id].cowner=msg.sender;
    }
    function ashow() public view returns(auclisting[] memory){
        auclisting[] memory temp=new auclisting[](aarray.length);
        uint256 k=0;
        for(uint i=0;i<aarray.length;i++){
            if(nftaList[aarray[i]].corrupt==false){
                temp[k].videoLink=nftDetails[aarray[i]].videoLink;
                temp[k].royaltyPercent=nftDetails[aarray[i]].royaltyPercent;
                temp[k].owner=nftDetails[aarray[i]].owner;
                temp[k].name=nftDetails[aarray[i]].name;
                temp[k].onsell=nftDetails[aarray[i]].onsell;
                temp[k].nftId=nftaList[aarray[i]].nftId;
                temp[k].sprice=nftaList[aarray[i]].sprice;
                temp[k].cprice=nftaList[aarray[i]].cprice;
                temp[k].date=nftaList[aarray[i]].date;
                temp[k].powner=nftaList[aarray[i]].powner;
                temp[k].cowner=nftaList[aarray[i]].cowner;
                temp[k].corrupt=nftaList[aarray[i]].corrupt;
                temp[k].date2=nftaList[aarray[i]].date2;
                k++;
            }
        }
        return temp;
    }
    // function aownshow(address user)public view returns(auclisting[] memory){
    //     auclisting[] memory temp=new auclisting[](nftCount);
    //     uint256 k=0;
    //     for(uint256 i=0;i<nft[user].length;i++){
    //         for(uint256 j=0;j<aarray.length;j++){
    //             if(nft[user][i]==aarray[j] && nftaList[aarray[j]].corrupt==false){
    //                 temp[k].videoLink=nftDetails[nft[user][i]].videoLink;
    //                 temp[k].royaltyPercent=nftDetails[nft[user][i]].royaltyPercent;
    //                 temp[k].owner=nftDetails[nft[user][i]].owner;
    //                 temp[k].name=nftDetails[nft[user][i]].name;
    //                 temp[k].onsell=nftDetails[nft[user][i]].onsell;
    //                 temp[k].nftId=nftDetails[nft[user][i]].id;
    //                 temp[k].sprice=nftaList[nft[user][i]].sprice;
    //                 temp[k].cprice=nftaList[nft[user][i]].cprice;
    //                 temp[k].cowner=nftaList[nft[user][i]].cowner;
    //                 temp[k].powner=nftaList[nft[user][i]].powner;
    //                 temp[k].date=nftaList[nft[user][i]].date;
    //                 temp[k].corrupt=nftaList[nft[user][i]].corrupt;
    //                 temp[k].date2=nftaList[nft[user][i]].date2;
    //                 k++;
    //                 break;
    //             }
                
    //         }
    //     }
    //     return temp;
    // }
    function acancel(uint256 id) public{
        require(nftDetails[id].owner==msg.sender,"You are not the owner of this NFT");
        require(nftDetails[id].onsell==true,"NFT is not on sell");
        if(nftaList[id].cowner!=nftaList[id].powner){
            payable(nftaList[id].cowner).transfer(nftaList[id].cprice);
        }
        nftDetails[id].onsell=false;
        nftaList[id].corrupt=true;
        for(uint256 i=0;i<aarray.length;i++){
            if(aarray[i]==id){
                aarray[i]=aarray[aarray.length-1];
                aarray.pop();
                break;
            }
        }      
    }
    function aaccept(uint256 id,uint256 date) public{
        require(nftDetails[id].owner==msg.sender,"You are not the owner of this NFT");
        require(nftDetails[id].onsell==true,"NFT is not on sell");
        require(nftaList[id].cowner!=nftaList[id].powner,"You are the owner of this NFT");
        require(nftaList[id].corrupt==false,"Auction is over");
        require(nftaList[id].date<date,"Auction is not over yet");
        nftDetails[id].onsell=false;
        nftDetails[id].owner=nftaList[id].cowner;
        nftaList[id].powner=nftaList[id].cowner;
        payable(nftaList[id].powner).transfer(nftaList[id].cprice);
        nftaList[id].sprice=nftaList[id].cprice;
        nftaList[id].date=date;
        nftaList[id].corrupt=true;
        for(uint256 i=0;i<aarray.length;i++){
            if(aarray[i]==id){
                aarray[i]=aarray[aarray.length-1];
                aarray.pop();
                break;
            }
        }
        for(uint256 i=0;i<linktoOwner[nftDetails[id].videoLink].nftarr.length;i++){
            if(linktoOwner[nftDetails[id].videoLink].nftarr[i].id==id){
                linktoOwner[nftDetails[id].videoLink].nftarr[i].owner=msg.sender;
                break;
            }
        }
        for(uint256 i=0;i<nft[nftDetails[id].owner].length;i++){
            if(nft[nftDetails[id].owner][i]==id){
                nft[nftDetails[id].owner][i]=nft[nftDetails[id].owner][nft[nftDetails[id].owner].length-1];
                nft[nftDetails[id].owner].pop();
                break;
            }
        }
        nft[msg.sender].push(id);
    }
    function nftCreate(string memory link,uint256 percent,string memory name) public{
       require(linktoOwner[link].owner==msg.sender,"You are not the owner of this video");
       require(linktoOwner[link].ownPercent>=percent,"You cannot give more than you own");
            linktoOwner[link].ownPercent-=percent;
            linktoOwner[link].royaltyPercent+=percent;
            nft[msg.sender].push(nftCount);
            nftDetails[nftCount].videoLink = link;
            nftDetails[nftCount].id = nftCount;
            nftDetails[nftCount].royaltyPercent = percent;
            nftDetails[nftCount].owner = msg.sender;
            nftDetails[nftCount].onsell = false;
            nftDetails[nftCount].name = name;
            nftCount++;
            linktoOwner[link].nftarr.push(nftDetails[nftCount-1]);
            emit success(nftDetails[nftCount-1].name, nftDetails[nftCount-1].videoLink, nftDetails[nftCount-1].royaltyPercent);
    }
       function nftown(address user) public view returns(nftdet[] memory){
        nftdet[] memory temp = new nftdet[](nft[user].length);
        for(uint i=0;i<nft[user].length;i++){
            if(nftDetails[nft[user][i]].onsell==false){
                temp[i]=nftDetails[nft[user][i]];
            }
        }
        return temp;
    }
    // function downshow(address user)public view returns(blisting[] memory){
    //     blisting[] memory temp = new blisting[](nftCount);
    //     uint256 k=0;
    //     for(uint256 i=0;i<nft[user].length;i++){
    //         for(uint256 j=0;j<darray.length;j++){
    //             if(nft[user][i]==darray[j] && nftdList[darray[j]].corrupt==false){
    //                 temp[k].videoLink=nftDetails[nft[user][i]].videoLink;
    //                 temp[k].royaltyPercent=nftDetails[nft[user][i]].royaltyPercent;
    //                 temp[k].owner=nftDetails[nft[user][i]].owner;
    //                 temp[k].name=nftDetails[nft[user][i]].name;
    //                 temp[k].onsell=nftDetails[nft[user][i]].onsell;
    //                 temp[k].id=nftDetails[nft[user][i]].id;
    //                 temp[k].price=nftdList[nft[user][i]].price;
    //                 temp[k].date=nftdList[nft[user][i]].date;
    //                 temp[k].corrupt=nftdList[nft[user][i]].corrupt;
    //                 temp[k].date2=nftdList[nft[user][i]].date2;
    //                 k++;
    //                 break;
    //             }
    //         }
    //     }
    //     return temp;
    // }
    function dshow()public view returns(blisting[] memory){
        blisting[] memory temp = new blisting[](nftCount);
        uint256 k=0;
        for(uint256 i=0;i<darray.length;i++){
            if(nftdList[darray[i]].corrupt==false){
                temp[k].videoLink=nftDetails[darray[i]].videoLink;
                temp[k].royaltyPercent=nftDetails[darray[i]].royaltyPercent;
                temp[k].owner=nftDetails[darray[i]].owner;
                temp[k].name=nftDetails[darray[i]].name;
                temp[k].onsell=nftDetails[darray[i]].onsell;
                temp[k].id=nftDetails[darray[i]].id;
                temp[k].price=nftdList[darray[i]].price;
                temp[k].date=nftdList[darray[i]].date;
                temp[k].corrupt=nftdList[darray[i]].corrupt;
                temp[k].date2=nftdList[darray[i]].date2;
                k++;
            }
        }
        return temp;
    }
 
    function dlist(uint256 id,uint256 price,uint256 date,string memory date2)public {
        require(nftDetails[id].owner==msg.sender,"You are not the owner of this NFT");
        nftdList[id].nftId=id;
        nftdList[id].price=price;
        nftdList[id].date=date;
        nftdList[id].corrupt=false;
        nftdList[id].date2=date2;
        nftDetails[id].onsell=true;
        darray.push(id);
    }
    function dbuy(uint256 id,uint256 date)public payable{
        require(msg.sender!=nftDetails[id].owner,"You are the owner of this NFT");   
        require(nftdList[id].price<=msg.value,"Not the mentioned price");
        require(nftdList[id].date>=date,"You are late");
        require(nftdList[id].corrupt==false,"NFT already sold");
        nftdList[id].corrupt=true;
        payable(nftDetails[id].owner).transfer(msg.value);
        for(uint256 i=0;i<linktoOwner[nftDetails[id].videoLink].nftarr.length;i++){
            if(linktoOwner[nftDetails[id].videoLink].nftarr[i].id==id){
                linktoOwner[nftDetails[id].videoLink].nftarr[i].owner=msg.sender;
                break;
            }
        }
        for(uint256 i=0;i<nft[nftDetails[id].owner].length;i++){
            if(nft[nftDetails[id].owner][i]==id){
                nft[nftDetails[id].owner][i]=nft[nftDetails[id].owner][nft[nftDetails[id].owner].length-1];
                nft[nftDetails[id].owner].pop();
                break;
            }
        }
        
        nftDetails[id].owner=msg.sender;
        nftDetails[id].onsell=false;
        nft[msg.sender].push(id);
        for(uint256 i=0;i<darray.length;i++){
            if(darray[i]==id){
                darray[i]=darray[darray.length-1];
                darray.pop();
                break;
            }
        }
    }
    function dcancel(uint256 id)public {
        require(msg.sender==nftDetails[id].owner,"You are not the owner of this NFT");
        require(nftdList[id].corrupt==false,"NFT already sold/cancelled");
        nftDetails[id].onsell=false;
        nftdList[id].corrupt=true;
         for(uint256 i=0;i<darray.length;i++){
            if(darray[i]==id){
                darray[i]=darray[darray.length-1];
                darray.pop();
                break;
            }
        }        
    }
}
