import Container from 'react-bootstrap/Container';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Nave({state}) {
  const [acc,setacc]=React.useState(null);
  const { ethereum } = window;
  React.useEffect(() => {
    async function template() {
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    setacc(accountss[0]);
  }
  template();
  },[state,ethereum]);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Chingari</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/nft">NFT marketplace</Nav.Link>
            <Nav.Link href="/yourNft">Your NFT collection</Nav.Link>
            <Nav.Link href="/yourAccount">Your account</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.3">Account address: {(acc===null)?<div>0x00</div>:<div>{acc.slice(0,5)}...{acc.slice(38)}</div>}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="https://www.coinbase.com/price/polygon" target="_blank">
                Buy/Sell MATIC
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nave;