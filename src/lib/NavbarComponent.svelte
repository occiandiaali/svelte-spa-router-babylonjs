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
  <Collapse {isOpen} navbar expand="sm" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="#/experience" on:click={() => (isOpen = !isOpen)}
          >Experiences</NavLink
        >
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/sveltestrap/sveltestrap"
          >GitHub</NavLink
        >
      </NavItem>
      <Dropdown nav inNavbar>
        <DropdownToggle nav caret>Options</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem on:click={() => (isOpen = !isOpen)}
            >Option 1</DropdownItem
          >
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Reset</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Collapse>
</Navbar>
