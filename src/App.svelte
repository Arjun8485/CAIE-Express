<script>
import Navbar from "./components/Navbar.svelte";
import Home from "./pages/Home.svelte";
import Questions from "./pages/Questions.svelte";
import Editor from "./pages/Editor.svelte";
import Tracker from "./pages/Tracker.svelte";
import PastPapers from "./pages/PastPapers.svelte";
import Router from 'svelte-spa-router'
import Footer from "./components/Footer.svelte";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, doc, getDoc, getDocs, updateDoc, serverTimestamp, collection, setDoc } from 'firebase/firestore';

import { firebaseConfig } from "./stores/firebase.js"

import {location} from 'svelte-spa-router'
//stores
import { user, completedQuestions } from "./stores/user.js";
import { AS_subjects } from "./stores/subjects.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();
const auth = getAuth();
const db = getFirestore();

const layoutComponentClasses = "bg-red-50 text-red-400 w-full flex lg:flex-row flex-col lg:justify-between xl:px-20 lg:px-16 md:px-12 py-4"

let User = {
	roles: {
		premiumUser: false,
		admin: false,
		editor: []
	}
}
const routes = {
	'/' : Home,
	'/Questions' : Questions,
	'/Editor' : Editor,
	'/Tracker' : Tracker,
	'/PastPapers' : PastPapers
}

let usersCompletedQuestions = {}

onAuthStateChanged(auth, (result) => {
    if (result) {
		User.uid = result.uid
		User.displayName = result.displayName
		User.email = result.email
		User.photoURL = result.photoURL
		User.lastSignInTime = result.metadata.lastSignInTime
		addUsertoCollection()
		lastLogin()
    }
});

async function addUsertoCollection() {
    let docRef = doc(db, "users", User.uid);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
		User.roles.premiumUser = docSnap.data().roles.premiumUser
		User.roles.admin = docSnap.data().roles.admin
		User.roles.editor = docSnap.data().roles.editor
		user.set(User)
		getUserSpecificData()
    } else {
        setDoc(doc(db, "users", User.uid), {
            roles: {
                premiumUser: false,
                admin: false,
                editor: []
            },
            email: User.email
        }).then(() => {
            for (let index = 0; index < AS_subjects.length; index++) {
                setDoc(doc(db, `users/${User.uid}/subjects/${AS_subjects[index]}`), {
                    completedQuestions: []
                })
				usersCompletedQuestions[AS_subjects[index]] = []
            }
			completedQuestions.set(usersCompletedQuestions)
        })
		user.set(User)
    }
}
async function getUserSpecificData() {
	const querySnapshot = await getDocs(collection(db, `users/${User.uid}/subjects`));
	querySnapshot.forEach((doc) => {
		usersCompletedQuestions[doc.id] = []
		usersCompletedQuestions[doc.id] = doc.data().completedQuestions
	});
	completedQuestions.set(usersCompletedQuestions)
}
async function lastLogin() {
	const docRef = doc(db, 'users', User.uid);

	const updateTimestamp = await updateDoc(docRef, {
		lastOnline: serverTimestamp()
	});
}
</script>
<Navbar {layoutComponentClasses} on:addUsertoCollection={addUsertoCollection}/>

<main class="md:m-16 m-4">
    <Router {routes}/>
</main>
<svelte:head>
	<title>{$location.split('/')[1]}</title>
</svelte:head>

<Footer {layoutComponentClasses}/>

