import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { TfiGame } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import useGame from '../hooks/useGame';

const FormLogin = () => {
	const { playerOne, setPlayerOne, playerTwo, setPlayerTwo, playGame } =
		useGame();
	const [validated, setValidated] = useState(false);
	const navigate = useNavigate();

	const handlerInputPlayerOne = e => {
		setPlayerOne({ ...playerOne, name: e.target.value });
	};
	const handlerInputPlayerTwo = e => {
		setPlayerTwo({ ...playerTwo, name: e.target.value });
	};
	const handleSubmit = async event => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			console.log(form);
		} else {
			await playGame();
			navigate('/game', { replace: true });
		}
		setValidated(true);
	};
	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Row className='mb-3'>
				<Form.Group as={Col} md='4' controlId='validationCustomPlayerOne'>
					<Form.Label>Player One</Form.Label>
					<InputGroup hasValidation>
						<InputGroup.Text id='inputGroupPrepend'>
							<TfiGame />
						</InputGroup.Text>
						<Form.Control
							type='text'
							placeholder='Player One'
							aria-describedby='inputGroupPrepend'
							value={playerOne.name}
							onChange={handlerInputPlayerOne}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							Please choose a Player One.
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
				<Form.Group as={Col} md='4' controlId='validationCustomPlayerTwo'>
					<Form.Label>Player Two</Form.Label>
					<InputGroup hasValidation>
						<InputGroup.Text id='inputGroupPrepend'>
							<TfiGame />
						</InputGroup.Text>
						<Form.Control
							type='text'
							placeholder='Player Two'
							aria-describedby='inputGroupPrepend'
							required
							value={playerTwo.name}
							onChange={handlerInputPlayerTwo}
						/>
						<Form.Control.Feedback type='invalid'>
							Please choose a Player Two.
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
			</Row>
			<Button type='submit'>Login</Button>
		</Form>
	);
};

export default FormLogin;
