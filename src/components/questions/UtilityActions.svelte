<script>
    import CommitQuestionBtn from "./UtilityActions/CommitQuestionBtn.svelte";
    import DeleteQuestion from "./UtilityActions/DeleteQuestion.svelte";
    import QuestionCompleteBtn from "./UtilityActions/QuestionCompleteBtn.svelte";
    import MainContainerToggleBtns from "./UtilityActions/MainContainerToggleBtns.svelte";

    export let selectedSubject
    export let questionsId
    export let questionsObject
    export let isPreview
    export let questionsIndex
    export let usersCompletedQuestions
    export let main_container_content
    export let utilityButtons

    const commonBtnClasses = "rounded-sm flex justify-center items-center h-10 w-full"
    const utilityBtnClasses = `bg-yellow-400 text-white hover:bg-yellow-500 ${commonBtnClasses}`;
    const MainContainerToggleBtnsClasses = `border-2 border-black ${commonBtnClasses}`;
</script>

{#if questionsId.length > 0}
    <div class="flex flex-col md:w-1/6 space-y-4 md:space-y-0 animate-opacity font-semibold">
        <div class="flex md:flex-col md:space-y-3 md:space-x-0 sm:flex-row sm:space-y-0 sm:space-x-2 flex-col space-y-2 space-x-0 w-full md:justify-between md:mb-auto">
            <MainContainerToggleBtns 
                {utilityButtons}
                {MainContainerToggleBtnsClasses}
                bind:main_container_content={main_container_content}
                on:fetchMoreQuestions
            />
        </div>
        <div class="flex flex-col w-full mt-auto space-y-3">
            {#if isPreview}
                <CommitQuestionBtn 
                    {questionsId}
                    {questionsObject}
                    {selectedSubject}
                    bind:questionsIndex
                    {utilityBtnClasses}
                    bind:usersCompletedQuestions
                />
                <DeleteQuestion
                    bind:questionsIndex
                    {questionsId}
                    {utilityBtnClasses}
                />
            {:else}
                <QuestionCompleteBtn
                    {selectedSubject}
                    {questionsIndex}
                    {questionsObject}
                    {usersCompletedQuestions}
                />
            {/if}
        </div>
    </div>
{/if}
