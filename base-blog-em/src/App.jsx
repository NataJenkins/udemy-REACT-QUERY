import { Posts } from "./Posts";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const QueryClient = new QueryClient();

function App() {
    return (
        // provide React Query client to App
        <QueryClientProvider client={QueryClient}>
            <div className="App">
                <h1>Blog &apos;em Ipsum</h1>
                <Posts />
            </div>
        </QueryClientProvider>
    );
}

export default App;
