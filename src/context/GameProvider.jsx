import { useEffect, useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null);
	const [, /* win */ setWin] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');

	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: [],
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
	});

	const getSameValueCards = player => {
		const cards = player.cards;
		const sameValueCards = [];

		cards.forEach((card, index) => {
			const findCard = cards.find(
				(cardFind, indexFind) =>
					cardFind.value === card.value && index !== indexFind
			);

			if (findCard) {
				sameValueCards.push(findCard);
			}
		});

		return sameValueCards;
	};
	
	const findCardPlayerOne = () => {
		if (getSameValueCards(playerOne).length === 10) {
			return true;
		} else {
			return false;
		}
	};

	const findCardPlayerTwo = () => {
		if (getSameValueCards(playerTwo).length === 10) {
			return true;
		} else {
			return false;
		}
	};

	const playGame = async () => {
		setIdGame(await DeckOfCardsAPI.getIdGame());
	};

	const requestCards = async () => {
		const cards = await DeckOfCardsAPI.getCards(idGame);

		const cardDeletePlayerOne = playerOne.cards.map(
			card => card.newValue
		)  

		console.log(cardDeletePlayerOne) 
		
		setPlayerOne({ ...playerOne, cards: [...playerOne.cards, cards[0]] });
		setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, cards[1]] });

		if (findCardPlayerOne()) {
			console.log('Ganador: ', playerOne.name);
			setWin(true);
			setShowToast(true);
			setWinName(playerOne.name);
		}

		if (findCardPlayerTwo()) {
			console.log('Ganador: ', playerTwo.name);
			setWin(true);
			setShowToast(true);
			setWinName(playerTwo.name);
		}
	};

	useEffect(() => {
		DeckOfCardsAPI.getDeck(idGame)
			.then(res => {
				const cards = res;
				const cardsPlayerOne = [];
				const cardsPlayerTwo = [];

				cards.forEach((card, index) => {
					if (index % 2 === 0) {
						cardsPlayerOne.push(card);
					} else {
						cardsPlayerTwo.push(card);
					}
				});

				setPlayerOne({ ...playerOne, cards: cardsPlayerOne });
				setPlayerTwo({ ...playerTwo, cards: cardsPlayerTwo });
			})
			.catch(err => console.log(err));
	}, [idGame]);

	return (
		<GameContext.Provider
			value={{
				playGame,
				requestCards,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				showToast,
				setShowToast,
				winName,
				idGame,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
