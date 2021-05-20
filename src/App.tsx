import { Box } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import QuestionSearch from "./questionSearch";
import fetcher from "./apis/fetcher";

export const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0,
};

function App() {
  return (
    <Box>
      <SWRConfig
        value={{
          fetcher,
          ...swrOptions,
        }}
      >
        <QuestionSearch />
      </SWRConfig>
    </Box>
  );
}

export default App;
