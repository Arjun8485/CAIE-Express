<script>
    import { user } from "../stores/user.js";

    import Tabs from "./navbar/Tabs.svelte";
    import EditorTabs from "./navbar/EditorTabs.svelte";
    import ProfilePicture from "./navbar/ProfilePicture.svelte";
    import LoginWithGoogle from "./global/LoginWithGoogle.svelte";
    import SignOut from "./global/SignOut.svelte"

    export let layoutComponentClasses

    const navBtnClasses = `font-semibold uppercase hover:text-red-500 mx-4`;
    const tabs = ["Tracker", "PastPapers"]
</script>
<nav class="{layoutComponentClasses} items-center sm:mt-8 lg:h-24">
    <div class="md:w-1/6">
        <a href="#/" class="font-bold text-4xl">CAIE<span class="font-light italic">Express</span></a>
    </div>
    <div class="flex lg:flex-row lg:items-center flex-col">
        <Tabs {navBtnClasses} {tabs}/>

        <EditorTabs {navBtnClasses}/>

        {#if $user.uid}
            <ProfilePicture />
            <br>
            <SignOut />
        {:else}
            <div class="mx-4 w-32">
                <LoginWithGoogle />
            </div>
        {/if}
    </div>
</nav>