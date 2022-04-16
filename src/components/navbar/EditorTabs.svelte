<script>
    import { user } from "../../stores/user.js"
    import {location} from 'svelte-spa-router'

    export let navBtnClasses
</script>

{#if $user.roles.admin}
        <a  
            href="#/Editor"
            class="{navBtnClasses} {$location.split('/')[1] == "Editor" ? 'border-b-2  border-blue' : 'border-none'}">
            Editor
        </a>
{/if}