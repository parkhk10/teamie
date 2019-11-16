import React from 'react';
import {render, fireEvent} from '@testing-library/react';
// import {toHaveAttribute} from '@testing-library/jest-dom';
import Restaurant from './Restaurant';

test('Restaurant should render passed states to display restaurant cards', () => {
    // render set-up
    let key = "1"
    let restaurant = {id: "1", name: "Koco Table", type: "Korean", price: 14, start: "1100", end: "1350",
                      tables: [2, 4, 6, 10], party_size: ["small", "medium", "large"], vibes: ["happy_hour", "good_for_clients", "family_friendly", "team_bonding"]}
    let selectedRestaurants = [];
    let setSelectedRestaurants = jest.fn();

    const {getByTestId} = render(<Restaurant key={key} restaurant={restaurant}
                                               selectedRestaurants={selectedRestaurants}
                                               setSelectedRestaurants={setSelectedRestaurants}/>);
    
    // assertion 1: render
    expect(getByTestId("restaurant1").textContent).toBe("Koco Table");
  
    // assertion 2: interaction
    fireEvent.click(getByTestId("addToPoll"));
    expect(setSelectedRestaurants).toHaveBeenCalledWith([restaurant]);
    expect(setSelectedRestaurants).toHaveBeenCalledTimes(1);
    // expect(getByTestId("addToPoll").toHaveAttribute("color", "primary"));
    // expect(getByTestId("addToPoll").textContent).toBe("Add to list");
  })