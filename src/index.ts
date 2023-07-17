import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from "@graphql-tools/schema";
import dotenv from "dotenv";
import DatabaseConnector from "./config/db.connection";
import resolvers from "./resolvers/index";
import typeDefs from "./schema/index";
import errorHandler from './services/error.handler';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

const schema = makeExecutableSchema({ typeDefs, resolvers });
async function startServer() {
    const server = new ApolloServer({
        schema,
        formatError: errorHandler,
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            //pass header
            return req;
        },
    });
    // await DatabaseConnector.connect("Headlights_database");
    console.log(`Server ready at: ${url}`);
}
startServer();

