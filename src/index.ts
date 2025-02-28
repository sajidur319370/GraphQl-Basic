import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./_db.js";
// TypeDefs
import { typeDefs } from "./schema.js";
// Resolvers
const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    review(_: any, args: { id: string }) {
      return db.reviews.find((review: { id: string }) => review.id === args.id);
    },
    game(_: any, args: { id: string }) {
      return db.games.find((game: { id: string }) => game.id === args.id);
    },
    author(_: any, args: any) {
      return db.authors.find((author: { id: any }) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent: { id: string }) {
      return db.reviews.filter(
        (r: { game_id: string }) => r.game_id === parent.id
      );
    },
  },
  Author: {
    reviews(parent: { id: string }) {
      return db.reviews.filter(
        (r: { author_id: string }) => r.author_id === parent.id
      );
    },
  },
  Review: {
    author(parent: { author_id: string }) {
      return db.authors.find((a: { id: string }) => a.id === parent.author_id);
    },
    game(parent: { game_id: string }) {
      return db.games.find((a: { id: string }) => a.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_: any, args: { id: string }) {
      db.games = db.games.filter((g: { id: string }) => g.id !== args.id);
      return db.games;
    },
    addGame(_: any, args: { game: any }) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 1000).toString(),
      };
      db.games.push(game);
      return game;
    },
    updateGame(_: any, args: { id: any; edits: any }) {
      db.games = db.games.map((game: { id: any }) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game;
      });

      return db.games.find((game: { id: any }) => game.id === args.id);
    },
  },
};
const server: any = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
