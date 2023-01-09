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

team_data = {
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
}

function team_abbrev(id){
    if (id == 29){
      return 'UTAH'
    } else if (id == 19){
      return 'NO'
    }

    return false
}

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://www.balldontlie.io/api/v1/games?seasons[]=2022&dates[]=20230107',
      );
      setGames(result.data.data);
    };
    fetchData();
  }, []);



  return (
    <Paper>
      <Typography variant="h4" component="h4" align="center" gutterBottom>
        Today's NBA Games
      </Typography>
      <Table>
      <TableBody>
        {games.map(game => (
          <TableRow key={game.id} hover>
            <TableCell>
              <Box>
              <Link href="#" component={Box} display="flex" alignItems="center">
              <CardHeader
                avatar={
                  <Avatar
                    src={ `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${game.home_team.abbreviation}.png`}
                  />
                }
                title={`${game.home_team.full_name} (-200) @`}
              />
              <CardHeader
                avatar={
                  <Avatar
                  src={!team_abbrev(game.visitor_team.id) ? `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${game.visitor_team.abbreviation}.png` : `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${team_abbrev(game.visitor_team.id)}.png`}
                  />
                }
                title={`${game.visitor_team.full_name} (-200)`}
              />
              </Link>

              </Box>
            </TableCell>
            <TableCell>
              <TableRow>
              {game.status}
              </TableRow>
              <TableRow>
              {`${game.home_team_score} - ${game.visitor_team_score}`}
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