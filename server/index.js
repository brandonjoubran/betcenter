const express = require("express");
var axios = require('axios');

const PORT = 3001;

const app = express();

function get_date() {

  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();
  return year + month + date

}

function create_array(games, betting) {
  resp = []
  console.log(betting)
  games.map( game =>  {
    dict = {}
    dict['gameId'] = game.gameId
    dict['status'] = game.gameStatusText
    dict['homeTeam'] = game.homeTeam
    dict['homeTeam']['fullname'] = game.homeTeam.teamCity + ' ' + game.homeTeam.teamName
    dict['awayTeam'] = game.awayTeam
    dict['awayTeam']['fullname'] = game.awayTeam.teamCity + ' ' + game.awayTeam.teamName
    dict['betting'] = betting[game.gameId]
    resp.push(dict)
  })
  console.log(resp)
  return resp

}

function get_scoreboard(val, values) {
  return new Promise((resolve, reject) => {
      axios
          .get('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json')
          .then(res => {
              resolve(res.data)
          })
          .catch(err => reject(err))
  })
}

function get_odds(val, values) {
  return new Promise((resolve, reject) => {
      axios
          .get('https://cdn.nba.com/static/json/liveData/odds/odds_todaysGames.json')
          .then(res => {
              resolve(res.data)
          })
          .catch(err => reject(err))
  })
}

app.get("/all", (req, resp) => {

  betting = {}
  get_odds()
  .then(res => {
    test = ['0022200598', '0022200597', '0022200598', '0022200599', '0022200600', '0022200601']

    filter = res.games.filter(game => test.includes(game.gameId))

    id = ''
    res.games.forEach(game => {
      console.log(game)
      id = game.gameId
      game.markets = game.markets.filter(market => market.name == "2way")
      game.markets.forEach( market => {
        market.books = market.books.filter(book => book.name === 'FanDuel')
        console.log('here')
        console.log(id)
        if(market.books.length > 0){
          betting[id] = market.books[0].outcomes
        }
      })
    })
          
          
      console.log(res.games)
      return get_scoreboard()
    //resp.json({ message: dict})
  })
  .then(res2 => {
    
    resp.json({ data: create_array(res2.scoreboard.games, betting)})
    console.log(get_date())
  })



  /*get_scoreboard()
  .then(res => {
    resp.json({ message: create_array(res.scoreboard.games)})
    console.log(get_date())
  })*/
});

app.get("/scoreboard", (req, resp) => {
  get_scoreboard()
  .then(res => {
    resp.json({ message: create_array(res.scoreboard.games)})
    console.log(get_date())
  })
});

app.get("/bet", (req, resp) => {
  get_odds()
  .then(res => {
    test = ['0022200598', '0022200597', '0022200598', '0022200599', '0022200600', '0022200601']

    filter = res.games.filter(game => test.includes(game.gameId))

    dict = {}   
    id = ''
    res.games.forEach(game => {
      console.log(game)
      id = game.gameId
      game.markets = game.markets.filter(market => market.name == "2way")
      game.markets.forEach( market => {
        market.books = market.books.filter(book => book.name === 'FanDuel')
        console.log('here')
        console.log(id)
        dict[id] = market.books[0].outcomes
      })
    })
          
          
      console.log(res.games)
 
    resp.json({ message: dict})
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



