import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import PlayerCard from './components/PlayerCard';
import { Player } from './utils/Interfaces';

test('renders app', () => {
  render(<App />);
  const element = screen.getByTestId('app')
  expect(element).toBeInTheDocument();
});

test('renders no players card', () => {
   render(<App />);
   const element = screen.getByTestId('noPlayersCard')
   expect(element).toBeInTheDocument();
})

test('renders lebron card', () => {
   const props: Player = {  //ideally import from test-data.json
      id: 237,
      first_name: 'lebron',
      last_name: 'James',
      position: 'F',
      team :{
         id: 12345,
         name: 'lakers',
         conference: 'west',
         city: 'LA'
      }
   }
   render(<PlayerCard {...props} />);
   const element = screen.getByText(/lebron/i)
   expect(element).toBeInTheDocument();
})
