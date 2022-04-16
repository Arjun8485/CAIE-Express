<script>
    export let questionsIndex
    export let main_container_content
    export let IndexModifierBtnClasses
    function decrementIndex() {
        if ( questionsIndex >= 1) {
            main_container_content = "Question";
            questionsIndex--
        }
    }
</script>

<div class="{IndexModifierBtnClasses}" on:click={decrementIndex}>
    <div>PREVIOUS <br> QUESTION
    </div>
</div>