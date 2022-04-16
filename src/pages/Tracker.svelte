<script>
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
const db = getFirestore();

import { user } from "../stores/user.js";

import ExamBoards from "../components/questions/filters/ExamBoards.svelte"
import Subjects from "../components/questions/filters/Subjects.svelte";
import Filters from "../components/tracker/Filters.svelte";

let selectedBoard = "AS_level"
let selectedSubject
let uid
let selectedFilters= {
    years: '',
    months: '', 
    series: '',
    component: ''
}

$: if (selectedSubject) {
    selectedFilters= {
        years: '',
        months: '', 
        series: '',
        component: ''
    }
}

user.subscribe(value => {
    uid = value.uid
})

let pastPaper = {
    Physics: [
        {year: "2016", month: "MJ", series: "1", component:"2", questionCount: "7", questions: []},
        {year: "2016", month: "MJ", series: "2", component:"2", questionCount: "8", questions: []},
        {year: "2016", month: "MJ", series: "3", component:"2", questionCount: "8", questions: []},
        {year: "2016", month: "ON", series: "1", component:"2", questionCount: "7", questions: []},
        {year: "2016", month: "ON", series: "2", component:"2", questionCount: "6", questions: []},
        {year: "2016", month: "ON", series: "3", component:"2", questionCount: "7", questions: []},
        {year: "2016", month: "FM", series: "2", component:"2", questionCount: "6", questions: []},
        {year: "2017", month: "FM", series: "2", component:"2", questionCount: "7", questions: []},
        {year: "2017", month: "MJ", series: "1", component:"2", questionCount: "7", questions: []},
        {year: "2017", month: "MJ", series: "2", component:"2", questionCount: "8", questions: []},
        {year: "2017", month: "MJ", series: "3", component:"2", questionCount: "7", questions: []},
        {year: "2017", month: "ON", series: "1", component:"2", questionCount: "8", questions: []},
        {year: "2017", month: "ON", series: "2", component:"2", questionCount: "7", questions: []},
        {year: "2017", month: "ON", series: "3", component:"2", questionCount: "7", questions: []},
        {year: "2018", month: "ON", series: "3", component:"2", questionCount: "7", questions: []},
        {year: "2018", month: "ON", series: "2", component:"2", questionCount: "8", questions: []},
        {year: "2018", month: "ON", series: "1", component:"2", questionCount: "6", questions: []},
        {year: "2018", month: "MJ", series: "3", component:"2", questionCount: "7", questions: []},
        {year: "2018", month: "MJ", series: "2", component:"2", questionCount: "7", questions: []},
        {year: "2018", month: "MJ", series: "1", component:"2", questionCount: "7", questions: []},
        {year: "2018", month: "FM", series: "2", component:"2", questionCount: "6", questions: []},
        {year: "2019", month: "FM", series: "2", component:"2", questionCount: "7", questions: []},
        {year: "2019", month: "MJ", series: "1", component:"2", questionCount: "7", questions: []},
        {year: "2019", month: "MJ", series: "2", component:"2", questionCount: "6", questions: []},
        {year: "2019", month: "MJ", series: "3", component:"2", questionCount: "7", questions: []},
        {year: "2019", month: "ON", series: "1", component:"2", questionCount: "7", questions: []},
        {year: "2019", month: "ON", series: "2", component:"2", questionCount: "7", questions: []},
        {year: "2019", month: "ON", series: "3", component:"2", questionCount: "7", questions: []},
        {year: "2020", month: "FM", series: "2", component:"2", questionCount: "7", questions: []},
        {year: "2020", month: "MJ", series: "1", component:"2", questionCount: "6", questions: []},
        {year: "2020", month: "MJ", series: "2", component:"2", questionCount: "7", questions: []},
        {year: "2020", month: "MJ", series: "3", component:"2", questionCount: "7", questions: []},
        {year: "2020", month: "ON", series: "1", component:"2", questionCount: "8", questions: []},
        {year: "2020", month: "ON", series: "2", component:"2", questionCount: "7", questions: []},
        {year: "2020", month: "ON", series: "3", component:"2", questionCount: "7", questions: []},
        {year: "2021", month: "FM", series: "2", component:"2", questionCount: "7", questions: []},
        {year: "2021", month: "MJ", series: "1", component:"2", questionCount: "6", questions: []},
        {year: "2021", month: "MJ", series: "2", component:"2", questionCount: "6", questions: []},
        {year: "2021", month: "MJ", series: "3", component:"2", questionCount: "6", questions: []},

        {year: "2016", month: "MJ", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2016", month: "MJ", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2016", month: "MJ", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2016", month: "ON", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2016", month: "ON", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2016", month: "ON", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2016", month: "FM", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2017", month: "FM", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2017", month: "MJ", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2017", month: "MJ", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2017", month: "MJ", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2017", month: "ON", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2017", month: "ON", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2017", month: "ON", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2018", month: "ON", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2018", month: "ON", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2018", month: "ON", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2018", month: "MJ", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2018", month: "MJ", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2018", month: "MJ", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2018", month: "FM", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2019", month: "FM", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2019", month: "MJ", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2019", month: "MJ", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2019", month: "MJ", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2019", month: "ON", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2019", month: "ON", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2019", month: "ON", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2020", month: "FM", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2020", month: "MJ", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2020", month: "MJ", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2020", month: "MJ", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2020", month: "ON", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2020", month: "ON", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2020", month: "ON", series: "3", component:"1", questionCount: "5", questions: []},
        {year: "2021", month: "FM", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2021", month: "MJ", series: "1", component:"1", questionCount: "5", questions: []},
        {year: "2021", month: "MJ", series: "2", component:"1", questionCount: "5", questions: []},
        {year: "2021", month: "MJ", series: "3", component:"1", questionCount: "5", questions: []},
    ],
    Chemistry: [
        {year: "2016", month: "MJ", series: "1", component: "2", questionCount: "5", questions: []},
        {year: "2016", month: "MJ", series: "2", component: "2", questionCount: "5", questions: []},
        {year: "2016", month: "MJ", series: "3", component: "2", questionCount: "4", questions: []},
        {year: "2016", month: "ON", series: "1", component: "2", questionCount: "5", questions: []},
        {year: "2016", month: "ON", series: "2", component: "2", questionCount: "5", questions: []},
        {year: "2016", month: "ON", series: "3", component: "2", questionCount: "5", questions: []},
        {year: "2016", month: "FM", series: "2", component: "2", questionCount: "5", questions: []},
        {year: "2017", month: "FM", series: "2", component: "2", questionCount: "3", questions: []},
        {year: "2017", month: "MJ", series: "1", component: "2", questionCount: "4", questions: []},
        {year: "2017", month: "MJ", series: "2", component: "2", questionCount: "4", questions: []},
        {year: "2017", month: "MJ", series: "3", component: "2", questionCount: "4", questions: []},
        {year: "2017", month: "ON", series: "1", component: "2", questionCount: "3", questions: []},
        {year: "2017", month: "ON", series: "2", component: "2", questionCount: "4", questions: []},
        {year: "2017", month: "ON", series: "3", component: "2", questionCount: "3", questions: []},
        {year: "2018", month: "ON", series: "3", component: "2", questionCount: "4", questions: []},
        {year: "2018", month: "ON", series: "2", component: "2", questionCount: "4", questions: []},
        {year: "2018", month: "ON", series: "1", component: "2", questionCount: "4", questions: []},
        {year: "2018", month: "MJ", series: "3", component: "2", questionCount: "4", questions: []},
        {year: "2018", month: "MJ", series: "2", component: "2", questionCount: "4", questions: []},
        {year: "2018", month: "MJ", series: "1", component: "2", questionCount: "4", questions: []},
        {year: "2018", month: "FM", series: "2", component: "2", questionCount: "4", questions: []},
        {year: "2019", month: "FM", series: "2", component: "2", questionCount: "4", questions: []},
        {year: "2019", month: "MJ", series: "1", component: "2", questionCount: "5", questions: []},
        {year: "2019", month: "MJ", series: "2", component: "2", questionCount: "5", questions: []},
        {year: "2019", month: "MJ", series: "3", component: "2", questionCount: "6", questions: []},
        {year: "2019", month: "ON", series: "1", component: "2", questionCount: "4", questions: []},
        {year: "2019", month: "ON", series: "2", component: "2", questionCount: "4", questions: []},
        {year: "2019", month: "ON", series: "3", component: "2", questionCount: "4", questions: []},
        {year: "2020", month: "FM", series: "2", component: "2", questionCount: "3", questions: []},
        {year: "2020", month: "MJ", series: "1", component: "2", questionCount: "6", questions: []},
        {year: "2020", month: "MJ", series: "2", component: "2", questionCount: "5", questions: []},
        {year: "2020", month: "MJ", series: "3", component: "2", questionCount: "5", questions: []},
        {year: "2020", month: "ON", series: "1", component: "2", questionCount: "4", questions: []},
        {year: "2020", month: "ON", series: "2", component: "2", questionCount: "4", questions: []},
        {year: "2020", month: "ON", series: "3", component: "2", questionCount: "4", questions: []},
        {year: "2021", month: "FM", series: "2", component: "2", questionCount: "4", questions: []},
        {year: "2021", month: "MJ", series: "1", component: "2", questionCount: "6", questions: []},
        {year: "2021", month: "MJ", series: "2", component: "2", questionCount: "5", questions: []},
        {year: "2021", month: "MJ", series: "3", component: "2", questionCount: "5", questions: []},

        {year: "2016", month: "MJ", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2016", month: "MJ", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2016", month: "MJ", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2016", month: "ON", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2016", month: "ON", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2016", month: "ON", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2016", month: "FM", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2017", month: "FM", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2017", month: "MJ", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2017", month: "MJ", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2017", month: "MJ", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2017", month: "ON", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2017", month: "ON", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2017", month: "ON", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2018", month: "ON", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2018", month: "ON", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2018", month: "ON", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2018", month: "MJ", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2018", month: "MJ", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2018", month: "MJ", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2018", month: "FM", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2019", month: "FM", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2019", month: "MJ", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2019", month: "MJ", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2019", month: "MJ", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2019", month: "ON", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2019", month: "ON", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2019", month: "ON", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2020", month: "FM", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2020", month: "MJ", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2020", month: "MJ", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2020", month: "MJ", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2020", month: "ON", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2020", month: "ON", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2020", month: "ON", series: "3", component: "1", questionCount: "5", questions: []},
        {year: "2021", month: "FM", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2021", month: "MJ", series: "1", component: "1", questionCount: "5", questions: []},
        {year: "2021", month: "MJ", series: "2", component: "1", questionCount: "5", questions: []},
        {year: "2021", month: "MJ", series: "3", component: "1", questionCount: "5", questions: []},
    ],
    IT: [
        {year: "2017", month: "FM", series: "2", component: "1", questionCount: "11", questions: []},
        {year: "2017", month: "ON", series: "3", component: "1", questionCount: "13", questions: []},
        {year: "2017", month: "ON", series: "2", component: "1", questionCount: "11", questions: []},
        {year: "2017", month: "ON", series: "1", component: "1", questionCount: "11", questions: []},
        {year: "2017", month: "MJ", series: "3", component: "1", questionCount: "12", questions: []},
        {year: "2017", month: "MJ", series: "2", component: "1", questionCount: "15", questions: []},
        {year: "2017", month: "MJ", series: "1", component: "1", questionCount: "15", questions: []},
        {year: "2018", month: "FM", series: "2", component: "1", questionCount: "14", questions: []},
        {year: "2018", month: "ON", series: "3", component: "1", questionCount: "12", questions: []},
        {year: "2018", month: "ON", series: "2", component: "1", questionCount: "12", questions: []},
        {year: "2018", month: "ON", series: "1", component: "1", questionCount: "12", questions: []},
        {year: "2018", month: "MJ", series: "3", component: "1", questionCount: "11", questions: []},
        {year: "2018", month: "MJ", series: "2", component: "1", questionCount: "12", questions: []},
        {year: "2018", month: "MJ", series: "1", component: "1", questionCount: "12", questions: []},
        {year: "2019", month: "ON", series: "3", component: "1", questionCount: "12", questions: []},
        {year: "2019", month: "ON", series: "2", component: "1", questionCount: "13", questions: []},
        {year: "2019", month: "ON", series: "1", component: "1", questionCount: "12", questions: []},
        {year: "2019", month: "MJ", series: "3", component: "1", questionCount: "14", questions: []},
        {year: "2019", month: "MJ", series: "2", component: "1", questionCount: "14", questions: []},
        {year: "2019", month: "MJ", series: "1", component: "1", questionCount: "13", questions: []},
        {year: "2019", month: "FM", series: "2", component: "1", questionCount: "13", questions: []},
        {year: "2020", month: "ON", series: "1", component: "1", questionCount: "12", questions: []},
        {year: "2020", month: "ON", series: "2", component: "1", questionCount: "12", questions: []},
        {year: "2020", month: "ON", series: "3", component: "1", questionCount: "12", questions: []},
        {year: "2020", month: "FM", series: "2", component: "1", questionCount: "13", questions: []},
        {year: "2020", month: "MJ", series: "1", component: "1", questionCount: "12", questions: []},
        {year: "2020", month: "MJ", series: "2", component: "1", questionCount: "12", questions: []},
        {year: "2020", month: "MJ", series: "3", component: "1", questionCount: "12", questions: []},
        {year: "2021", month: "FM", series: "2", component: "1", questionCount: "13", questions: []},
        {year: "2021", month: "MJ", series: "1", component: "1", questionCount: "12", questions: []},
        {year: "2021", month: "MJ", series: "2", component: "1", questionCount: "12", questions: []},
        {year: "2021", month: "MJ", series: "3", component: "1", questionCount: "12", questions: []},

        {year: "2021", month: "FM", series: "", component: "2", questionCount: "10", questions: []},
        {year: "2021", month: "ON", series: "", component: "2", questionCount: "6", questions: []},
        {year: "2021", month: "MJ", series: "", component: "2", questionCount: "11", questions: []},
        {year: "2020", month: "FM", series: "", component: "2", questionCount: "9", questions: []},
        {year: "2020", month: "MJ", series: "", component: "2", questionCount: "8", questions: []},
        {year: "2020", month: "ON", series: "", component: "2", questionCount: "9", questions: []},
        {year: "2019", month: "FM", series: "", component: "2", questionCount: "20", questions: []},
        {year: "2019", month: "MJ", series: "", component: "2", questionCount: "19", questions: []},
        {year: "2019", month: "ON", series: "", component: "2", questionCount: "10", questions: []},
        {year: "2018", month: "FM", series: "", component: "2", questionCount: "10", questions: []},
        {year: "2018", month: "MJ", series: "", component: "2", questionCount: "13", questions: []},
        {year: "2018", month: "ON", series: "", component: "2", questionCount: "14", questions: []},
        {year: "2017", month: "FM", series: "", component: "2", questionCount: "24", questions: []},
        {year: "2017", month: "MJ", series: "", component: "2", questionCount: "3", questions: []},
        {year: "2017", month: "ON", series: "", component: "2", questionCount: "7", questions: []},
    ],
    Maths_Pure_1: [
        {year: "2017", month: "ON", series: "3", component: "1", questionCount: "11", questions: []},
        {year: "2017", month: "ON", series: "2", component: "1", questionCount: "10", questions: []},
        {year: "2017", month: "ON", series: "1", component: "1", questionCount: "10", questions: []},
        {year: "2017", month: "MJ", series: "3", component: "1", questionCount: "11", questions: []},
        {year: "2017", month: "MJ", series: "2", component: "1", questionCount: "10", questions: []},
        {year: "2017", month: "MJ", series: "1", component: "1", questionCount: "10", questions: []},
        {year: "2017", month: "FM", series: "2", component: "1", questionCount: "10", questions: []},
        
        {year: "2018", month: "ON", series: "3", component: "1", questionCount: "11", questions: []},
        {year: "2018", month: "ON", series: "2", component: "1", questionCount: "11", questions: []},
        {year: "2018", month: "ON", series: "1", component: "1", questionCount: "11", questions: []},
        {year: "2018", month: "MJ", series: "3", component: "1", questionCount: "11", questions: []},
        {year: "2018", month: "MJ", series: "2", component: "1", questionCount: "11", questions: []},
        {year: "2018", month: "MJ", series: "1", component: "1", questionCount: "10", questions: []},
        {year: "2018", month: "FM", series: "2", component: "1", questionCount: "11", questions: []},

        {year: "2019", month: "ON", series: "3", component: "1", questionCount: "11", questions: []},
        {year: "2019", month: "ON", series: "2", component: "1", questionCount: "10", questions: []},
        {year: "2019", month: "ON", series: "1", component: "1", questionCount: "11", questions: []},
        {year: "2019", month: "MJ", series: "3", component: "1", questionCount: "10", questions: []},
        {year: "2019", month: "MJ", series: "2", component: "1", questionCount: "11", questions: []},
        {year: "2019", month: "MJ", series: "1", component: "1", questionCount: "11", questions: []},
        {year: "2019", month: "FM", series: "2", component: "1", questionCount: "10", questions: []},

        {year: "2020", month: "ON", series: "3", component: "1", questionCount: "11", questions: []},
        {year: "2020", month: "ON", series: "2", component: "1", questionCount: "11", questions: []},
        {year: "2020", month: "ON", series: "1", component: "1", questionCount: "11", questions: []},
        {year: "2020", month: "MJ", series: "3", component: "1", questionCount: "11", questions: []},
        {year: "2020", month: "MJ", series: "2", component: "1", questionCount: "11", questions: []},
        {year: "2020", month: "MJ", series: "1", component: "1", questionCount: "11", questions: []},
        {year: "2020", month: "FM", series: "2", component: "1", questionCount: "12", questions: []},

        {year: "2021", month: "MJ", series: "3", component: "1", questionCount: "11", questions: []},
        {year: "2021", month: "MJ", series: "2", component: "1", questionCount: "12", questions: []},
        {year: "2021", month: "MJ", series: "1", component: "1", questionCount: "11", questions: []},
        {year: "2021", month: "FM", series: "2", component: "1", questionCount: "11", questions: []},
    ],
    Maths_Stats_1: [
        {year: "2017", month: "ON", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2017", month: "ON", series: "2", component: "5", questionCount: "7", questions: []},
        {year: "2017", month: "ON", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2017", month: "MJ", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2017", month: "MJ", series: "2", component: "5", questionCount: "7", questions: []},
        {year: "2017", month: "MJ", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2017", month: "FM", series: "2", component: "5", questionCount: "7", questions: []},
        
        {year: "2018", month: "ON", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2018", month: "ON", series: "2", component: "5", questionCount: "7", questions: []},
        {year: "2018", month: "ON", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2018", month: "MJ", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2018", month: "MJ", series: "2", component: "5", questionCount: "7", questions: []},
        {year: "2018", month: "MJ", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2018", month: "FM", series: "2", component: "5", questionCount: "8", questions: []},

        {year: "2019", month: "ON", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2019", month: "ON", series: "2", component: "5", questionCount: "7", questions: []},
        {year: "2019", month: "ON", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2019", month: "MJ", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2019", month: "MJ", series: "2", component: "5", questionCount: "7", questions: []},
        {year: "2019", month: "MJ", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2019", month: "FM", series: "2", component: "5", questionCount: "7", questions: []},

        {year: "2020", month: "ON", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2020", month: "ON", series: "2", component: "5", questionCount: "6", questions: []},
        {year: "2020", month: "ON", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2020", month: "MJ", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2020", month: "MJ", series: "2", component: "5", questionCount: "7", questions: []},
        {year: "2020", month: "MJ", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2020", month: "FM", series: "2", component: "5", questionCount: "7", questions: []},

        {year: "2021", month: "ON", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2021", month: "ON", series: "2", component: "5", questionCount: "7", questions: []},
        {year: "2021", month: "ON", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2021", month: "MJ", series: "3", component: "5", questionCount: "7", questions: []},
        {year: "2021", month: "MJ", series: "2", component: "5", questionCount: "7", questions: []},
        {year: "2021", month: "MJ", series: "1", component: "5", questionCount: "7", questions: []},
        {year: "2021", month: "FM", series: "2", component: "5", questionCount: "7", questions: []},
    ]
}

let completedQuestions = {
    Physics: [],
    Chemistry: [],
    IT: [],
    Maths_Pure_1: [],
    Maths_Stats_1: [],
    Biology: []
}
let numberOfQuestionsCompleted = 0
$: if (selectedFilters.component != '') {
        numberOfQuestionsCompleted = 0
        for (let index = 0; index < completedQuestions[selectedSubject].length; index++) {
            if (completedQuestions[selectedSubject][index].charAt(8) == selectedFilters.component) {
                numberOfQuestionsCompleted++
            }
        }
    } else if (selectedSubject) {
        numberOfQuestionsCompleted = completedQuestions[selectedSubject].length
    };
/*
    $: if (selectedSubject) {
        for (let index = 0; index < pastPaper[selectedSubject].length; index++) {
            for (let i = 0; i < pastPaper[selectedSubject][index].questionCount; i++) {
                let ref = pastPaper[selectedSubject][index]
                ref.questions.push({number: i+1, completed: false})
            }
        }
    }
*/
let subjects = Object.getOwnPropertyNames(pastPaper)
for (let subjectIndex = 0; subjectIndex < subjects.length; subjectIndex++) {
    for (let pastPaperIndex = 0; pastPaperIndex < pastPaper[subjects[subjectIndex]].length; pastPaperIndex++) {
        if (pastPaper[subjects[subjectIndex]][pastPaperIndex].component == "1" && (Object.keys(pastPaper)[subjectIndex] == "Chemistry" || Object.keys(pastPaper)[subjectIndex] == "Physics")) {
            for (let questionIndex = 0; questionIndex < 5; questionIndex++) {
                let pastPaperRef = pastPaper[subjects[subjectIndex]][pastPaperIndex];
                let questionRef = pastPaperRef.questions;
                questionRef.push({
                    number: `${questionIndex*8+1}-${(questionIndex+1)*8}`, 
                    origin: `${pastPaperRef.year}/${pastPaperRef.month}/${pastPaperRef.component}${pastPaperRef.series}/${questionIndex*8}-${(questionIndex+1)*8}`
                })
            }
        } else {
            for (let questionIndex = 0; questionIndex < pastPaper[subjects[subjectIndex]][pastPaperIndex].questionCount; questionIndex++) {
                let pastPaperRef = pastPaper[subjects[subjectIndex]][pastPaperIndex];
                let questionRef = pastPaperRef.questions;
                let questionNumber
                if (questionIndex+1 < 10) {
                    questionNumber = `0${questionIndex+1}`
                } else {
                    questionNumber = `${questionIndex+1}`
                }
                questionRef.push({number: questionNumber, origin: `${pastPaperRef.year}/${pastPaperRef.month}/${pastPaperRef.component}${pastPaperRef.series}/${questionNumber}`})
            }
        }
    }
}

/*
    function updateObject() {
        console.log("updateObject function called")
        if (selectedSubject) {
            for (let pastPaperIndex = 0; pastPaperIndex < pastPaper[selectedSubject].length; pastPaperIndex++) {
                for (let questionIndex = 0; questionIndex < pastPaper[selectedSubject][pastPaperIndex].questionCount; questionIndex++) {
                    let pastPaperRef = pastPaper[selectedSubject][pastPaperIndex];
                    let questionRef = pastPaper[selectedSubject][pastPaperIndex].questions;
                    let questionNumber
                    if (questionIndex+1 < 10) {
                        questionNumber = `0${questionIndex+1}`
                    } else {
                        questionNumber = `${questionIndex+1}`
                    }
                    questionRef.push({number: questionNumber, origin: `${pastPaperRef.year}/${pastPaperRef.month}/${pastPaperRef.variant}/${questionNumber}`})
                }
            }
        }
    }
*/

$: selectedSubject, getCompletedQuestions()
async function getCompletedQuestions() {
    if (selectedSubject) {
        const docRef = doc(db, `users/${uid}/subjects/${selectedSubject}`);
        const docSnap = await getDoc(docRef);
        completedQuestions[selectedSubject] = docSnap.data().completedQuestions
    }
}

async function toggleCompleted(currentPastPaper, currentQuestion) {
    const docRef = doc(db, `users/${uid}/subjects/${selectedSubject}`);

    let questionOrigin = currentQuestion.origin

    if (!completedQuestions[selectedSubject].includes(questionOrigin)) {
        completedQuestions[selectedSubject].push(questionOrigin)
        completedQuestions = completedQuestions

        await updateDoc(docRef, {
            completedQuestions: arrayUnion(questionOrigin)
        });
    } else {
        for (let index = 0; index < completedQuestions[selectedSubject].length; index++) {
            if (completedQuestions[selectedSubject][index] == questionOrigin) {
                completedQuestions[selectedSubject].splice(index, 1)
            }
        }
        await updateDoc(docRef, {
            completedQuestions: arrayRemove(questionOrigin)
        });
    }
    completedQuestions = completedQuestions
    pastPaper = pastPaper
}

let totalQuestionCount = 0


$:  if (selectedSubject || selectedFilters.component) {
    totalQuestionCount = 0
        for (let index = 0; index < pastPaper[selectedSubject].length; index++) {
            if (pastPaper[selectedSubject][index].component == selectedFilters.component || selectedFilters.component == '') {
                totalQuestionCount += parseInt(pastPaper[selectedSubject][index].questionCount)

            }
        }
    }
</script>
<div class="my-14 text-gray-500">
    <h2 class="text-2xl font-semibold text-blue-600 text-center">
        This page is for tracking each question you complete
    </h2> 
    <br><br> 
    <div class="flex">
        <img src="images/markAsCompletedBtn.png" alt="mark as completed button"> 
        <p class="ml-4">
            1. Clicking on the following button in the questions tab will update your progress of that subject as well as the grid
        </p>
    </div> 
    <br> 
    <div class="flex">
        <img src="images/grid.png" alt="grid" class="h-16"> 
        <p class="ml-4">
            2. Alternatively you can click here to mark a question as complete
        </p>
    </div> 
    <br> 
    <p>
        3. Clicking on the box when a tick is there will mark the question as incomplete
        <br>
        4. The progress bar will get updated every time you make a change. This bar can be a useful indication of your progress in a particular subject
        <br> 
        <span class="italic">// This feature is experimental and you may experience errors. We urge you to report any errors faced.</span>
    </p>
</div>
<!--Select board-->
<ExamBoards bind:selectedBoard/>
<!--Select subject-->
<Subjects bind:selectedBoard bind:selectedSubject />

{#if selectedSubject}
    <Filters bind:selectedFilters {pastPaper} {selectedSubject}/>
{/if}

{#if selectedSubject}
    <div class="w-full mt-14">
        <h2 class="text-xl font-semibold text-gray-600">Progress bar</h2>
        <br>
        <div class="flex items-center">
            <progress max={totalQuestionCount} value={numberOfQuestionsCompleted} class="w-10/12"></progress>
            <p class="text-blue-600 font-semibold ml-4">
                {(numberOfQuestionsCompleted/totalQuestionCount*100).toFixed(2)}%
            </p>
        </div>
    </div>
    <br>
{/if}

<div class="flex flex-col mt-10 flex-wrap justify-between space-y-6">
    {#if selectedSubject}
        {#each pastPaper[selectedSubject] as pastPaper}
            {#if (pastPaper.year === selectedFilters.years || selectedFilters.years === '') && (pastPaper.month == selectedFilters.months || selectedFilters.months === '') && (pastPaper.component === selectedFilters.component || selectedFilters.component === '') && (pastPaper.series === selectedFilters.series || selectedFilters.series === '')}
                <div class="flex flex-col">
                    <span>{pastPaper.year}/{pastPaper.month}/{pastPaper.component}{pastPaper.series}:</span>
                    <div class="flex space-x-2 flex-wrap">
                        {#each pastPaper.questions as question}
                            <div class="grid grid-rows-2 rounded-xl divide-y-2 border-red-300 border-2 divide-red-300 hover:bg-red-100">
                                <div class="py-3 px-3">
                                    <p>Q {question.number}</p>
                                </div>
                                <button on:click={() => toggleCompleted(pastPaper, question)} class="py-3 px-3 rounded-b-lg hover:bg-red-300 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {completedQuestions[selectedSubject].includes(question.origin) ? "block" : "hidden"}" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}
    {/if}
</div>
<!--
    <div class="flex flex-col mt-10">
        {#if selectedSubject}
            {#each pastPaper[selectedSubject] as pastPaper}
                <div class="flex flex-col my-3">
                    <span>{pastPaper.year}/{pastPaper.month}/Series {pastPaper.series}:</span>
                    <div class="flex space-x-2">
                        {#each pastPaper.questions as question}
                            <div class="grid grid-rows-2 rounded-xl divide-y-2 border-red-300 border-2 divide-red-300 hover:bg-red-100">
                                <div class="py-4 px-6">
                                    <p>Q{question.number}</p>
                                </div>
                                <button on:click={() => toggleCompleted(pastPaper, question)} class="py-4 px-6 rounded-b-lg hover:bg-red-300 group">
                                    {#if completedQuestions[selectedSubject].includes(`${pastPaper.year}/${pastPaper.month}/${pastPaper.components[selectedSubject]}${pastPaper.series}/${question.number}`)}
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    {/if}
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
-->
<style>
progress {
    -webkit-appearance: none;
}

::-webkit-progress-bar {
    background-color: white;
    border: 2px solid #f87171;
    border-radius: 1.5rem;
    height: 16px;
}

::-webkit-progress-value {
    background-color: #507ABD;
    border-radius: 1.5rem;
}
</style>