import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormPlay from '../components/FormPlay';
import ListCards from '../components/ListCards';
import ToastWinner from '../components/ToastWinner';
import { useNavigate } from 'react-router-dom';
import useGame from '../hooks/useGame';

const GamePage = () => {

	const navigate = useNavigate();
    const { idGame } = useGame();

    if (idGame === null) navigate('/');

	

	return (
		<>
			<Container className='my-4'>
				<Row className='justify-content-md-center'>
					<Col xs={16} md={16}>
						<FormPlay />
					</Col>
					<Col>
						<ListCards />
					</Col>
				</Row>
				<Row>
					<Col>
						<ToastWinner />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default GamePage;
