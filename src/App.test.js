import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import data from './data.json';



test('app loads', () => {
  const app = render(<App />);
  expect(app).toBeTruthy()
});

test('address menu item exists', async () => {
  const { getByText } = render(<App />);
  await waitFor(()=>{
    expect(getByText("Address Book")).toBeTruthy()
  }) 
});

test('number of cards equal to data entries', async () => {

  const { getByTestId } = render(<App />);
  await waitFor(()=>{
    const addressButton = getByTestId("__test-show-addresses");
    fireEvent.click(addressButton);
    const cards = screen.getAllByRole('li');
    expect(data['addresses'].length).toBe(cards.length)
  })
});
