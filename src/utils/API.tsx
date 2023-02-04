const BASEURL = "https://www.balldontlie.io/api/v1";
//const BASEURL = process.env.REACT_APP_API_URL
console.log('process.env.API_URL: ', process.env.REACT_APP_API_URL)

export async function getPlayerByID(playerId: string | number) {
   const URL = BASEURL + `/players/${playerId}`;

   const response = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
   });
   return await response.json();
}

export async function getPlayers(perPage?: number) {
   const URL = BASEURL + `/players?page=5&per_page=${perPage ? perPage : 25}`;

   const response = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
   });

   const res = await response.json();
   return res.data;
}

export async function getAverageGamesPlayed(playerId: number, seasonStart: number, seasonEnd: number) {
   const seasons = [...Array(seasonEnd - seasonStart + 1).keys()].map((x) => x + seasonStart);

   const promises = seasons.map((season: number) => {
      return getSeasonAvg(playerId, season);
   });

   return Promise.all(promises).then((seasons: any[]) => {
      let under = 0,
         over = 0;

      seasons.forEach((season: any) => {
         if (season.length && season[0].games_played) {
            return season[0].games_played > 50 ? over++ : under++;
         }
      });

      return { over50: over, underOrEqual50: under };
   });
}

export async function getAverageGamesPlayedAlt(playerId: number, seasonStart: number, seasonEnd: number) {
   const seasons = [...Array(seasonEnd - seasonStart + 1).keys()].map((x) => x + seasonStart);
   let over = 0,
      under = 0;

   for (const season of seasons) {
      const res = await getSeasonAvg(playerId, season);
      if (res.length && res[0].games_played) {
         res[0].games_played > 50 ? over++ : under++;
      }
   }

   return { over50: over, underOrEqual50: under };
}

async function getSeasonAvg(playerId: number, season: number) {
   const URL = BASEURL + `/season_averages?player_ids[]=${playerId}&season=${season}`;

   const response = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
   });

   const res = await response.json();
   return res.data;
}
