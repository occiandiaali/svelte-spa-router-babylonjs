<script lang="ts">
  import { Button, FormGroup, Input } from "@sveltestrap/sveltestrap";
  import { supabase } from "../supabaseClient";

  let loading = false;
  let email = "";
  // let profileData = {};
  // let exists = false;

  // async function checkUserEmail(email:string) {
  //   try {
  //     const {data, error} = await supabase
  //     .from('profiles')
  //     .select('email')
  //     .eq('email', email);

  //     if (error) {
  //       alert(`Error confirming email: ${error.message}`);
  //       return {exists: false, error:error.message}
  //     }
  //     if (data.length > 0) {
  //       return {exists: true};
  //     } else {
  //       return {exists: false};
  //     }
  //   } catch (err) {
  //      return {exists: false, error: err}
  //   }
  // }

  const handleLogin = async () => {
    //  const {exists, error} = await checkUserEmail(email)

    try {
      loading = true;
      // if (exists) {
      // }
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for login link!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
    }
  };
</script>

<div class="row flex-center flex justify-content-center">
  <div class="col-6 form-widget" aria-live="polite">
    <h1 class="header">Blindate.com</h1>

    <p class="description">Sign in via magic link with your email below</p>
    <form class="form-widget" on:submit|preventDefault={handleLogin}>
      <div style="padding: 14px;">
        <!-- <label for="email">Email</label>
        <input
          style="border-radius: 6px;width:20rem"
          id="email"
          class="inputField"
          type="email"
          placeholder="Your email"
          bind:value={email}
        /> -->
        <FormGroup floating label="Email">
          <Input
            id="email"
            type={"email"}
            bind:value={email}
            placeholder="Your email"
          />
        </FormGroup>
      </div>
      <div>
        <Button color="outline-success" disabled={loading}>
          {loading ? "Loading" : "Send magic link"}
        </Button>
      </div>
    </form>
  </div>
</div>
