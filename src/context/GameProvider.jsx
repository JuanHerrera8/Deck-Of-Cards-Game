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
		cards: []
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: []
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
		let cardDeletedOne = 0;
		let cardDeletedTwo = 0;

		const cardDeletePlayerOne = () => {
			 for (let index = 0; index <= playerOne.cards.length; index++) {
				if (index === 0) {
					if (
						playerOne.cards[index + 1].newValue !== playerOne.cards[index].newValue &&
						playerOne.cards[9].newValue !== playerOne.cards[index].newValue &&
						playerOne.cards[index].newValue !== cards[0].newValue
					) {
						console.log(
							'Valores son diferentes',
							playerOne.cards[index].newValue,
							'y',
							playerOne.cards[9].newValue,
							'y',
							cards[0].newValue
						);
						cardDeletedOne = playerOne.cards[index].newValue;
						break;
					} else {
						console.log('Tiene un vecino o el que llega es parecido.');
					}
				} else if (index === 9) {
					if (
						playerOne.cards[index - 1].newValue !==playerOne.cards[index].newValue &&
						playerOne.cards[0].newValue !== playerOne.cards[index].newValue &&
						cards[0] !== playerOne.cards[index].newValue
					) {
						console.log(
							'Valores son diferentes',
							playerOne.cards[index].newValue,
							'y',
							playerOne.cards[0].newValue,
							'y',
							cards[0].newValue
						);
						cardDeletedOne = playerOne.cards[index].newValue;
						break;
					} else {
						console.log('Tiene un vecino o el que llega es parecido.');
					}
				} else {
					if (
						playerOne.cards[index + 1].newValue !== playerOne.cards[index].newValue &&
						playerOne.cards[index - 1].newValue !== playerOne.cards[index].newValue &&
						playerOne.cards[index].newValue !== cards[0].newValue
					) {
						console.log(
							'Valores son diferentes',
							playerOne.cards[index].newValue,
							'y',
							playerOne.cards[index + 1].newValue,
							'y',
							cards[0].newValue
						);
						cardDeletedOne = playerOne.cards[index].newValue;
						break;
					} else {
						console.log('Tiene un vecino o el que llega es parecido.');
					}
				}
			}
		};

		const cardDeletePlayerTwo = () => {
			for (let index = 0; index <= playerTwo.cards.length; index++) {
				if (index === 0) {
					if (
						playerTwo.cards[index + 1].newValue !== playerTwo.cards[index].newValue &&
						playerTwo.cards[9].newValue !== playerTwo.cards[index].newValue &&
						playerTwo.cards[index].newValue !== cards[0].newValue
					) {
						console.log(
							'Valores son diferentes',
							playerTwo.cards[index].newValue,
							'y',
							playerTwo.cards[9].newValue,
							'y',
							cards[1].newValue
						);
						cardDeletedTwo = playerTwo.cards[index].newValue;
						break;
					} else {
						console.log('Tiene un vecino o el que llega es parecido.');
					}
				} else if (index === 9) {
					if (
						playerTwo.cards[index - 1].newValue !== playerTwo.cards[index].newValue &&
						playerTwo.cards[0].newValue !== playerTwo.cards[index].newValue &&
						cards[1] !== playerTwo.cards[index].newValue
					) {
						console.log(
							'Valores son diferentes',
							playerTwo.cards[index].newValue,
							'y',
							playerTwo.cards[0].newValue,
							'y',
							cards[1].newValue
						);
						cardDeletedTwo = playerTwo.cards[index].newValue;
						break;
					} else {
						console.log('Tiene un vecino o el que llega es parecido.');
					}
				} else {
					if (
						playerTwo.cards[index + 1].newValue !== playerTwo.cards[index].newValue &&
						playerTwo.cards[index - 1].newValue !== playerTwo.cards[index].newValue &&
						playerTwo.cards[index].newValue !== cards[1].newValue
					) {
						console.log(
							'Valores son diferentes',
							playerTwo.cards[index].newValue,
							'y',
							playerTwo.cards[index + 1].newValue,
							'y',
							cards[1].newValue
						);
						cardDeletedTwo = playerTwo.cards[index].newValue;
						break;
					} else {
						console.log('Tiene un vecino o el que llega es parecido.');
					}
				}
			}
		};

		cardDeletePlayerOne();
		cardDeletePlayerTwo();

		const cardsSelectedsOne = playerOne.cards.filter(
			card => card.newValue !== cardDeletedOne
		);
		const cardsSelectedsTwo = playerTwo.cards.filter(
			card => card.newValue !== cardDeletedTwo
		);

		setPlayerOne({ ...playerOne, cards: [...cardsSelectedsOne, cards[0]] });
		setPlayerTwo({ ...playerTwo, cards: [...cardsSelectedsTwo, cards[1]] });

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
