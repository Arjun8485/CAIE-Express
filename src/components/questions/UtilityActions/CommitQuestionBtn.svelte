<script>
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../stores/firebase.js";
import { doc, setDoc, serverTimestamp, deleteDoc, getFirestore } from 'firebase/firestore';
const app = initializeApp(firebaseConfig);
const db = getFirestore();

import Loader from "../../Global/Loader.svelte"

export let questionsId
export let questionsIndex
export let questionsObject
export let selectedSubject
export let utilityBtnClasses

let ref
$: ref = questionsObject[questionsIndex]
$: console.log(questionsObject[questionsIndex])
async function commitQuestion() {
    ref.commitStatus = "commiting";
    await setDoc(doc(db, selectedSubject, questionsId[questionsIndex]), {
        question: {
            subject: ref.question.subject,
            link: ref.question.link,
            fileType: ref.question.fileType,
            topic: ref.question.topic
        },
        questionOrigin: ref.questionOrigin,
        answer: {
            link: ref.answer.link,
            fileType: ref.answer.fileType
        },
        pastPaper: {
            year: ref.pastPaper.year, 
            month: ref.pastPaper.month, 
            series: ref.pastPaper.series, 
            question: ref.pastPaper.question, 
            component: ref.pastPaper.component
        },
        uploadedBy: ref.uploadedBy,
        uploadersuid: ref.uploadersuid
    }).then(() => {
        deleteQuestion()
    })
}

async function deleteQuestion() {
    await deleteDoc(doc(db, "preview", questionsId[questionsIndex]
    )).then(() => {
        ref.commitStatus = "committed";
        questionsIndex++
    })
    console.log(questionsId[questionsIndex])
}

</script>

<button class="{utilityBtnClasses}" on:click={commitQuestion}>
    {#if !ref.commitStatus}
        Commit
    {:else if ref.commitStatus == "commiting"}
        <Loader />
        <span class="ml-4">commiting</span>
    {:else if ref.commitStatus == "committed"}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span class="mr-4">committed</span>
    {/if}
</button>
