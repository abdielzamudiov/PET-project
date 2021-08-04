import { SyntheticEvent } from 'react';
import { useRef } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const NavbarCustom: React.FC = () => {
  const { logout, username } = useAuth();

  const { theme, changeTheme } = useTheme();

  const history = useHistory()
  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const search = input?.current?.value || "";

    history.push(`/search/${search}`);
  };
  
  return (
    <Navbar collapseOnSelect expand="lg" bg={theme} variant={theme}>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => history.push('/home')}>Home</Nav.Link>
            {username && <Nav.Link onClick={() => history.push('/profile')}>My Profile</Nav.Link>}
            <NavDropdown title="Settings" id="collasible-nav-dropdown">
              {username && <NavDropdown.Item onClick={() => { logout() }}>Log Out</NavDropdown.Item>}
              <NavDropdown.Item onClick={() => { changeTheme() }}>Change Theme</NavDropdown.Item>
              {!username && <NavDropdown.Item onClick={() => history.push('/login')}>Login</NavDropdown.Item>}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        
        <Form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
          <FormControl
            ref={input} 
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            />
          <Button variant={ theme === 'dark' ? 'outline-light' : 'outline-dark'} style={{marginLeft: '2px'}} type="submit">Search</Button>
        </Form>
      </Container>
    </Navbar>
  )
}
