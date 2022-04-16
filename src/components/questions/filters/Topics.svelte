<script>
import { topics } from "../../../stores/subjects.js";

export let selectedSubject;
export let selectedBoard;
export let selectedTopics = {
    Physics: [],
    Chemistry: [],
    Maths_Pure_1: [],
    IT: [],
    Biology: [],
    Economics: []
}

function pushTopic(topic) {
    if (selectedTopics[selectedSubject].includes(topic)) {
        const index = selectedTopics[selectedSubject].indexOf(topic);
        selectedTopics[selectedSubject].splice(index, 1);
    } else {
        selectedTopics[selectedSubject].push(topic)
    }
    selectedTopics = selectedTopics
}
</script>

<div class="mt-6">
    <p class="uppercase text-gray-500 font-semibold text-xs">select topics within those subjects: (Maximum 10 topics)</p>
    <div class="flex flex-wrap flex-col sm:flex-row text-blue-600 sm:text-lg text-md bg-white mt-0.5">
        {#each topics[selectedBoard][selectedSubject] as Topic}
            <button class="flex mr-3 -ml-0.5 leading-9" on:click={() => pushTopic(Topic)}>
                <input class="checkbox-round my-auto m-1" type="checkbox" bind:group={selectedTopics[selectedSubject]} value={Topic}>
                <p class="hover:text-blue-800">{Topic}</p>
            </button>
        {/each}
    </div>
</div>

<style>
.checkbox-round {
    width: 15px;
    height: 15px;
    background-color: #ECF5FE;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #507ABD;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}
.checkbox-round:checked {
    margin: 1;
    background-color: #507ABD;
}
</style>