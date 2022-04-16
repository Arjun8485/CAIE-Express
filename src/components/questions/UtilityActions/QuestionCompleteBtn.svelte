<script>
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    getDoc,
    arrayUnion,
    updateDoc,
} from 'firebase/firestore';
//stores
import { firebaseConfig } from "../../../stores/firebase.js";
import { user } from "../../../stores/user.js"

import Loader from "../../Global/Loader.svelte"

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export let selectedSubject
export let questionsIndex
export let usersCompletedQuestions
export let questionsObject

let AnswerCompleted = false
let loader = false
let uid 

user.subscribe(value => {
    uid = value.uid
})

async function toggleQuestionCompleted() {
    let ref = doc(db, `users/${uid}/subjects/${selectedSubject}`);
    const docSnap = await getDoc(ref);
    questionsObject[questionsIndex].AnswerCompleted = true
    loader = true
    if (AnswerCompleted === false) {
        await updateDoc(ref, {
            "completedQuestions": arrayUnion(questionsObject[questionsIndex].questionOrigin)
        }).then(() => {
            usersCompletedQuestions[questionsObject[questionsIndex].question.subject].push(questionsObject[questionsIndex].questionOrigin)
            checkForCompletion()
        })
    }
}
$:questionsIndex, checkForCompletion()

function checkForCompletion() {
    loader = false
    if (usersCompletedQuestions[selectedSubject].includes(questionsObject[questionsIndex].questionOrigin)) {
        AnswerCompleted = true
    }   else {
        AnswerCompleted = false
    }
}
</script>
<button class="font-semibold py-2 px-4 rounded-sm bg-yellow-400 text-white flex w-full" on:click={toggleQuestionCompleted} >
    {#if loader && !AnswerCompleted}
        <div class="mr-2">
            <Loader />
        </div>
    {:else if !loader || AnswerCompleted}
        {#if AnswerCompleted}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
        {:else if !AnswerCompleted}
            <div class="p-2.5 border-white border-2 mr-3 rounded-md font-semibold {AnswerCompleted === true ? 'bg-white' : 'bg-yellow-400'}">
            </div>
        {/if}
    {/if}


    {#if !AnswerCompleted}
        <div>Mark as Complete</div>
    {:else}
        <div>Completed</div>
    {/if}
</button>
