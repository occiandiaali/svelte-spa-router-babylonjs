<script lang="ts">
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  // import { supabase } from "./supabaseClient";
  // import type { AuthSession } from "@supabase/supabase-js";
  import routes from "./routes";

  // import AuthComponent from "./lib/AuthComponent.svelte";
  import NavbarComponent from "./lib/NavbarComponent.svelte";
  import type { AuthSession } from "@supabase/supabase-js";
  import { supabase } from "./supabaseClient";
  //import Profile from "./routes/Profile.svelte";
  import { push } from "svelte-spa-router";

  // let session: AuthSession | null;

  // onMount(() => {
  //   supabase.auth.getSession().then(({ data }) => {
  //     session = data.session;
  //   });
  //   supabase.auth.onAuthStateChange((_event, _session) => {
  //     session = _session;
  //   });
  // });
  export let session: AuthSession;

  //   let username: string | null = null;
  // let avatarUrl: string | null = null;

  const getProfile = async () => {
    try {
      const { user } = session;

      const { data, error, status } = await supabase
        .from("profiles")
        .select("username, interests, avatar_url")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) throw error;

      if (!data?.username) {
        // username = data.username;
        // avatarUrl = data.avatar_url;
        alert("Update your profile!");
        push("/profile");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  onMount(() => {
    getProfile();
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css"
  />
</svelte:head>

<NavbarComponent {session} />
<main>
  <Router {routes} />
</main>

<style>
  main {
    padding: 2rem;
  }
</style>
