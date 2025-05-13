<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "./supabaseClient";
  import type { AuthSession } from "@supabase/supabase-js";

  import AuthComponent from "./lib/AuthComponent.svelte";
  import App from "./App.svelte";

  let session: AuthSession | null;

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session;
    });
    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session;
    });
  });
</script>

<div style="padding: 50px 0 100px 0;">
  {#if !session}
    <AuthComponent />
  {:else}
    <App {session} />
  {/if}
</div>
