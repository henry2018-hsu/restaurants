import Card from 'react-bootstrap/Card';
function About() {
    return (
        <Card style={{ width: '50rem' }}>
            <Card.Body>
                <Card.Title>Restaurant List</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Full list of restaurants. Optionally sorted by borough</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default About;