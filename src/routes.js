import Home from "./routes/Home.svelte";
import Play from "./routes/Play.svelte";
import NotFound from "./routes/NotFound.svelte";

export default {
    '/': Home,
    '/play': Play,
    '*': NotFound
}