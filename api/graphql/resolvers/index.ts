import { createSchema } from "graphql-yoga";

import { typeDefs } from "../schema";

import { getEvents, getEventById } from "./event";
import { getTournaments, getTournament } from "./tournament";
import { getEntriesFromCategory, getEntriesFromTournament } from "./entry";
import {
  getFishermansFromTournament,
  getFishermanFromEntry,
} from "./fisherman";
import { getBoatsFromTournament, getBoatFromEntry } from "./boat";
import { getCategories, getCategoryFromEntry } from "./category";

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      event: getEventById,
      events: getEvents,
      tournament: getTournament,
      tournaments: getTournaments,
    },
    Tournament: {
      fishermans: getFishermansFromTournament,
      boats: getBoatsFromTournament,
      entries: getEntriesFromTournament,
      categories: getCategories,
    },
    Entry: {
      fisherman: getFishermanFromEntry,
      boat: getBoatFromEntry,
      category: getCategoryFromEntry,
    },
    Category: {
      entries: getEntriesFromCategory,
    },
  },
});
