import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useLocation } from "react-router-dom";
import './TeamInfo.css';


const GameInfo = (props) => {
    const { id } = useParams()
    const location = useLocation();
    const { from } = location.state;
    console.log(from); // output: "the-page-id"
  const teamA = {
    name: from.homeTeam.fullname,
    recordVsTeamB: '7-3',
    recordOverall: '15-5',
  };
  const teamB = {
    name: from.awayTeam.fullname,
    recordVsTeamA: '3-7',
    recordOverall: '10-10',
  };

  //  `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${from.homeTeam.teamTricode}.png`
  // `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${from.awayTeam.teamTricode}.png`

  return (
    <div style={styles.container}>
      <div style={styles.teamContainer}>
        <div style={styles.teamData}>
          <img src={`https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${from.homeTeam.teamTricode}.png`} style={styles.logo} alt={`${teamA.name} logo`} />
          <h2 style={styles.teamName}>{teamA.name}</h2>
        </div>
        <div style={styles.recordContainer}>
          <div style={styles.record}>
            <p>Record (last 10 games vs {teamB.name}): {teamA.recordVsTeamB}</p>
            <p>Record (last 10 games overall): {teamA.recordOverall}</p>
          </div>
        </div>
      </div>
      <div style={styles.divider} />
      <div style={styles.teamContainer}>
        <div style={styles.teamData}>
        <img src={`https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${from.awayTeam.teamTricode}.png`} style={styles.logo} alt={`${teamA.name} logo`} />
          <h2 style={styles.teamName}>{teamB.name}</h2>
        </div>
        <div style={styles.recordContainer}>
          <div style={styles.record}>
            <p>Record (last 10 games vs {teamA.name}): {teamB.recordVsTeamA}</p>
            <p>Record (last 10 games overall): {teamB.recordOverall}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    },
    teamContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 20px',
      width: '50%',
    },
    teamData: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      width: '50px',
      height: '50px',
      marginRight: '10px',
    },
    teamName: {
      fontWeight: 'bold',
    },
    recordContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    record: {
      textAlign: 'center',
    },
    divider: {
        width: '1px',
        height: '100%',
        background: 'gray',
        margin: '0 20px',
    },
};


export default GameInfo;