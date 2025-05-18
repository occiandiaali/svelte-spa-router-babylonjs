<script lang="ts">
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { Figure, Image } from "@sveltestrap/sveltestrap";
  import type { AuthSession } from "@supabase/supabase-js";
  import { supabase } from "../supabaseClient";

  export let session: AuthSession;

  let loading = false;
  let username: string | null = null;
  let full_name: string | null = null;
  let details = {};
  let bookings = [];
  let avatarUrl: string | null = null;

  let userId: string | null = null;

  const getProfile = async () => {
    try {
      loading = true;
      if (session) {
        //   const { user } = session;

        const { data, error, status } = await supabase
          .from("profiles")
          .select("username, details, full_name, bookings, avatar_url")
          .eq("id", session?.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          username = data.username ?? "Unknown";
          details = data.details;
          avatarUrl = data.avatar_url;
          full_name = data.full_name;
          bookings = data.bookings;
        }
      } else {
        console.log("The session is not yet defined!");
        supabase.auth.getSession().then((s) => {
          console.log(`Session: ${JSON.stringify(s.data.session?.user.email)}`);
          console.log(`Email: ${s.data.session?.user.email}`);
          username = `${s.data.session?.user.email}`;
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
    }
  };

  // Get the authenticated user's ID
  const getUserId = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      return null;
    }

    return user?.id; // Returns the user ID if available
  };

  const updateProfile = async () => {
    try {
      loading = true;
      //   const { user } = session || null;

      const updates = {
        id: userId, //"6a6dc7c5-baa7-4da4-ac89-0b4b66f77f09", //user.id,
        username,
        full_name,
        // details,
        // avatar_url: avatarUrl || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (!error) {
        username = "";
        full_name = "";
        push("/");
      }

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    getUserId().then((u) => {
      if (u) {
        userId = u;
      } else {
        console.log(`${u} looks undefined!`);
      }
    });
    getProfile();
    // supabase.auth.getSession().then((s) => {
    //   console.log(`Session: ${JSON.stringify(s.data.session?.user.email)}`);
    // });
  });
</script>

<Figure caption="I believe this is a cow needing a haircut">
  <Image
    thumbnail
    alt="This is a thumbnail Image"
    src="https://picsum.photos/100/100?random=1"
  />
</Figure>
<form on:submit|preventDefault={updateProfile} class="form-widget">
  <!-- <div>Email: {session ? session.user.email : "Uknown"}</div> -->
  <div>Hello, {username}</div>
  <div>
    {#if session}
      <div>Email: {session.user.email}</div>
    {:else}
      <div>
        <label for="full_name">Full Name</label>
        <input
          id="full_name"
          type="text"
          bind:value={full_name}
          placeholder="First name and Family name"
        />
      </div>
      <div>
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          bind:value={username}
          placeholder="What do we call you?"
        />
      </div>
    {/if}
    <!-- {#if username}
      <div>Hello, {username}</div>
    {:else}
      <div>Have you chosen a username yet?</div>
    {/if}
  </div> -->
    <!-- <div>
    <label for="username">Username</label>
    <input
      id="username"
      type="text"
      bind:value={username}
      placeholder="Your username.."
    />
  </div> -->
    <!-- <div>
    <label for="voice">Voice sample</label>
    <input id="voice" type="audio" bind:value={voice} />
  </div>
  <div>
    <label for="video">Video</label>
    <input id="video" type="video" bind:value={bio} />
  </div> -->
    <!-- <div>
    <label for="website">Website</label>
    <input id="website" type="text" bind:value={website} />
  </div> -->
    <div>
      <button type="submit" class="button primary block" disabled={loading}>
        {loading ? "Saving ..." : "Update profile"}
      </button>
    </div>
    <!-- <button
    type="button"
    class="button block"
    on:click={() => supabase.auth.signOut()}
  >
    Sign Out
  </button> -->
  </div>
</form>

<style scoped>
  div {
    margin: 6px;
  }
</style>
