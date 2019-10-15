import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import imgURL from './images/rest1.jpg';
import './App.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';

import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAFzpavaaS5qMRo8FSZsqsZAaglgXL8H04",
  authDomain: "teamie-blue.firebaseapp.com",
  databaseURL: "https://teamie-blue.firebaseio.com",
  projectId: "teamie-blue",
  storageBucket: "teamie-blue.appspot.com",
  messagingSenderId: "373175945503",
  appId: "1:373175945503:web:0ce516f07c5d387642882a"
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

const AppBar_header = ({}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Teamie
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const TeamMemberFilter = ({numPeople, setNumPeople}) => {
  const classes = makeStyles(theme => ({
    TextField: {
      width: '20px',
    }
  }));
  // function handle

  return(
    <Paper>
      <Typography variant="h5" component="h3">Party Size:</Typography>
      <form class="filter">
        <TextField onChange={(e) => setNumPeople(e.target.value)} id="party-size" className={classes.textField} margin="normal"></TextField>
      </form>
    </Paper>
  )
}

const BudgetFilter = ({budget, setBudget}) => {
  return(
    <Paper>
      <Typography variant="h5" component="h3">Party Budget:</Typography>
      <form class="filter">
        <TextField onChange={(e) => setBudget(e.target.value)} id="party-budget" margin="normal"></TextField>
      </form>
        
    </Paper>
  )
}

const TimeFilter = ({selectedTime, setSelectedTime, filterOnOff, setFilterOnOff, setRestaurantsAll, filteredRestaurants}) => {
  const handleOnClick = (time) => {
    console.log("filtering")
    setSelectedTime(time);
    setFilterOnOff(!filterOnOff);
    setRestaurantsAll(filteredRestaurants);
  }

  return(
    <Paper>
      <Typography variant="h5" component="h3">We'd like to go during:</Typography>

      <Button onClick={(e) => handleOnClick("11:30-1:30")} variant="contained">
        Lunch 11:30AM-1:30PM
      </Button>

      <Button onClick={(e) => handleOnClick("5:30-7:30")} variant="contained">
        Dinner 5:30PM-7:30PM
      </Button>
    </Paper>
  )
}

const Poll = ({pollRests}) => {
  const classes = useStyles()
  //const [pollRests, setPollRests] = useState([]);
  
  return(
    <div>
      <Typography variant="h5" component="h3">Poll</Typography>
<Card className={classes.card}>
  
  <Typography>Selected Restaurant 1</Typography>

</Card>
<Card className={classes.card}>
  <Typography>Selected Restaurant 2</Typography>
 
</Card>
 </div>
    
  )
}
  
const GridComponent = ({filterOnOff, setFilterOnOff, selectedTime, setSelectedTime, budget, setBudget, numPeople, setNumPeople, restaurants, setRestaurantsAll, filteredRestaurants}) => {
  return (
    <div>
      <Grid container spacing={10}>
      <Grid item xs={1}></Grid>
      <Grid item xs={4}>
          <TeamMemberFilter numPeople={numPeople} setNumPeople={setNumPeople}></TeamMemberFilter>
          <BudgetFilter budget={budget} setBudget={setBudget}></BudgetFilter>
          <TimeFilter filterOnOff={filterOnOff} setFilterOnOff={setFilterOnOff} setRestaurantsAll={setRestaurantsAll} filteredRestaurants={filteredRestaurants}
          selectedTime={selectedTime} setSelectedTime={setSelectedTime}></TimeFilter>
          <br/>
          {/* <Poll></Poll> */}
          <Button variant="contained" color="primary">Send out poll</Button>
      </Grid>
      <Grid item xs={6}>
        <RestaurantList restaurants={restaurants}/>
      </Grid>
      <Grid item xs={1}></Grid>
      </Grid>
      
    </div>
    
  )
}

const RestaurantList = ({restaurants}) => {
  const classes = useStyles()
  
  return(
    
    <GridList className={classes.gridList}>
        <GridListTile cols={2} style={{ height: 'auto' }}>
        { restaurants.map(restaurant => <Restaurant key={restaurant.id} restaurant={ restaurant } />) }
        </GridListTile>
      </GridList>
  )
}



const Restaurant = ({key, restaurant}) => {
  // const {name, price, tables, type} = this.props
  
  const [btnToggle, toggleBtn] = useState(false);
  const [btnColor, setBtnColor] = useState("default");

  const handleClick = () => {
    const btnToggleState = !btnToggle;
    if (btnToggle) {
      setBtnColor("default");
    }
    else {
      setBtnColor("primary");
    }
    toggleBtn(btnToggleState);
  }

  return(
    <div className="restaurant-card">
     <Grid container spacing={3}>
      <Grid item xs={8}>
   <h2>{restaurant.name}</h2>
   
   <h5>{restaurant.price} Lunch, Dinner Available Table Sizes: {restaurant.tables.map(size => <span>{size}, </span>)}</h5>
   <type>{restaurant.type}</type>
   <vegan>Vegan</vegan>
   <gltfree>Gluton Free</gltfree>
  </Grid>
  
  <Grid item xs={3}>
<img src={imgURL}/>
<Chip label="Add to list" clickable color={btnColor} onClick={handleClick}/>
</Grid>

</Grid>

</div>
)}


const App = ({}) => {
  const [restaurantsAll, setRestaurantsAll] = useState({restaurants: []});
  const url = '/data/restaurants.json';
  const filteredUrl = '/data/restaurantsFiltered.json';
  const [filteredRestaurants, setFilteredRestaurants] = useState({restaurants: []})
  
  //filter
  const [numPeople, setNumPeople] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  //garbage
  const [filterOnOff, setFilterOnOff] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setRestaurantsAll(json);
    }
    const fetchFilteredRestaurants = async () => {
      const response = await fetch(filteredUrl);
      if (!response.ok) throw response;
      const json = await response.json();
      setFilteredRestaurants(json);
    }
    fetchRestaurants();
    fetchFilteredRestaurants();
  }, [])
  

  const classes = useStyles();

  return (
    <div>
      <AppBar_header/>
      <GridComponent 
      filterOnOff={filterOnOff}
      setFilterOnOff={setFilterOnOff}
      budget={budget} 
      setBudget={setBudget} 
      numPeople={numPeople} 
      setNumPeople={setNumPeople} 
      selectedTime={selectedTime}
      setSelectedTime={setSelectedTime}
      filteredRestaurants={filteredRestaurants}
      setRestaurantsAll={setRestaurantsAll}
      restaurants={restaurantsAll.restaurants}
      // restaurants={(filterOnOff) ? filteredRestaurants.restaurants : restaurantsAll.restaurants}
      />
    </div>
  );
}

export default App;