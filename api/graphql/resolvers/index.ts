import { createSchema } from "graphql-yoga";

import { typeDefs } from "../schema";

import { getEvents, getEventById } from "./event";
import {
  getTournaments,
  getTournament,
  tournamentCreate,
  tournamentUpdate,
  tournamentDelete,
} from "./tournament";
import { getEntriesFromCategory, getEntriesFromTournament } from "./entry";
import {
  getFishermansFromTournament,
  getFishermanFromEntry,
  fishermanCreate,
  fishermanUpdate,
  fishermanDelete,
} from "./fisherman";
import {
  getBoatsFromTournament,
  getBoatFromEntry,
  boatCreate,
  boatUpdate,
  boatDelete,
} from "./boat";
import {
  getCategories,
  getCategoryFromEntry,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
} from "./category";

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      event: getEventById,
      events: getEvents,
      tournament: getTournament,
      tournaments: getTournaments,
    },
    Mutation: {
      tournamentCreate,
      tournamentUpdate,
      tournamentDelete,
      categoryCreate,
      categoryUpdate,
      categoryDelete,
      fishermanCreate,
      fishermanUpdate,
      fishermanDelete,
      boatCreate,
      boatUpdate,
      boatDelete,
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
