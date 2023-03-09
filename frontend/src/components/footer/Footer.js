import { Container,Navbar, Row, Col } from 'react-bootstrap';
export default function Footer() {

    return (
        <footer >
            <Container fluid  className='bg-dark p-3'>
                <Row>
                    <Col className='text-center text-white'>
                        <span className="text-center">©2023 Copyright</span>
                    </Col>
                </Row>
            
            </Container>           
        </footer>
    )
}