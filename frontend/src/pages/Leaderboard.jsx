const Leaderboard = () => {
    const leaderboardData = [
        { id: 1, name: 'Player 1', score: 100 },
        { id: 2, name: 'Player 2', score: 90 },
        { id: 3, name: 'Player 3', score: 80 },
        // Add more players as needed
    ];

    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((player, index) => (
                        <tr key={player.id}>
                            <td>{index + 1}</td>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;