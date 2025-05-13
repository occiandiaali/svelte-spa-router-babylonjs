<script lang="ts">
  import { onMount } from "svelte";
  import {
    Collapse,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Navbar,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "@sveltestrap/sveltestrap";
  import type { AuthSession } from "@supabase/supabase-js";
  import { supabase } from "../supabaseClient";

  let isOpen = false;

  export let session: AuthSession;

  function handleUpdate(event: any) {
    isOpen = event.detail.isOpen;
  }
  onMount(async () => {
    const { user } = session;
  });
</script>

,<Navbar color="dark" dark container="xl" fixed="top">
  <!-- <Navbar color="light" light expand="md" container="md"> -->
  <NavbarBrand href="#/" on:click={() => (isOpen = false)}
    >Blindate.com</NavbarBrand
  >
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="#/play" on:click={() => (isOpen = !isOpen)}
          >Experiences</NavLink
        >
      </NavItem>
      <NavItem>
        <NavLink href="#/about" on:click={() => (isOpen = !isOpen)}
          >About Us</NavLink
        >
      </NavItem>
      <Dropdown nav inNavbar>
        <DropdownToggle nav caret>More</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem
            ><NavLink href="#/profile" on:click={() => (isOpen = !isOpen)}
              >{session.user.email} Profile</NavLink
            ></DropdownItem
          >
          <DropdownItem
            ><NavLink href="#/notifications" on:click={() => (isOpen = !isOpen)}
              >Notifications</NavLink
            ></DropdownItem
          >
          <DropdownItem
            ><NavLink href="#/settings" on:click={() => (isOpen = !isOpen)}
              >Settings</NavLink
            ></DropdownItem
          >

          <DropdownItem divider />
          <DropdownItem on:click={() => supabase.auth.signOut()}
            >Sign out</DropdownItem
          >
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Collapse>
</Navbar>
