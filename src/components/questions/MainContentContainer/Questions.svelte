<script>
    export let questionsObject
    export let questionsIndex
</script>

{#if questionsObject[questionsIndex].question.fileType == "PNG" || questionsObject[questionsIndex].question.fileType == "image/png"}
    {#each questionsObject as object, index}
        <img alt="{object.question.topic}" src="{object.question.link}" class="w-full {questionsIndex == index ? 'block' : 'hidden'}">
    {/each}
{:else if questionsObject[questionsIndex].question.fileType == "pdf" || questionsObject[questionsIndex].question.fileType == "application/pdf"}
    {#each questionsObject as object, index}
        <iframe src="{object.question.link}#toolbar=0" class="w-full {questionsIndex == index ? 'block' : 'hidden'}" title="{object.question.topic}" referrerpolicy="no-referrer" style="height: 600px;"></iframe>
    {/each}
{/if}
