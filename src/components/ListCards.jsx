import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import useGame from '../hooks/useGame';

const ListCards = () => {
	const { playerOne, playerTwo } = useGame();

	return (
		<Container>
			<Col>
				<Col>
					<div className='align-items-center'>
						<h4>Player {playerOne.name}</h4>
						<p>Cards obtained</p>
						{playerOne.cards
							.sort((a, b) => a.newValue - b.newValue)
							.map((card, index) => (
								<img
									className='col-sm-2 col-lg-1 mx-2 my-2'
									key={index}
									src={card.image}
									alt={card.value}
								/>
							))}
					</div>
				</Col>
				<Col>
					<div className='align-items-center'>
						<h4>Player {playerTwo.name}</h4>
						<p>Cards obtained</p>
						{playerTwo.cards
							.sort((a, b) => a.newValue - b.newValue)
							.map((card, index) => (
								<img
									className='col-sm-2 col-lg-1 mx-2 my-2'
									key={index}
									src={card.image}
									alt={card.value}
								/>
							))}
					</div>
				</Col>
			</Col>
		</Container>
	);
};

export default ListCards;
