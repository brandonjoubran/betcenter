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
  Link,
  Box,
  Avatar,
  CardHeader,
} from '@material-ui/core';

/*team_data = {
  '1610612765': {
    'name': 'Detroit Pistons',
    'balldontlie_id': '9',
    'espn_abbrev': 'det'
  }, 
  '1610612755': {
    'name': 'Philadelphia 76ers',
    'balldontlie_id': '23',
    'espn_abbrev': 'phi'
  }, 
  '1610612757': {
    'name': 'Portland Trail Blazers',
    'balldontlie_id': '25',
    'espn_abbrev': 'por'
  }, 
}*/

function team_abbrev(id){
    if (id == "UTA"){
      return 'UTAH'
    } else if (id == "NOP"){
      return 'NO'
    }

    return false
}

function App() {
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
  return (
    <Paper>
      <Typography variant="h4" component="h4" align="center" gutterBottom>
        Today's NBA Games
      </Typography>
      <Table>
      <TableBody>
        {games.map(game => (
          <TableRow key={game.gameId} hover>
            <TableCell>
              <Box>
              <Link to={`/game/${game.id}`} component={Box} display="flex" alignItems="center">
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
              </Link>

              </Box>
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
  );
}

export default App;