import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import './App.css';
import RestaurantList from './components/RestaurantList';
import firebase from 'firebase/app';
import 'firebase/database';
 
const firebaseConfig = {
  apiKey: "AIzaSyDsSEICDpy5rdeGGjzert7t1Ih4UTaNC4Q",
  authDomain: "teamie-ci.firebaseapp.com",
  databaseURL: "https://teamie-ci.firebaseio.com",
  projectId: "teamie-ci",
  storageBucket: "teamie-ci.appspot.com",
  messagingSenderId: "14675646015",
  appId: "1:14675646015:web:dd09bfe907cc9197ae4a8a"
};

firebase.initializeApp(firebaseConfig);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
    gridList: {
    width: "100%",
    height: 700,
  },
  card:{
    margin: 20,
  }
}));



const App = ({}) => {
  const [restaurants, setRestaurants] = useState({restaurants: []});
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const url = '/data/restaurants.json';
  const filteredUrl = '/data/restaurantsFiltered.json';

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setRestaurants(json);
    }
    fetchRestaurants();
  }, []);
  
  const classes = useStyles();

  return (
    <React.Fragment>
        <RestaurantList restaurants={restaurants.restaurants}
                        selectedRestaurants={selectedRestaurants}
                        setSelectedRestaurants={setSelectedRestaurants}/>
    </React.Fragment>
  );
}

export default App;