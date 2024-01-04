import "./index.css";
import WebPlayer from "./components/PlatformConnector";
import Playlist from "./components/Playlist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebPlayer />
      <Playlist />
    </QueryClientProvider>
  );
}

export default App;
