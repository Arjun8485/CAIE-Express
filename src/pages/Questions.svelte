<script>
//Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, where, getDocs, getDoc, limit, startAfter, orderBy, doc, Query} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../stores/firebase.js";

//Components
import Filters from "../components/questions/Filters.svelte";
import PostFilterActions from "../components/questions/PostFilterActions.svelte";
import ControllerPanel from "../components/questions/ControllerPanel.svelte";
import UtilityActions from "../components/questions/UtilityActions.svelte";
import MainContentContainer from "../components/questions/MainContentContainer.svelte"

//Firebase declarations
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();4

//Router
//import {push, pop, replace} from 'svelte-spa-router'

//Store
import { user, completedQuestions } from "../stores/user.js";
import { topics } from "../stores/subjects.js";

//export let params = {}

window.scrollTo(0, 0);

let usersCompletedQuestions
completedQuestions.subscribe(value => {
    usersCompletedQuestions = value
})

let questionsObject = [];
let questionsId = [];
let questionsIndex = 0;
let selectedSubject = "placeholder";
let selectedBoard = "placeholder";
let IncludeCompletedQuestions
let isPreview = false
let main_container_content = "Question";
let completedProgressBarWidth;
let selectedTopics = {
    Physics: [],
    Chemistry: [],
    Maths_Pure_1: [],
    IT: [],
    Biology: [],
    Economics: [],
    Maths_Stats_1: []
}
let lastVisible
let questionLimit = 0;
let numberOfQuestions


const utilityButtons = ["Question", "Answer", "Load more Questions"];

completedQuestions.subscribe(value => {
    usersCompletedQuestions = value
})



$: questionsIndex, main_container_content = "Question";

/*
    async function getQuestions() {
        let querySnapshot = await getDocs(Query("initialFetch"))
        lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        
        querySnapshot.forEach((doc) => {
            totalNumberOfQuestionsFetched++
            if (IncludeCompletedQuestions || isPreview) {
                questionsObject.push(doc.data())
                questionsId.push(doc.id)
                questionsObject = questionsObject
                questionsId = questionsId
            } else if (!IncludeCompletedQuestions && !usersCompletedQuestions[selectedSubject].includes(doc.data().questionOrigin)) {
                questionsObject.push(doc.data())
                questionsId.push(doc.id)
                questionsObject = questionsObject
                questionsId = questionsId
            }
        })
        setsOfQuestionsFetched++
        if (totalNumberOfQuestionsFetched === 5 && totalNumberOfQuestionsFetched > questionsId.length) {
            fetchMoreQuestions()
        } else if (totalNumberOfQuestionsFetched === 0) {
            window.alert("No more questions of this topic")
        }
    }
    async function fetchMoreQuestions() {
        const querySnapshot = await getDocs(Query("afterFetch"))
        if (setsOfQuestionsFetched * 5 === totalNumberOfQuestionsFetched) {
            while (condition) {
                querySnapshot.forEach((doc) => {
                    totalNumberOfQuestionsFetched
                    if (!usersCompletedQuestions[selectedSubject].includes(doc.data().questionOrigin) && !IncludeCompletedQuestions) {
                        questionsObject.push(doc.data())
                        questionsId.push(doc.id)
                    } else if (IncludeCompletedQuestions || isPreview) {
                        questionsObject.push(doc.data())
                        questionsId.push(doc.id)
                    }
                })
                setsOfQuestionsFetched++
            }
        } else {
            window.alert("No more questions!")
        }
    }
    function Query(fetchType) {
        function Collection() {
            if (isPreview) {
                return collection(db, "preview")
            } else {
                return collection(db, selectedSubject)
            }
        }
        function Where() {
            let topicsToExclude = []
            for (let i = 0; i < topics[selectedBoard][selectedSubject].length; i++) {
                if (!selectedTopics[selectedSubject].includes(topics[selectedBoard][selectedSubject][i])) {
                    topicsToExclude.push(topics[selectedBoard][selectedSubject][i])
                }
            }
            if (selectedTopics[selectedSubject].length <= 10 && !isPreview) {
                return where("question.topic", "in", selectedTopics[selectedSubject])
            } else if (selectedTopics[selectedSubject].length > 10 && !isPreview && topicsToExclude.length) {
                return where("question.topic", "not-in", topicsToExclude)
            } else if (selectedTopics[selectedSubject].length > 10 && !isPreview && !topicsToExclude.length) {
                return "no condition"
            } else if (isPreview) {
                return where("question.subject", "==", selectedSubject)
            }
        }
        if (fetchType === "initialFetch") {
            if (Where() === "no condition") {
                return query(Collection(), orderBy("questionOrigin", "desc"), limit(5), where("pastPaper.component", "==", selectedComponent))
            } else {
                return query(Collection(), Where(), orderBy("questionOrigin", "desc"), limit(5), where("pastPaper.component", "==", selectedComponent))
            }
        } else if (fetchType === "afterFetch") {
            if (Where() === "no condition") {
                return query(Collection(), orderBy("questionOrigin", "desc"), limit(5), startAfter(lastVisible), where("pastPaper.component", "==", selectedComponent))
            } else {
                return query(Collection(), Where(), orderBy("questionOrigin", "desc"), limit(5), startAfter(lastVisible), where("pastPaper.component", "==", selectedComponent))
            }
    }
*/
/*
    $:selectedSubject, updateURL()
    $:questionsIndex, updateURL()

    function updateURL() {
        if (selectedSubject != "placeholder") {
            replace(`/Questions/${selectedSubject}/${questionsId[questionsIndex]}`)
        }
    }
    QFromLink()
    async function QFromLink() {
        if (params.docID && params.docID != ":docID") {
            const docRef = doc(db, params.subject, params.docID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                questionsObject.push(docSnap.data())
                questionsId.push(docSnap.id)
                questionsObject = questionsObject
                questionsId = questionsId
            } else {
                window.alert("Invalid Url")
                //replace(`#/Questions/:subject/:docID`)
            }
        }
        console.log(questionsObject)
    }
*/
$: numberOfQuestions, questionLimit = numberOfQuestions
$: {
    if (!questionLimit) {
        questionLimit = numberOfQuestions
    }
}
async function fetchQuestions() {
    let querySnapshot = await getDocs(Query());
    lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];

    function Query() {
            function Collection() {
                if (isPreview) {
                    return collection(db, "preview")
                } else {
                    return collection(db, selectedSubject)
                }
            }
            function Where() {
                let topicsToExclude = []
                for (let i = 0; i < topics[selectedBoard][selectedSubject].length; i++) {
                    if (!selectedTopics[selectedSubject].includes(topics[selectedBoard][selectedSubject][i])) {
                        topicsToExclude.push(topics[selectedBoard][selectedSubject][i])
                    }
                }
                if (selectedTopics[selectedSubject].length <= 10 && !isPreview) {
                    return where("question.topic", "in", selectedTopics[selectedSubject])
                } else if (selectedTopics[selectedSubject].length > 10 && !isPreview && topicsToExclude.length) {
                    return where("question.topic", "not-in", topicsToExclude)
                } else if ((selectedTopics[selectedSubject].length > 10 && !topicsToExclude.length) || isPreview) {
                    return where("question.subject", "==", selectedSubject)
                }
            }
            if (lastVisible) {
                return query(Collection(), orderBy("questionOrigin", "asc"), limit(questionLimit), Where(), startAfter(lastVisible))
            } else {
                return query(Collection(), orderBy("questionOrigin", "asc"), limit(questionLimit), Where())
            }
        }

    let questionsPushed = 0
    let totalQuestionsFetched = 0;

    Fetch()
    async function Fetch() {
        totalQuestionsFetched = 0
        querySnapshot.forEach((doc) => {
            console.log(doc.data().questionOrigin)
            if (!questionsId.includes(doc.id)) {
                totalQuestionsFetched++
                if (IncludeCompletedQuestions || isPreview) {
                    questionsObject.push(doc.data())
                    questionsId.push(doc.id)
                    questionsPushed++
                } else if (!IncludeCompletedQuestions && !usersCompletedQuestions[selectedSubject].includes(doc.data().questionOrigin)) {
                    questionsObject.push(doc.data())
                    questionsId.push(doc.id)
                    questionsPushed++
                }
            }
        })
    }

    if (totalQuestionsFetched && questionsPushed < questionLimit) {
        questionLimit = questionLimit - questionsPushed
        fetchQuestions()
    } else if (!totalQuestionsFetched) {
        showAlert()
    }

    questionsObject = questionsObject
    questionsId = questionsId

    function showAlert() {
        window.alert("No more questions of this topic!")
    }
}

function resetFilters() {
    location.reload();
} 
window.addEventListener('contextmenu', function (e) { 
    e.preventDefault(); 
}, false);

document.getElementById("subscribeCheckbox")
</script>
    
<div class="animate-opacity">
    <Filters 
        bind:selectedBoard
        bind:selectedSubject
        bind:selectedTopics
        bind:IncludeCompletedQuestions
        bind:numberOfQuestions
        {isPreview}
    />

    {#if $user.roles.admin && selectedSubject != "placeholder"}
        <div class="flex mt-6">
            <p class="uppercase text-gray-500 font-semibold text-xs mr-4">Preview questions?</p>
            <input type="checkbox" bind:checked={isPreview}>
        </div>
    {/if}

    <PostFilterActions 
        {selectedTopics} {isPreview}
        on:getQuestions={fetchQuestions}
        on:resetFilters={resetFilters}
    />

    <ControllerPanel
        bind:questionsIndex
        bind:main_container_content
        bind:completedProgressBarWidth
        {questionsObject} 
        {isPreview}
        {selectedSubject}
        {questionsId}
    />

    <div class="flex md:flex-row flex-col md:justify-between" style="{questionsId.length > 0 ? "max-height: 850px; min-height: 400px;" : ""}">
        <UtilityActions
            {utilityButtons}
            {selectedSubject}
            {questionsId}
            bind:questionsIndex
            {questionsObject}
            {isPreview}
            bind:usersCompletedQuestions
            bind:main_container_content
            on:fetchMoreQuestions={fetchQuestions}
        />
        <MainContentContainer
            {completedProgressBarWidth}
            {main_container_content}
            {questionsObject}
            {questionsIndex}
            {questionsId}
        />
    </div>
</div>