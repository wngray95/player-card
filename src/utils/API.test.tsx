import {getAverageGamesPlayed, getAverageGamesPlayedAlt} from "./API";


test('average games played function', async () => {
   const id = 237;  // ideally import from test-data.json
   const averages = await getAverageGamesPlayed(id, 2014, 2020);

   expect(averages).toHaveProperty('over50');
   expect(averages.underOrEqual50).toBeGreaterThanOrEqual(1);
   expect(averages).toHaveProperty('underOrEqual50')  
   expect(averages.underOrEqual50).toBeGreaterThanOrEqual(1);
})


test('average games played function Alternative', async () => {
   const id = 237;  // ideally import from test-data.json
   const averages = await getAverageGamesPlayedAlt(id, 2014, 2020);

   expect(averages).toHaveProperty('over50');
   expect(averages.underOrEqual50).toBeGreaterThanOrEqual(1);
   expect(averages).toHaveProperty('underOrEqual50')  
   expect(averages.underOrEqual50).toBeGreaterThanOrEqual(1);
})