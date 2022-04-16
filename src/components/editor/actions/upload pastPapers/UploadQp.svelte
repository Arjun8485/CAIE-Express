<script>
    import { initializeApp } from "firebase/app";
    import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
    import { firebaseConfig } from "../../../../stores/firebase.js";

    const app = initializeApp(firebaseConfig);
    const storage = getStorage();
    
    export let questionPaper
    export let pastPaper
    export let monthKey
    export let subjectKey
    
    function uploadQFiles() {
        questionPaper.file = questionPaper.input.files[0]
        questionPaper.fileName = questionPaper.file.name.split('.').slice(0, -1).join('.');

        let fileName = questionPaper.fileName
        
        pastPaper.year = `20${fileName.substring(6, 8)}`;
        pastPaper.month = monthKey[fileName.substring(5, 6)];
        pastPaper.component = fileName.substring(12, 13);
        pastPaper.series = fileName.substring(13, 14);

        if (fileName.substring(0, 4) == "9709") {
            if (pastPaper.component == "1") {
                pastPaper.subject = "Maths_Pure_1"
            } else {
                pastPaper.subject = "Maths_Stats_1"
            }
        } else {
            pastPaper.subject = subjectKey[fileName.substring(0, 4)];
        }

        questionPaper.fileLocation = `pastPapers/${pastPaper.subject}/${pastPaper.year}/${pastPaper.month}/${pastPaper.component}${pastPaper.series}/${questionPaper.fileName}`;
        console.log(questionPaper.fileLocation)
        const storageRef = ref(storage, questionPaper.fileLocation);
        const uploadTask = uploadBytesResumable(storageRef, questionPaper.file);
    
        uploadTask.on('state_changed', 
            (snapshot) => {
                questionPaper.upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
                console.log('Upload is ' + questionPaper.upload.progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    questionPaper.upload.state = snapshot.state
                    break;
                case 'running':
                    questionPaper.upload.state = snapshot.state
                    break;
                }
            }, 
            (error) => {
                questionPaper.upload.error = error
                console.log(error)
            }, 
            () => {
                questionPaper.upload.state = "Complete"
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                questionPaper.link = downloadURL
                });
            }
        );
    }
    function deleteQFile() {
        const storageRef = ref(storage, questionPaper.fileLocation);
    
        deleteObject(storageRef).then(() => {
        window.alert("File deleted!")
        }).catch((error) => {
            window.alert(error)
        });
    }
    </script>
    
    <label for="">Question file (PNG or PDF)</label>
    <input type="file" class="bg-blue-300 text-white font-semibold" accept="image/*, .pdf" on:change={uploadQFiles} bind:this={questionPaper.input}>
    <br><br>
    {#if questionPaper.upload.progress}
        <p>
            state: {questionPaper.upload.state}
            <br>
            progress: {questionPaper.upload.progress}%
        </p>
    {/if}
    {#if questionPaper.upload.error}
        <p>{questionPaper.upload.error}</p>
    {/if}
    {#if questionPaper.link}
        <a href="{questionPaper.link}" class="text-blue-400 underline" target="_blank">Link to question</a>
        <br><br>
        <button class="bg-yellow-400 py-1 px-3 rounded-sm text-white font-bold border-none animate-zoom hover:opacity-50" on:click|preventDefault={deleteQFile}>Delete file</button>
    {/if}