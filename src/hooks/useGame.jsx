import { useContext } from 'react';
import GameContext from '../context/GameContext';

const useGame = () => {
	return useContext(GameContext);
};

export default useGame;
