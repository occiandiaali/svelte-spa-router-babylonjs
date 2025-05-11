<script lang="ts">
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

  let isOpen = false;

  function handleUpdate(event: any) {
    isOpen = event.detail.isOpen;
  }
</script>

,<Navbar color="dark" dark container="xl" fixed="top">
  <!-- <Navbar color="light" light expand="md" container="md"> -->
  <NavbarBrand href="#/">Blindate.com</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="#/play" on:click={() => (isOpen = !isOpen)}
          >Experiences</NavLink
        >
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/sveltestrap/sveltestrap"
          >About Us</NavLink
        >
      </NavItem>
      <Dropdown nav inNavbar>
        <DropdownToggle nav caret>More</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem on:click={() => (isOpen = !isOpen)}
            >Profile</DropdownItem
          >
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Collapse>
</Navbar>
