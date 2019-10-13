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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBar_header = () => {
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


const TeamMemberFilter = () => {
  

  return(
    <Paper>
      <Typography variant="h5" component="h3">Our Team Has:</Typography>
      <form class="filter">
        <TextField id="party-size" type="number" margin="normal" variant="outlined"></TextField>
      </form>
    </Paper>
  )
}

const BudgetFilter = () => {
  return(
    <Paper>
      <Typography variant="h5" component="h3">Our Budget Is:</Typography>
      <form class="filter">
        <TextField id="party-size" type="number" margin="normal" variant="outlined"></TextField>
      </form>

      <Button variant="contained">
        Average
      </Button>

      <Button variant="contained">
        Total
      </Button>
    </Paper>
  )
}

const TimeFilter = () => {
  return(
    <Paper>
      <Typography variant="h5" component="h3">We'd like to go during:</Typography>

      <Button variant="contained">
        Lunch 11:30AM-1:30PM
      </Button>

      <Button variant="contained">
        Dinner 5:30PM-7:30PM
      </Button>
    </Paper>
  )
}


  
const GridComponent = ({restaurants}) => {
  return (
    <div>
      <Grid container spacing={3}>
      <Grid item xs={4}>
          <TeamMemberFilter></TeamMemberFilter>
          <BudgetFilter></BudgetFilter>
          <TimeFilter></TimeFilter>
      </Grid>
      <Grid item xs={8}>
        <RestaurantList restaurants={restaurants}/>
      </Grid>
      </Grid>
      
    </div>
    
  )
}

const RestaurantList = ({restaurants}) => {
  
  return(
    <div>
      { restaurants.map(restaurant => <Restaurant key={restaurant.id} restaurant={ restaurant } />) }
    </div>

  )
}

const Restaurant = ({key, restaurant}) => {
  // const {name, price, tables, type} = this.props
  return(
    <div className="restaurant-card">
     <Grid container spacing={3}>
      <Grid item xs={10}>
   <h2>{restaurant.name}</h2>
   
   <h5>{restaurant.price} Lunch, Dinner</h5>
   <h5>Available Table Sizes: {restaurant.tables.map(size => <span>{size}, </span>)}</h5>
   <type>{restaurant.type}</type>
   <vegan>Vegan</vegan>
   <gltfree>Gluton Free</gltfree>
  </Grid>
  <Grid item xs={1}>
<img src={imgURL}/>
</Grid>
</Grid>
</div>
)}




const App = () => {
  const [restaurantsAll, setRestaurantsAll] = useState({restaurants: []});
  const url = '/data/restaurants.json';
  
  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setRestaurantsAll(json);
    }
    fetchRestaurants();
  }, [])
  
  const classes = useStyles();

  return (
    <div>
      <AppBar_header/>
      <GridComponent restaurants={restaurantsAll.restaurants}/>
    </div>
  );
}

export default App;