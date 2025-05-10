import Home from "./routes/Home.svelte";
import Experience from "./routes/Experience.svelte";
import NotFound from "./routes/NotFound.svelte";

export default {
    '/': Home,
    '/experience/:num': Experience,
    '*': NotFound
}