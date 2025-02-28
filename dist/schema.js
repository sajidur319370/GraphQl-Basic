export const typeDefs = `#graphql
type Game {
    id:ID!
    title:String!
    platforms:[String!]!
    reviews:[Review!]
}
type Review{
    id:ID!
    rating:Int!
    content:String
    game_id:ID!
    author_id:ID!
    game:Game!
    author:Author!
}
type Author{
    id:ID!
    name:String!
    isActive:Boolean!
    reviews:[Review!]
}
type Query {
    reviews:[Review!]
    review(id:ID!):Review
    games:[Game!]
    game(id:ID!):Game
    authors:[Author!]
    author(id:ID!):Author
}
type  Mutation{
    addGame(game:AddGameInput!):Game
    deleteGame(id:ID!):[Game]
    updateGame(id:ID!,edits:UpdateGameInput):Game
}
input AddGameInput{
   title:String!,
   platforms:[String!]!
}
input UpdateGameInput{
   title:String!,
   platforms:[String!]!
}
`;
