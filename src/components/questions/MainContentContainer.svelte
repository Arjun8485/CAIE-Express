<script>
    import ProgressBar from "./MainContentContainer/ProgressBar.svelte";
    import Questions from "./MainContentContainer/Questions.svelte";
    import LoggedInDefaultContent from "./MainContentContainer/LoggedInDefaultContent.svelte";
    import Answers from "./MainContentContainer/Answers.svelte";
    import DefaultContent from "./MainContentContainer/DefaultContent.svelte";

    import { user } from "../../stores/user.js"

    export let completedProgressBarWidth
    export let main_container_content
    export let questionsObject
    export let questionsIndex
    export let questionsId

</script>
<div class="{questionsId.length > 0 ? "md:w-9/12 md:mt-0 mt-12" : "w-full mt-5 border-gray-400 border-2"}">
    <ProgressBar {completedProgressBarWidth} {questionsId}/>
    {#if main_container_content == "Question"}
        <div class="{questionsId.length ? "border-2 border-gray-400" : ""} flex">
            {#if questionsObject.length}
                <Questions {questionsObject} {questionsIndex}/>
            {:else}
                <div class="md:w-6/12 sm:w-8/12 w-10/12 mx-auto sm:my-20 my-10">
                    {#if $user.uid}
                        <LoggedInDefaultContent />
                    {:else}
                        <DefaultContent />
                    {/if}
                </div>
            {/if}
        </div>
    {/if}
    {#if main_container_content == "Answer"}
        <div class="h-full {questionsId.length ? "border-2 border-gray-400" : ""} flex">
            <Answers {questionsObject} {questionsIndex}/>
        </div>
    {/if}
</div>