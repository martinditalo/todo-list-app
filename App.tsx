import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";

import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "./src/routes/routes";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <AppRoutes />
      </PaperProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
