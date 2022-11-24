const getIdGame = async () => {
	const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
	const res = await fetch(url);
	const data = await res.json();
	return data?.deck_id;
};

const getCards = async deckId => {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.cards;
};

const DeckOfCardsAPI = {
	getIdGame,
	getCards,
};

export default DeckOfCardsAPI;
