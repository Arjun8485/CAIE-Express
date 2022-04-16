<script>
import { examBoards } from "../../../stores/subjects.js";
export let selectedBoard;
</script>

<p class="uppercase text-gray-500 font-semibold text-xs">select your board:</p>
<div class="flex mt-2 flex-wrap">
    {#each examBoards as ExamBoard}
        <button on:click={() => selectedBoard = ExamBoard} class="py-3 px-4 sm:mt-0 rounded-sm text-white mr-4 cursor-default {selectedBoard == ExamBoard ? 'bg-white text-blue-600 border-2 border-blue-500' : 'text-white bg-blue'} {ExamBoard == "Physics" ? 'ml-0' : ''}">{ExamBoard}</button>
    {/each}
</div>