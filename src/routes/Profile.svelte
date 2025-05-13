<!-- <script lang="ts">
  import {
    Figure,
    Image,
    ListGroup,
    ListGroupItem,
    Modal,
  } from "@sveltestrap/sveltestrap";

  let open = false;
  const toggle = () => (open = !open);
</script>

<section>
  <Modal body header="modal title" isOpen={open} {toggle} centered>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </Modal>
  <Figure caption="I believe this is a cow needing a haircut">
    <Image
      thumbnail
      alt="This is a thumbnail Image"
      src="https://picsum.photos/100/100?random=1"
    />
  </Figure>

  <ListGroup>
    <ListGroupItem active tag="button" action on:click={toggle}
      >Active</ListGroupItem
    >
    <ListGroupItem tag="button" action on:click={toggle}>Bravo</ListGroupItem>
    <ListGroupItem tag="button" action on:click={toggle}>Charlie</ListGroupItem>
    <ListGroupItem tag="button" action on:click={toggle}>Delta</ListGroupItem>
    <ListGroupItem disabled tag="button" action>Disabled</ListGroupItem>
  </ListGroup>
</section> -->

<script lang="ts">
  import { onMount } from "svelte";
  import { Figure, Image } from "@sveltestrap/sveltestrap";
  import type { AuthSession } from "@supabase/supabase-js";
  import { supabase } from "../supabaseClient";

  export let session: AuthSession;

  let loading = false;
  let username: string | null = null;
  let interests = {};
  let avatarUrl: string | null = null;

  const getProfile = async () => {
    try {
      loading = true;
      if (session) {
        const { user } = session;

        const { data, error, status } = await supabase
          .from("profiles")
          .select("username, interests, avatar_url")
          .eq("id", user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          username = data.username ?? "Unknown";
          interests = data.interests;
          avatarUrl = data.avatar_url;
        }
      } else {
        console.log("The session is not yet defined!");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
    }
  };

  const updateProfile = async () => {
    try {
      loading = true;
      // const { user } = session;

      const updates = {
        //   id: user.id,
        username,
        // interests,
        // avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

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
    getProfile();
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
  <!-- <div>Email: {session.user.email}</div> -->
  <div>
    <!-- {#if session}
      <div>Email: {session.user.email}</div>
    {:else}
      <div>Your user session isn't yet defined</div>
    {/if} -->
    {#if username}
      <div>Hello, {username}</div>
    {:else}
      <div>Have you chosen a username yet?</div>
    {/if}
  </div>
  <div>
    <label for="username">Username</label>
    <input
      id="username"
      type="text"
      bind:value={username}
      placeholder="Your username.."
    />
  </div>
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
</form>

<style scoped>
  div {
    margin: 6px;
  }
</style>
