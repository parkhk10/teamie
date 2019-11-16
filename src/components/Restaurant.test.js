import React from 'react';
import {render, fireEvent} from '@testing-library/react'
import Restaurant from './Restaurant';

test('Restaurant should render passed states to display restaurant cards', () => {
  
    let key = "1"
    let restaurant = {id: "1", name: "Koco Table", type: "Korean", price: 14, start: "1100", end: "1350",
                      tables: [2, 4, 6, 10], party_size: ["small", "medium", "large"], vibes: ["happy_hour", "good_for_clients", "family_friendly", "team_bonding"]}
    let selectedRestaurants = [];
    let setSelectedRestaurants = jest.fn()

    const {getByTestId} = render(<Restaurant key={key} restaurant={restaurant}
                                               selectedRestaurants={selectedRestaurants}
                                               setSelectedRestaurants={setSelectedRestaurants}/>)
  
    expect(getByTestId("restaurant1").textContent).toBe("Koco Table");
  
    // fireEvent.click(getByTestId('markAsCompleted'))
    // expect(markTodoDone).toBeCalledWith(itemIndex)
    // expect(markTodoDone).toHaveBeenCalledTimes(1)
  
    // fireEvent.click(getByTestId('markAsDeleted'))
    // expect(removeItem).toBeCalledWith(itemIndex)
    // expect(removeItem).toHaveBeenCalledTimes(1)
  })