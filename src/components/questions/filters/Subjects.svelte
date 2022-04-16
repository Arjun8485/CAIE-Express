<script>
import { AS_subjects } from "../../../stores/subjects.js";

export let selectedSubject;
import { fade } from 'svelte/transition';
import { fly } from 'svelte/transition';
</script>

<div class="mt-6" in:fly="{{ y: 30, duration: 100 }}" out:fade>
    <p class="uppercase text-gray-500 font-semibold text-xs">select A subject you would like to revise:</p>
    <div class="flex mt-2 flex-wrap">
        {#each AS_subjects as subject}
            <button 
                disabled={subject === "Economics" || subject === "Biology" ? true : false} 
                on:click={() => selectedSubject = subject} 
                class="py-3 px-4 sm:mt-0 mt-2 rounded-sm text-white mx-2 cursor-default 
                {selectedSubject == subject ? 'bg-white text-blue-600 border-2 border-blue-500' : 'text-white bg-blue'} 
                {subject == "Physics" ? 'ml-0' : ''} 
                {subject === "Economics" || subject === "Biology" ? "opacity-50" : "opacity-100"}">
                {subject}
            </button>
        {/each}
    </div>
</div>
