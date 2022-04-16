<script>
    import { firebaseConfig } from "../../../../stores/firebase.js";

    import QuestionFileInput from "./QuestionDetails/QuestionFileInput.svelte"
    import AnswerFileInput from "./QuestionDetails/AnswerFileInput.svelte"

    export let question
    export let answer
    export let pastPaper
</script>

<form action="" class="w-5/6 mx-auto border-red-400 border-2 p-5 rounded-md">
    <h2 class="font-semibold text-3xl text-blue text-center mt-8">Question and answer details</h2>
    <!--Question and answer file-->
    <div class="mt-8">
        {#if pastPaper.subject && pastPaper.year && pastPaper.month && pastPaper.series && pastPaper.component}
            <div class="flex justify-around">
                <div>
                    <QuestionFileInput bind:question {firebaseConfig} {pastPaper}/>
                </div>
                <div>
                    <AnswerFileInput bind:answer {firebaseConfig} {pastPaper}/>
                </div>
            </div>
        {/if}
    </div>
</form>