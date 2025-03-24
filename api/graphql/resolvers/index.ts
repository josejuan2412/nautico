import { createSchema } from "graphql-yoga";

import { typeDefs } from "../schema";

import { getEvents, getEventById } from "./event";
import {
  getTournaments,
  getTournamentById,
  getEntriesFromTournament,
} from "./tournament";
import { getFishermanFromTournament, getFishermanFromEntry } from "./fisherman";
import { getBoatsFromTournament, getBoatFromEntry } from "./boat";

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      event: getEventById,
      events: getEvents,
      tournament: getTournamentById,
      tournaments: getTournaments,
    },
    Tournament: {
      fishermans: getFishermanFromTournament,
      boats: getBoatsFromTournament,
      entries: getEntriesFromTournament,
    },
    Entry: {
      fisherman: getFishermanFromEntry,
      boat: getBoatFromEntry,
    },
  },
});
