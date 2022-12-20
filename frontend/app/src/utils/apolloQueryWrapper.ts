import { apolloClient } from "@/providers/apolloClientProvider";
import { provideApolloClient, type useLazyQuery } from "@vue/apollo-composable";

export async function promissifyQueryResult<T, V>(
  res: ReturnType<typeof useLazyQuery<T, V>>
) {
  provideApolloClient(apolloClient);
  const { onError, onResult, load } = res;

  return new Promise<T>((resolve, reject) => {
    onResult((res) => {
      resolve(res.data);
    });

    onError((err) => {
      reject(err);
    });

    load();
  });
}
