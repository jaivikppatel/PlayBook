import * as React from 'react';
import { useEffect } from 'react';
import './RankingTable.css';
import { Table, TableHead, TableCell, TableRow, TableBody, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';

// const sampleData = [
//     {
//         id: 1,
//         name: 'Team 1',
//         points: 100,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 1,
//             },
//             {
//                 match_number: '2',
//                 rank: 2,
//             },
//             {
//                 match_number: '3',
//                 rank: 3,
//             },
//             {
//                 match_number: '4',
//                 rank: 4,
//             },
//             {
//                 match_number: '5',
//                 rank: 5,
//             },
//             {
//                 match_number: '6',
//                 rank: 6,
//             },
//             {
//                 match_number: '7',
//                 rank: 7,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 2,
//         name: 'Team 2',
//         points: 200,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 2,
//             },
//             {
//                 match_number: '2',
//                 rank: 1,
//             },
//             {
//                 match_number: '3',
//                 rank: 3,
//             },
//             {
//                 match_number: '4',
//                 rank: 4,
//             },
//             {
//                 match_number: '5',
//                 rank: 5,
//             },
//             {
//                 match_number: '6',
//                 rank: 6,
//             },
//             {
//                 match_number: '7',
//                 rank: 7,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 3,
//         name: 'Team 3',
//         points: 300,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 3,
//             },
//             {
//                 match_number: '2',
//                 rank: 1,
//             },
//             {
//                 match_number: '3',
//                 rank: 2,
//             },
//             {
//                 match_number: '4',
//                 rank: 4,
//             },
//             {
//                 match_number: '5',
//                 rank: 5,
//             },
//             {
//                 match_number: '6',
//                 rank: 6,
//             },
//             {
//                 match_number: '7',
//                 rank: 7,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 4,
//         name: 'Team 4',
//         points: 400,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 4,
//             },
//             {
//                 match_number: '2',
//                 rank: 1,
//             },
//             {
//                 match_number: '3',
//                 rank: 2,
//             },
//             {
//                 match_number: '4',
//                 rank: 3,
//             },
//             {
//                 match_number: '5',
//                 rank: 5,
//             },
//             {
//                 match_number: '6',
//                 rank: 6,
//             },
//             {
//                 match_number: '7',
//                 rank: 7,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 5,
//         name: 'Team 5',
//         points: 500,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 5,
//             },
//             {
//                 match_number: '2',
//                 rank: 1,
//             },
//             {
//                 match_number: '3',
//                 rank: 2,
//             },
//             {
//                 match_number: '4',
//                 rank: 3,
//             },
//             {
//                 match_number: '5',
//                 rank: 4,
//             },
//             {
//                 match_number: '6',
//                 rank: 6,
//             },
//             {
//                 match_number: '7',
//                 rank: 7,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 6,
//         name: 'Team 6',
//         points: 600,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 6,
//             },
//             {
//                 match_number: '2',
//                 rank: 1,
//             },
//             {
//                 match_number: '3',
//                 rank: 2,
//             },
//             {
//                 match_number: '4',
//                 rank: 3,
//             },
//             {
//                 match_number: '5',
//                 rank: 4,
//             },
//             {
//                 match_number: '6',
//                 rank: 5,
//             },
//             {
//                 match_number: '7',
//                 rank: 7,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 7,
//         name: 'Team 7',
//         points: 700,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 7,
//             },
//             {
//                 match_number: '2',
//                 rank: 1,
//             },
//             {
//                 match_number: '3',
//                 rank: 2,
//             },
//             {
//                 match_number: '4',
//                 rank: 3,
//             },
//             {
//                 match_number: '5',
//                 rank: 4,
//             },
//             {
//                 match_number: '6',
//                 rank: 5,
//             },
//             {
//                 match_number: '7',
//                 rank: 6,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 8,
//         name: 'Team 8',
//         points: 800,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 8,
//             },
//             {
//                 match_number: '2',
//                 rank: 1,
//             },
//             {
//                 match_number: '3',
//                 rank: 2,
//             },
//             {
//                 match_number: '4',
//                 rank: 3,
//             },
//             {
//                 match_number: '5',
//                 rank: 4,
//             },
//             {
//                 match_number: '6',
//                 rank: 5,
//             },
//             {
//                 match_number: '7',
//                 rank: 6,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 9,
//         name: 'Team 9',
//         points: 900,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 9,
//             },
//             {
//                 match_number: '2',
//                 rank: 1,
//             },
//             {
//                 match_number: '3',
//                 rank: 2,
//             },
//             {
//                 match_number: '4',
//                 rank: 3,
//             },
//             {
//                 match_number: '5',
//                 rank: 4,
//             },
//             {
//                 match_number: '6',
//                 rank: 5,
//             },
//             {
//                 match_number: '7',
//                 rank: 6,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 10,
//         name: 'Team 10',
//         points: 1000,
//         rank_history: [
//             {
//                 match_number: '1',
//                 rank: 10,
//             },
//             {
//                 match_number: '2',
//                 rank: 1,
//             },
//             {
//                 match_number: '3',
//                 rank: 2,
//             },
//             {
//                 match_number: '4',
//                 rank: 3,
//             },
//             {
//                 match_number: '5',
//                 rank: 4,
//             },
//             {
//                 match_number: '6',
//                 rank: 5,
//             },
//             {
//                 match_number: '7',
//                 rank: 6,
//             },
//         ],
//         profile_image: 'https://via.placeholder.com/150',
//     },
// ];

export default function RankingTable() {
    // const rankedData = sampleData.sort((b, a) => a.points - b.points); 
    // const tableData = rankedData.slice(3);

    const [rankedData, setRankedData] = React.useState([]);
    const [tableData, setTableData] = React.useState([]);

//     @app.route('/get_teams_with_scores', methods=['GET'])
// def get_teams_with_scores():
//     try:
//         db = get_db()
//         cursor = db.cursor(dictionary=True)

//         # Fetch all teams
//         cursor.execute('SELECT id, name, logo FROM teams')
//         teams = cursor.fetchall()

//         # Fetch rank history for each team
//         cursor.execute('''
//             SELECT s.team_id, m.match_number, s.rank
//             FROM scores s
//             JOIN matches m ON s.game_id = m.id
//             ORDER BY m.match_number ASC
//         ''')
//         rank_data = cursor.fetchall()

//         # Fetch points (assuming points are calculated based on rank, adjust as needed)
//         cursor.execute('''
//             SELECT team_id, SUM(100 - (rank * 10)) AS points
//             FROM scores
//             GROUP BY team_id
//         ''')
//         points_data = {row["team_id"]: row["points"] for row in cursor.fetchall()}

//         cursor.close()

//         # Process data into required format
//         result = []
//         for team in teams:
//             team_id = team["id"]
//             team_data = {
//                 "id": team_id,
//                 "name": team["name"],
//                 "points": points_data.get(team_id, 0),
//                 "rank_history": [
//                     {"match_number": str(r["match_number"]), "rank": r["rank"]}
//                     for r in rank_data if r["team_id"] == team_id
//                 ],
//                 "profile_image": team["logo"]
//             }
//             result.append(team_data)

//         return jsonify(result), 200

//     except Exception as e:
//         return jsonify({'error': str(e)}), 500

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/get_teams_with_scores`)
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((b, a) => a.points - b.points);
                setRankedData(sortedData);
                setTableData(sortedData.slice(3));
            })
            .catch(error => console.error(error));
    }, []);

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (<>
        {rankedData.length > 0 && <div className='ranking-table-root'>
            <div className='podium-container'>
                <div className='podium-2'>
                    <img src={rankedData[1].profile_image} alt='team' className='podium-image' />
                    <div className='podium-name'>{rankedData[1].name}</div>
                    <div className='podium-points'>{rankedData[1].points}</div>
                </div>
                {rankedData.length > 1 && <div className='podium-1'>
                    <img src={rankedData[0].profile_image} alt='team' className='podium-image' />
                    <div className='podium-name'>{rankedData[0].name}</div>
                    <div className='podium-points'>{rankedData[0].points}</div>
                </div>}
                {rankedData.length > 2 && <div className='podium-3'>
                    <img src={rankedData[2].profile_image} alt='team' className='podium-image' />
                    <div className='podium-name'>{rankedData[2].name}</div>
                    <div className='podium-points'>{rankedData[2].points}</div>
                </div>}
            </div>
            <div className='table-container'>
                {tableData.map((team, index) => (
                    <Accordion
                        expanded={expanded === `panel${index+4}`}
                        onChange={handleExpandChange(`panel${index+4}`)}
                        key={team.id}
                        sx={{ width: '100%', border: '1px solid #c7ae6a', borderRadius: '20px', backgroundColor: '#14083d' }}
                    >
                        <AccordionSummary>
                            {/** Rank and team name and image in summary */}
                            <div className='rank'>{index + 4}</div>
                            <img src={team.profile_image} alt='team' className='team-image' />
                            <div className='team-name'>{team.name}</div>
                            <div className='team-points'>{team.points}</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/** Table with match history */}
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#c7ae6a' }}>Match Number</TableCell>
                                        <TableCell sx={{ color: '#c7ae6a' }}>Rank</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {team.rank_history.map((history) => (
                                        <TableRow key={history.match_number}>
                                            <TableCell sx={{ color: '#c7ae6a' }}>{history.match_number}</TableCell>
                                            <TableCell sx={{ color: '#c7ae6a' }}>{history.rank}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>}
    </>);
}