const getIdGame = async () => {
	const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
	const res = await fetch(url);
	const data = await res.json();
	return data?.deck_id;
};

const valueCard = card => {
	let newCard = card;

	if (card === 'JACK') {
		newCard = '11';
	} else if (card === 'QUEEN') {
		newCard = '12';
	} else if (card === 'KING') {
		newCard = '13';
	} else if (card === 'ACE') {
		newCard = '1';
	}

	return newCard;
};

const getCards = async deckId => {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
	const res = await fetch(url);
	const data = await res.json();

	return [
		{
			...data.cards[0],
			newValue: valueCard(data.cards[0].value),
		},
		{
			...data.cards[1],
			newValue: valueCard(data.cards[1].value),
		},
	];
};

const getDeck = async deckId => {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=20`;
	const res = await fetch(url);
	const data = await res.json();

	return (
		data?.cards?.map(card => ({
			...card,
			newValue: valueCard(card.value),
		})) || []
	);
};

const DeckOfCardsAPI = {
	getIdGame,
	getCards,
	getDeck,
};

export default DeckOfCardsAPI;
