import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { TfiGame } from 'react-icons/tfi';

const Header = () => {
	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand>
					<div className='d-inline-block align-top'>
						<TfiGame />
					</div>{' '}
					Deck Of Cards Game
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
