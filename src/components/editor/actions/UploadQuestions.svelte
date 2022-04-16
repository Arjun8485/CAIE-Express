<script>
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "../../../stores/firebase.js";
import { user } from "../../../stores/user.js"

import PastPaperDetails from "./Upload Questions/PastPaperDetails.svelte";
import QuestionsDetails from "./Upload Questions/QuestionDetails.svelte";
import Loader from "../../../components/global/Loader.svelte";

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

let pastPaper = {
    subject: undefined,
    year: undefined, 
    month: undefined,
    series: undefined,
    component: undefined
}
let question = {
    input: undefined,
    fileName: undefined,
    file: undefined,
    fileLocation: undefined,
    link: undefined,
    fileType: undefined,
    topic: undefined,
    upload: {
        state: undefined,
        progress: undefined,
        error: undefined
    }
}
let answer = {
    input: undefined,
    fileName: undefined,
    file: undefined,
    fileLocation: undefined,
    link: undefined,
    fileType: undefined,
    upload: {
        state: undefined,
        progress: undefined,
        error: undefined
    }
} 
let documentError
let submitStatus = "Submit";
let pastPaperExists
let existingQuestions
let questionOrigin
let User
user.subscribe(value => {
    User = value
})

$: questionOrigin  = `${pastPaper.year}/${pastPaper.month}/${pastPaper.component}${pastPaper.series}/${question.fileName}`;

async function checkIfQuestionExists() {
    existingQuestions = []
    submitStatus = "Submitting"

    const q = query(collection(db, "preview"), where("questionOrigin", "==", questionOrigin), where("question.subject", "==", pastPaper.subject));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        existingQuestions.push(doc.data())        
    });

    const q2 = query(collection(db, pastPaper.subject),
        where("questionOrigin", "==", questionOrigin),
    );
    const query2Snapshot = await getDocs(q2);
    query2Snapshot.forEach((doc) => {
        existingQuestions.push(doc.data())        
    });

    console.log(existingQuestions)
    if (existingQuestions.length) {
        window.alert("This question already exists! Try uploading a different file")
        submitStatus = "Submit"
        resetInputs()
    } else {
        submitQuestion()
    }
}
async function submitQuestion() {
    if (question.upload.state === "Complete" && answer.upload.state === "Complete") {
        question.fileType = question.file.type
        answer.fileType = answer.file.type
        try {
            const docRef = await addDoc(collection(db, "preview"), {
                question: {
                    subject: pastPaper.subject,
                    link: question.link,
                    fileType: question.fileType
                },
                questionOrigin: questionOrigin,
                answer: {
                    link: answer.link,
                    fileType: answer.fileType
                },
                pastPaper: {year: pastPaper.year, month: pastPaper.month, series: pastPaper.series, question: question.fileName, component: pastPaper.component},
                uploadedBy: User.email,
                uploadersuid: User.uid
        });
        console.log("Document written with ID: ", docRef.id);
        submitStatus = "Submit"
        window.alert(`document id: ${docRef.id}`)
        resetInputs()
        } catch (e) {
            documentError = e
            console.error("Error uploading document: ", e);
            window.alert(e)
        }
    }

}

function resetInputs() {
    question.link = undefined
    answer.link = undefined
    question.upload.state = undefined
    question.upload.progress = undefined
    question.upload.error = undefined
    answer.upload.state = undefined
    answer.upload.progress = undefined
    answer.upload.error = undefined
    question.topic = undefined
}
$: console.log(pastPaper)
</script>


<div class="mx-auto w-8/12 mb-10 m-4">
    <PastPaperDetails bind:pastPaper bind:pastPaperExists />
        {#if pastPaper.month && pastPaper.series && pastPaper.year && pastPaper.component}
            <QuestionsDetails bind:question bind:answer {pastPaper}/>
        {/if}
        <br><br><br>
        {#if question.link && answer.link}
            <div class="flex w-5/6 mx-auto">
                <button  class="bg-yellow-400 py-4 mx-auto rounded-sm w-full text-white font-bold border-none animate-zoom flex justify-center" on:click|preventDefault={checkIfQuestionExists}>
                    {#if submitStatus === "Submit"}
                        <span>Submit</span>
                    {:else}
                        <div class="flex justify-center">
                            <Loader />
                            <span class="ml-4">Submitting</span>
                        </div>
                    {/if}
                </button>
            </div>
            <br>
            <br>
        {/if}
</div>
    