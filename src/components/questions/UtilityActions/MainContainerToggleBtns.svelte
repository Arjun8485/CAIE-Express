<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let utilityButtons
export let main_container_content
export let MainContainerToggleBtnsClasses

function utilityBtnActionHandler(utility) {
    if (utility == utilityButtons[2]) {
        console.log("Fetching more questions")
            dispatch('fetchMoreQuestions',{})
    } else {
        main_container_content = utility
    }
}
</script>

{#each utilityButtons as button}
    <button on:click={() => utilityBtnActionHandler(button)} class=" {MainContainerToggleBtnsClasses} {main_container_content == button ? 'bg-black text-white' : 'text-black'}">{button}</button>
{/each}
