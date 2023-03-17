import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './context/ThemeContext';
import CellsProvider from './context/CellsContext';
import GameStateProvider from './context/GameStateContent';

const root = document.getElementById('root') as HTMLDivElement;

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ThemeProvider>
			<GameStateProvider>
				<CellsProvider>
					<App />
				</CellsProvider>
			</GameStateProvider>
		</ThemeProvider>
  	</React.StrictMode>
);