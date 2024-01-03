from nba_api.stats.endpoints import playercareerstats
import time
import nba_api.stats.static.players as playerData
from nba_api.stats.endpoints import leaguedashplayerstats
import pandas as pd

name = "Joel_Embiid"
start = time.time()
embiid = playerData.find_players_by_full_name(name.replace("_"," "))
id = dict(embiid[0])["id"]
print(name,id)
print(f"\n {time.time()-start}")

start = time.time()

career = playercareerstats.PlayerCareerStats(id)
print(f"\n {time.time()-start}")

print(career.get_data_frames()[0])

player_stats = []
start = time.time()

for i in range(10):
    player_stats.append(leaguedashplayerstats.LeagueDashPlayerStats(season=f"{2023-i}-{24-i}")) # Replace with the desired season
stats_df = player_stats[2].get_data_frames()[0]
print(f"\n {time.time()-start}")

# Filter based on your specific criteria (e.g., minimum games played, team, etc.)
# For example, to filter players with at least 20 games played:
filtered_df = stats_df[stats_df['PTS'] >= 874]

# Sort by PPG
sorted_df = filtered_df.sort_values(by='PTS', ascending=False)

# Get the top 100 players
top_100_players = sorted_df.head(100)

print(top_100_players[['PLAYER_NAME', 'PTS']])


