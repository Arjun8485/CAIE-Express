<script>
import {location} from 'svelte-spa-router'

export let tabs
export let navBtnClasses;
</script>

<a  href={`#/Questions`} 
class="{navBtnClasses} {$location.split('/')[1] == "Questions" ? 'border-b-2  border-blue' : 'border-none'}">
Questions
</a>
{#each tabs as tab}
    <a  href={`#/${tab}`} 
        class="{navBtnClasses} {$location.split('/')[1] == tab ? 'border-b-2  border-blue' : 'border-none'}">
        {tab}
    </a>
{/each}