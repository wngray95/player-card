import React, { useEffect, useState } from "react";
import "./App.css";
import PlayerCard from "./components/PlayerCard";
import { getPlayers, getPlayerByID } from "./utils/API";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/AppBar";
import { Player } from "./utils/Interfaces";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function App() {
   const [players, setPlayers] = useState<Array<Player>>([]);

   useEffect(() => {
      // //Once you want to implement for all players
      //    getPlayers(1).then((players: Player[]) => {
      //       return setPlayers(players);
      //    }).catch((error :any)=> console.log(error)); 

      getPlayerByID(237)
         .then((player: Player) => {
            if(player) return setPlayers([player]);
         }).catch((error) => console.log(error));
   },[]);

   return (
      <div className='App' data-testid='app'>
         <AppBar
            position='relative'
            elevation={2}
            sx={{ borderBottom: (theme) => `16px solid ${theme.palette.divider}`, p: 2 }}
         >
            <Toolbar sx={{ flexWrap: "wrap" }}>
               <Box
                  component='img'
                  sx={{
                     height: 64
                  }}
                  alt='nba logo'
                  src={"https://cdn.nba.com/logos/leagues/logo-nba.svg"}
               />
            </Toolbar>
         </AppBar>
         <Container sx={{ py: 8 }} maxWidth='md'>
            <Grid container spacing={4}>    
               {players.length ? (
                  players.map((player: Player) => {
                     return <PlayerCard key={player.id} {...player} />;
                  })
               ) : (
                  <Grid item xs={12} sm={6} md={4}>
                     <Card data-testid='noPlayersCard'>
                        <CardContent>No players to display</CardContent>
                     </Card>
                  </Grid>
               )}
            </Grid>
         </Container>
      </div>
   );
}

export default App;
