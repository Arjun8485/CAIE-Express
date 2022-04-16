<script>
    export let questionsId
    export let main_container_content
    export let IndexModifierBtnClasses
    export let questionsIndex

    function incrementIndex() {
        if (questionsIndex +1 != questionsId.length) {
            main_container_content = "Question";
            questionsIndex++
            console.log(questionsIndex)
        }
    }
</script>

<div class="{IndexModifierBtnClasses}" on:click={incrementIndex}>
    <div>NEXT <br> QUESTION</div>
</div>