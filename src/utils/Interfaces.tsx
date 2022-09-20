export interface Player {
   id: number;
   first_name: string;
   last_name: string;
   position: string;
   height_feet?: number;
   height_inches?: number;
   team: Team;
}

export interface Team {
   id: number;
   city: string;
   conference: string;
   name: string;
}