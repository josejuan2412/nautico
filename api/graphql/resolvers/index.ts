import { createSchema } from "graphql-yoga";

import { typeDefs } from "../schema";

import { getSails as sails, sailCreate } from "./sail";
import { getEvents as events, getEventById as event } from "./event";
import {
  getTournaments as tournaments,
  getTournament as tournament,
  tournamentCreate,
  tournamentUpdate,
  tournamentDelete,
} from "./tournament";
import {
  getEntriesFromCategory,
  getEntriesFromTournament as entries,
  entryCreate,
  entryUpdate,
  entryDelete,
} from "./entry";
import {
  getFishermansFromTournament as fishermans,
  getFishermanFromEntry as fisherman,
  fishermanCreate,
  fishermanUpdate,
  fishermanDelete,
} from "./fisherman";
import {
  getBoatsFromTournament as boats,
  getBoatFromEntry as boat,
  boatCreate,
  boatUpdate,
  boatDelete,
} from "./boat";
import {
  getCategories as categories,
  getCategoryFromEntry as category,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
} from "./category";

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      event,
      events,
      tournament,
      tournaments,
      sails,
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
      entryCreate,
      entryUpdate,
      entryDelete,
      sailCreate,
    },
    Tournament: {
      fishermans,
      boats,
      entries,
      categories,
    },
    Entry: {
      fisherman,
      boat,
      category,
    },
    Category: {
      entries: getEntriesFromCategory,
    },
  },
});
