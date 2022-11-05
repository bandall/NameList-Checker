import { Button, Container, Nav, Navbar} from 'react-bootstrap';
function Navibar({loggedIn}) {   
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    후원품 명단 작성 서버
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" style={{color: "red"}}>추가 및 검색</Nav.Link>
                        </Nav>
                        <Nav className="me-auto">
                            <Nav.Link href="/list" style={{color: "blue"}}>수령자 리스트</Nav.Link>
                        </Nav>
                        <Nav>
                            {!loggedIn ? 
                                <Nav>
                                    <a href='/login'><Button variant="primary" style={{marginLeft: "16px"}}> 로그인 </Button>{' '}</a>
                                </Nav>
                                :
                                <Nav>
                                    <a href='/logout'><Button variant="primary" style={{marginLeft: "16px"}}> 로그아웃 </Button>{' '}</a>
                                </Nav>
                            }
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navibar;