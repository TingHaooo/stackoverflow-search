import { SWRConfig } from "swr";
import QuestionSearch from "./questionSearch";
import fetcher from "./apis/fetcher";
import { ChakraProvider } from "@chakra-ui/react";

export const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0,
};

function App() {
  return (
    <ChakraProvider>
      <SWRConfig
        value={{
          fetcher,
          ...swrOptions,
        }}
      >
        <QuestionSearch />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default App;
