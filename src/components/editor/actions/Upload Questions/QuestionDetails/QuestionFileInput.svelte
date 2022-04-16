<script>
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
export let firebaseConfig
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export let question
export let pastPaper

function uploadQFiles() {
    question.file = question.input.files[0]
    question.fileName = question.file.name.split('.').slice(0, -1).join('.');
    question.fileLocation = `${pastPaper.subject}/${pastPaper.year}/${pastPaper.month}/${pastPaper.component}${pastPaper.series}/Q/${question.fileName}`;
    console.log(question.fileLocation)
    const storageRef = ref(storage, question.fileLocation);
    const uploadTask = uploadBytesResumable(storageRef, question.file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            question.upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
            console.log('Upload is ' + question.upload.progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                question.upload.state = snapshot.state
                console.log('Upload is paused');
                break;
            case 'running':
                question.upload.state = snapshot.state
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            question.upload.error = error
            console.log(error)
        }, 
        () => {
            question.upload.state = "Complete"
            console.log("Uploaded")
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            question.link = downloadURL
            });
        }
    );
}
function deleteQFile() {
    const storageRef = ref(storage, question.fileLocation);

    deleteObject(storageRef).then(() => {
    window.alert("File deleted!")
    }).catch((error) => {
        window.alert(error)
    });
}
</script>

<label for="">Question file (PNG or PDF)</label>
<input type="file" class="bg-blue-300 text-white font-semibold" accept="image/*, .pdf" on:change={uploadQFiles} bind:this={question.input}>
<br><br>
{#if question.upload.progress}
    <p>
        state: {question.upload.state}
        <br>
        progress: {question.upload.progress}%
    </p>
{/if}
{#if question.upload.error}
    <p>{question.upload.error}</p>
{/if}
{#if question.link}
    <a href="{question.link}" class="text-blue-400 underline" target="_blank">Link to question</a>
    <br><br>
    <button class="bg-yellow-400 py-1 px-3 rounded-sm text-white font-bold border-none animate-zoom hover:opacity-50" on:click|preventDefault={deleteQFile}>Delete file</button>
{/if}