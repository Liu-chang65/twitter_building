import { Container, Row, Col } from 'react-bootstrap';
import LeftSidebar from '../components/leftsidebar/LeftSidebar';

export default function Notification() {

    return (
        <Row>
            <Col sm={3} className="bg-dark py-3">
                <LeftSidebar />
            </Col>
            <Col sm={9} className="content-contain text-white p-3">
                Notification page
            </Col>
        </Row>
    )
}