import Home from "./routes/Home.svelte";
import About from "./routes/About.svelte";
import Play from "./routes/Play.svelte";
import Profile from "./routes/Profile.svelte";
import Notifications from "./routes/Notifications.svelte";
import Settings from "./routes/Settings.svelte";
import NotFound from "./routes/NotFound.svelte";

export default {
    '/': Home,
    '/about': About,
    '/play': Play,
    '/profile': Profile,
    '/notifications': Notifications,
    '/settings': Settings,
    '*': NotFound
}