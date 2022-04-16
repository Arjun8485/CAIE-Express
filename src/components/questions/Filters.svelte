<script>
    import ExamBoards from "./filters/ExamBoards.svelte";
    import Subjects from "./filters/Subjects.svelte"
    import Topics from "./filters/Topics.svelte"
    import IncludeCompletedQuestionsSwitch from "./filters/IncludeCompletedQuestionsSwitch.svelte";
    
    export let selectedBoard
    export let selectedSubject
    export let selectedTopics = {
        Physics: [],
        Chemistry: [],
        Maths_Pure_1: [],
        IT: [],
        Biology: [],
        Economics: []
    }
    export let IncludeCompletedQuestions = true
    export let isPreview
    export let numberOfQuestions = 5;
</script>
    
<!--Select board-->
<ExamBoards bind:selectedBoard/>

{#if selectedBoard == "AS_level"}
    <!--Select subject-->
    <Subjects bind:selectedSubject />
    {#if selectedSubject != "placeholder"}
        {#if !isPreview}
            <!--Select topic-->
            <Topics bind:selectedTopics bind:selectedBoard bind:selectedSubject/>
        {/if}
        {#if selectedTopics[selectedSubject].length != 0}
            {#if !isPreview}
                <!--Include completed questions-->
                <IncludeCompletedQuestionsSwitch bind:IncludeCompletedQuestions/>
            {/if}
            <div class="mt-10">
                <p class="uppercase text-gray-500 font-semibold text-xs">number of questions:</p>
                <div class="flex mt-2">
                    <input type="range" min="1" max="15" bind:value={numberOfQuestions}>
                    {#if numberOfQuestions}
                        <p class="ml-4 text-blue-600 font-semibold">{numberOfQuestions} Question(s)</p>
                    {/if}
                </div>
            </div>
        {/if}
    {/if}
{:else if selectedBoard == "A_level"}
    <p class="text-gray-500 font-semibold text-xs mt-6">Support for your board coming soon...</p>
{/if}
