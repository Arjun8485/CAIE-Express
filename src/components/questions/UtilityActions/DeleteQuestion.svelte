<script>
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../stores/firebase.js";
import { doc, deleteDoc, getFirestore } from 'firebase/firestore';
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export let questionsId
export let questionsIndex
export let utilityBtnClasses

async function deleteQuestion() {
    await deleteDoc(doc(db, "preview", questionsId[questionsIndex]
    )).then(() => {
        window.alert("Deleted!")
    }).then(() => {
        questionsIndex++
    })
}
</script>


<button class="{utilityBtnClasses}" on:click={deleteQuestion}>
    Delete
</button>
