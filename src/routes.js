import Home from "./routes/Home.svelte";
import Experience from "./routes/Experience.svelte";
import Play from "./routes/Play.svelte";
import NotFound from "./routes/NotFound.svelte";

export default {
    '/': Home,
    '/experience/:num': Experience,
    '/play': Play,
    '*': NotFound
}