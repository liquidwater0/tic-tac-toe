import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './context/ThemeContext';
import CellsProvider from './context/CellsContext';
import GameStateProvider from './context/GameStateContent';
import MenuProvider from './context/MenuContext';

const root = document.getElementById('root') as HTMLDivElement;

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ThemeProvider>
			<GameStateProvider>
				<CellsProvider>
					<MenuProvider>
						<App />
					</MenuProvider>
				</CellsProvider>
			</GameStateProvider>
		</ThemeProvider>
  	</React.StrictMode>
);