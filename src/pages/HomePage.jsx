import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLogin from '../components/FormLogin';
const HomePage = () => {
	return (
		<>
			<Container className='my-4'>
				<Row className='justify-content-md-center'>
					<Col xs={16} md={16}>
						<FormLogin />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default HomePage;
