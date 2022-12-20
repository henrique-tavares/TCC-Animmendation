import { useUserStore } from "@/stores/user";
import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const userStore = useUserStore();
  operation.setContext(
    ({ headers = {} }: { headers: Record<string, string> }) => {
      return {
        headers: {
          ...headers,
          Authorization: userStore.token
            ? `Bearer ${userStore.token.accessToken}`
            : undefined,
        },
      };
    }
  );

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
