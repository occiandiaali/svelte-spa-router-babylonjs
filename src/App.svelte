<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import NavbarComponent from "./lib/NavbarComponent.svelte";
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

<NavbarComponent />
<main>
  <Router {routes} />
</main>

<style>
  main {
    padding: 2rem;
  }
</style>
