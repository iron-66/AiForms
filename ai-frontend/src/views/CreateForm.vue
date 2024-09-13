<template>
<div class="create-form">
    <div class="central-panel">
        <h1 class="create-form-header">Создать форму</h1>
        <img src="../assets/images/Create logo.png" alt="Создать форму" class="create-form-logo">
        <button class="process-button" :disabled="!selectedFile" @click="processFile">обработать</button>
    </div>
    <div class="upload-window" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleFileDrop">
        <p v-if="!selectedFile" class="upload-description">Для выбора документа нажмите сюда<br>или перетащите файл</p>
        <p v-else class="upload-description">Файл "{{ selectedFile.name }}" загружен<br><br>Нажмите сюда, чтобы выбрать другой</p>
        <p class="supported-formats">поддерживаемые форматы:<br>doc, docx, jpg, jpeg, pdf, png</p>
        <input type="file" class="file-input" @change="handleFileUpload" ref="fileInput"/>
    </div>
</div>
</template>
  
<script>
import axios from 'axios';
import { urls } from '../../routes.js';

export default {
    name: 'CreateForm',
    mounted() {
        document.title = 'AiForms | Новая форма';
    },
    data() {
        return {
            selectedFile: null,
        };
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
            }
        },
        handleFileDrop(event) {
            const file = event.dataTransfer.files[0];
            if (file) {
                this.selectedFile = file;
            }
        },
        async processFile() {
            const formData = new FormData();
            formData.append('fileUpload', this.selectedFile);

            try {
                const response = await axios.post(urls.uploadFile, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const redirectUrl = response.request.responseURL;
                const uniqueId = redirectUrl.match(/form-(\d+)/)[1];

                console.log('downloaded');
                this.$router.push(`/results/form-${uniqueId}`);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    },
}
</script>
  
<style scoped>
.create-form {
    display: flex;
    margin-left: 16.15vw;
}

.central-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 17.97vw;
    height: 58.5vh;
    margin-top: 18.66vh;
    margin-left: 6.77vw;
}

.create-form-header {
    font-size: min(2.08vw, 40px);
    font-weight: bold;
    color: #303030;
}

.create-form-logo {
    max-width: 286px;
    width: 14.9vw;
}

.process-button {
    margin-top: 8.78vh;
    background-color: #50CE86;
    max-width: 270px;
    width: 14.06vw;
    height: 70px;
    border: none;
    border-radius: 20px;
    font-family: Comfortaa;
    font-size: min(1.56vw, 30px);
    color: #fff;
    box-shadow: inset 12px 12px 20px rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: background-color 0.3s;
}

.process-button:hover {
    background-color: #6DB7F1;
}

.process-button:disabled {
    background-color: #B3B3B3;
    cursor: not-allowed;
}

.upload-window {
    margin-top: 12.62vh;
    margin-left: 6.78vw;
    width: 42.18vw;
    height: 75.2vh;
    position: relative;
    background: #F5F6FF;
    border-radius: 46px;
    cursor: pointer;
}

.upload-window::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(to right, #50CE86, #6DB7F1);
    border-radius: 50px;
    z-index: -1;
}

.upload-description {
    width: 33.85vw;
    font-size: min(1.56vw, 30px);
    font-weight: bold;
    color: #303030;
    text-align: center;
    margin: auto;
    margin-top: 29.64vh;
}

.supported-formats {
    width: 18.49vw;
    font-size: min(1.05vw, 20px);
    color: #777;
    font-weight: bold;
    text-align: center;
    margin: auto;
    margin-top: 2.2vh;
}

.file-input {
    display: none;
}
</style>
