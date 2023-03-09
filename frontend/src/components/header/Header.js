import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import LinkContainer  from 'react-router-bootstrap/LinkContainer';
import { Store } from '../../store/Store';

export default function Header() {
  const {state, dispatch: myDispatch} = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const signoutHandler =(e)=> {
    e.preventDefault();
      localStorage.removeItem('userInfo');
      myDispatch({type: 'USER_SIGNOUT'});
      navigate('/login');
  }
  
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Twitter</Navbar.Brand>
          {userInfo ? (
            <Nav  className="justify-content-end">
              <NavDropdown title={userInfo.user_name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <Link 
                    className="dropdown-item"
                    onClick={signoutHandler}  
                  >
                    Sign out
                  </Link>
                </NavDropdown>
            </Nav>
          ):(
            <Nav  className="justify-content-end">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
          )
          }
          
        </Container>
      </Navbar>
    </header>
    
  )
}