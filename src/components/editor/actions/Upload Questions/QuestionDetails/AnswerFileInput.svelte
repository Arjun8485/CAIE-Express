<script>
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
export let firebaseConfig
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export let answer
export let pastPaper

function uploadAFiles() {
    answer.file = answer.input.files[0]
    answer.fileName = answer.file.name.split('.').slice(0, -1).join('.');
    answer.fileLocation = `${pastPaper.subject}/${pastPaper.year}/${pastPaper.month}/${pastPaper.component}${pastPaper.series}/A/${answer.fileName}`;
    console.log(answer.fileLocation)
    const storageRef = ref(storage, answer.fileLocation);
    const uploadTask = uploadBytesResumable(storageRef, answer.file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            answer.upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log('Upload is ' + answer.upload.progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                answer.upload.state = snapshot.state
                console.log('Upload is paused');
                break;
            case 'running':
                answer.upload.state = snapshot.state
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            answer.upload.error = error
            console.log(error)
        }, 
        () => {
            answer.upload.state = "Complete"
            console.log("Uploaded")
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            answer.link = downloadURL
            });
        }
    );
}

function deleteAFile() {
    const storageRef = ref(storage, answer.fileLocation);

    deleteObject(storageRef).then(() => {
    window.alert("File deleted!")
    }).catch((error) => {
        window.alert(error)
    });
}
</script>
<label for="">Answer file (PNG only)</label>
<input type="file" class="bg-blue-300 text-white font-semibold" accept="image/*, .pdf" on:change|preventDefault={uploadAFiles} bind:this={answer.input}>
<br><br>
{#if answer.upload.progress}
    <p>
        state: {answer.upload.state}
        <br>
        progress: {answer.upload.progress}%
    </p>
{/if}
{#if answer.upload.error}
    <p>{answer.upload.error}</p>
{/if}
{#if answer.link}
    <a href="{answer.link}" class="text-blue-400 underline" target="_blank">Link to answer</a>
    <br><br>
    <button class="bg-yellow-400 py-1 px-3 rounded-sm text-white font-bold border-none animate-zoom hover:opacity-50"  on:click|preventDefault={deleteAFile}>Delete file</button>
{/if}