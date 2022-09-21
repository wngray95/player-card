import { Component } from "react";
import { Player } from "../utils/Interfaces";
import { getAverageGamesPlayed } from "../utils/API";
import { List, ListItem, Typography, Grid, Card, CardContent, CardMedia, ListSubheader, Avatar } from "@mui/material";
import { green, red } from "@mui/material/colors";

interface PlayerCardProps extends Player {}

interface State {
   avgGames: {
      over50: number,
      underOrEqual50: number
   } | null;
}

export default class PlayerCard extends Component<PlayerCardProps, State> {
   constructor(props: PlayerCardProps) {
      super(props);
      this.state = {
         avgGames: null
      };
   }

   async componentDidMount() {
      const { id } = this.props;
      const averages = await getAverageGamesPlayed(id, 2014, 2020);
      this.setState({ avgGames: averages });
   }

   render() {
      const { id, first_name, last_name, position, height_feet, height_inches } = this.props;
      const { name, city } = this.props.team;
      const { avgGames } = this.state;

      return (
         <Grid item key={id} xs={12} sm={6} md={4}>
            <Card>
               <CardMedia
                  component='img'
                  image={
                     id === 237
                        ? "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
                        : "https://cdn.nba.com/manage/2022/08/nba-ball-general-view-iso.jpg?w=384&h=224"
                  } // replace with specific player headshot
                  alt='player headshot'
               />
               <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                     {first_name} {last_name}
                  </Typography>
                  <Typography gutterBottom>
                     {city} {name} | {position} {(height_feet && height_inches) && `| ${height_feet}' ${height_inches}"`}
                  </Typography>
                  {avgGames && (
                     <List>
                        <ListSubheader>Games Played (2014-2020)</ListSubheader>
                        <ListItem>
                           <Avatar sx={{ bgcolor: green[500] }}>{'>50'}</Avatar>
                           &nbsp;&nbsp;{avgGames.over50} season{avgGames.over50 > 1 ? "'s" : ""}</ListItem>
                        <ListItem>
                           <Avatar sx={{ bgcolor: red[500] }}>{'<50'}</Avatar>
                            &nbsp;&nbsp;{avgGames.underOrEqual50} season{avgGames.underOrEqual50 > 1 ? "'s" : ""}</ListItem>
                     </List>
                  )}
               </CardContent>
            </Card>
         </Grid>
      );
   }
}
