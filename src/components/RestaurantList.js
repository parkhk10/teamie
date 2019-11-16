import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import imgURL from '../images/rest1.jpg';
import '../App.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { positions } from '@material-ui/system';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import Restaurant from './Restaurant';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,

  },

  title: {
    flexGrow: 1,
  },
    gridList: {
    width: "100%",
  },
  card:{
    margin: 20,
  },
  paper: {
   // background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    position: "fixed",
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginTop:'200px',
    margin: theme.spacing(2),
  },
  }));

  const Poll = ({selectedRestaurants}) => {
    const classes = useStyles();
    const handleClick = () => {
      const urlCode = selectedRestaurants.map(r => r.id).toString();
      window.location.href = "/voting/" + urlCode;
    }
    
    return(
      <div>
        <Typography variant="h5" component="h3">Poll</Typography>
        <GridList>
          <GridListTile>

            {
              selectedRestaurants.map( (r) => 
              <Card className={classes.card}><Typography>{r.name}</Typography></Card>
              )
            }
          
  
          </GridListTile>
        </GridList>
  
  
    <Button onClick={handleClick} variant="contained" color="primary">Send out Poll</Button>
   </div>
      
    )
  }

const AppBar_header =  ({numPeople, setNumPeople, setBudget, setVibe}) => {
  const classes = useStyles()

  return (
    <div>
      <AppBar position="fixed" color="inherit">
      <Container>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            travissss!!!
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        </Container>
        <Container>
        <Toolbar>
        <Grid container>
        <Grid item xs={3}>
        <AmbienceFilter setVibe={setVibe}></AmbienceFilter>
        </Grid>
<Grid item xs={2}>
        <TeamMemberFilter state={{numPeople, setNumPeople}}></TeamMemberFilter>
          </Grid>
          <Grid item xs={2}>
            <BudgetFilter setBudget={setBudget}></BudgetFilter>
            </Grid> 
            <Grid item xs={3}>
              <DateFilter></DateFilter>
          </Grid> 

            <Grid item xs={2}>
              <TimeFilter></TimeFilter>
          </Grid> 
          
          </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

const TeamMemberFilter = ({state}) => {
    const classes = makeStyles(theme => ({
      TextField: {
        width: '20px',
      }
    }));
  
    return(    
        <form class="filter">
        <TextField
        id="standard-with-placeholder"
        label="Our team has"
        placeholder="Number of members"
        className={classes.textField}
        margin="normal"
        onChange={(e) => state.setNumPeople(e.target.value)} id="party-size" className={classes.textField} margin="normal"></TextField>
        </form>
    )
}

const BudgetFilter = ({setBudget}) => {
  const classes = useStyles()
    return(       
        <form class="filter">
        <TextField id="standard-with-placeholder"
        label="We have"
        placeholder="$ budget"
        className={classes.textField}
        margin="normal"
        onChange={(e) => setBudget(e.target.value)} id="party-budget" margin="normal"></TextField>
        </form> 
    )
  }

const TimeFilter = ({state}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
  });
  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };
  
  const inputLabel = React.useRef(null);
    const handleOnClick = (time) => {
        console.log("filtering")
        // setSelectedTime(time);
        state.setFilterOnOff(!state.filterOnOff);
        // setFilteredRestaurants(filteredData);
    }
    // onClick={(e) => handleOnClick("11:30-1:30")}

    return(
      <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">During</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={10}>Lunch 11:30AM-1:30PM</MenuItem>
          <MenuItem value={20}>Dinner 5:30PM-7:30PM</MenuItem>
          
        </Select>
      </FormControl>
      </form>   
    )
}
const AmbienceFilter = ({setVibe}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
  });

  const inputLabel = React.useRef(null);


  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    setVibe(event.target.name);
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">The vibe we want</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={10}>Happy Hour</MenuItem>
          <MenuItem value={20}>Good for clients</MenuItem>
          <MenuItem value={20}>Family Friendly</MenuItem>
          <MenuItem value={20}>Internal team bonding</MenuItem>
          
        </Select>
      </FormControl>
      </form>
      )
}
 
const DateFilter = ({filterOnOff, setFilterOnOff}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
  });

  const inputLabel = React.useRef(null);


  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">We would like to go on</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={10}>Next 5 workdays</MenuItem>
          <MenuItem value={20}>Next 7 workdays</MenuItem>
          
        </Select>
      </FormControl>
      </form>
      )
}

const RestaurantList = ({restaurants, selectedRestaurants, setSelectedRestaurants}) => {
    const [numPeople, setNumPeople] = useState("");
    const [budget, setBudget] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [vibe, setVibe] = useState("");
    const classes = useStyles();
    const filteredRestaurants = restaurants.filter((r) => {
      let filter_or_not = false;
      if ((budget === "") || (parseFloat(r.price) <= parseFloat(budget)))
      {
        filter_or_not = true;
      }
      const restaurantVibes = [r.happy_hour, r.good_for_clients, r.family_friendly, r.team_bonding];
      if ((vibe === "") || (restaurantVibes.map(r => r === vibe).reduce((a,v) => a || v)))
      {
        filter_or_not = true;
      }
      
      
      return filter_or_not;
    }); // this will re-render because of the changes in filter attributes which are states (time, etc)
  
    return(
        <React.Fragment>
          <AppBar_header numPeople={numPeople} setNumPeople={setNumPeople} 
                          setBudget={setBudget}
                          setVibe={setVibe} />
          <div className='list'>
            <Container>
            <Grid container spacing={10}>
                

                {/* <Grid item xs={4}>
                    <TeamMemberFilter state={{numPeople, setNumPeople}}></TeamMemberFilter> 
                    <BudgetFilter setBudget={setBudget}></BudgetFilter>
                    <TimeFilter state={{filterOnOff, setFilterOnOff}}></TimeFilter>
                    <br/>
                    <Button variant="contained" color="primary">Send out Poll</Button>
                </Grid> */}

                <Grid item xs={6}>
                    {filteredRestaurants.map(r => {
                      console.log("r.id: " + (r.id).toString());
                      return(
                    <Restaurant key={(r.id).toString()} 
                                        restaurant={r}
                                        selectedRestaurants={selectedRestaurants}
                                        setSelectedRestaurants={setSelectedRestaurants}
                    />)})}
                </Grid>

                <Grid item xs={6}>
                <Paper className={classes.paper}>

          
<Poll selectedRestaurants={selectedRestaurants}></Poll>

</Paper>
                </Grid>
            </Grid>
            </Container>
          </div>
        </React.Fragment>
    )
}

export default RestaurantList;