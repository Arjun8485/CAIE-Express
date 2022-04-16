<script>
    import { topics } from "../../../stores/subjects.js"
    export let questionsObject;
    export let questionsIndex;
    export let isPreview
    export let selectedSubject
    export let questionsId

    let ref
    $: ref = questionsObject[questionsIndex]
</script>

<div class="md:w-8/12 w-full px-1 md:my-0 my-5 py-2">
    <div class="my-auto">
        {#if isPreview}
            <p>Topic:
            <select class="text-blue" bind:value={questionsObject[questionsIndex].question.topic}>
                {#each topics.AS_level[selectedSubject] as topic}
                    <option value={topic}>{topic}</option>
                {/each}
            </select>
            </p>
            <p>docid: {questionsId[questionsIndex]}</p>
                <p class="mt-2">Question origin: {questionsObject[questionsIndex].questionOrigin}</p>
            <p class="mt-2">Uploaded by: {questionsObject[questionsIndex].uploadedBy}</p>
        {:else}
            <p>Topic: {questionsObject[questionsIndex].question.topic}</p>
            <p class="mt-2">Question origin: {questionsObject[questionsIndex].questionOrigin}</p>
        {/if}

    </div>
</div>
