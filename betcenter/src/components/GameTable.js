import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
  CardHeader,
} from '@material-ui/core';
import { BrowserRouter, Route , Routes, Link} from "react-router-dom";
import GameInfo from '../GameInfo';


function team_abbrev(id){
    if (id == "UTA"){
      return 'UTAH'
    } else if (id == "NOP"){
      return 'NO'
    }

    return false
}

function GameTable() {
    const [games, setGames] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          '/all',
        );
        setGames(result.data.data);
      };
      fetchData();
    }, []);
  
  
    console.log(games)
    console.log(games.length > 0)

    //console.log(games[0])
    if(games.length > 0) {
    return (
        <div>

        <Paper>
        
      
        <Typography variant="h4" component="h4" align="center" gutterBottom>
          Today's NBA Games
        </Typography>
        <Table>
        <TableBody>
          {games.map(game => (
            <TableRow key={game.gameId} hover>
              <TableCell>
              <Link to={`/game/${game.gameId}`} state={{ from: game }} component={Box} display="flex" alignItems="center">

                <Box>
                <CardHeader
                  avatar={
                    <Avatar
                      src={ `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${game.homeTeam.teamTricode}.png`}
                    />
                  }
                  title={`${game.homeTeam.fullname} (${game.betting[0].odds}) @`}
                />
                <CardHeader
                  avatar={
                    <Avatar
                    src={!team_abbrev(game.awayTeam.teamTricode) ? `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${game.awayTeam.teamTricode}.png` : `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${team_abbrev(game.awayTeam.teamTricode)}.png`}
                    />
                  }
                  title={`${game.awayTeam.fullname} (${game.betting[1].odds})`}
                />
  
                </Box>
                </Link>

              </TableCell>
              <TableCell>
                <TableRow>
                {game.status}
                </TableRow>
                <TableRow>
                {`${game.homeTeam.score} - ${game.awayTeam.score}`}
                </TableRow>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>

      </div>
    );}
  }

export default GameTable;