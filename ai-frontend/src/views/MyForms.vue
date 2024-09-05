<template>
<div class="my-forms">
    <div class="central-panel">
        <h1 class="my-forms-header">Мои формы</h1>
        <img src="../assets/images/My forms logo.png" alt="Создать форму" class="my-forms-logo">
    </div>
    <div class="archive-panel">
        <div v-for="folder in folders" :key="folder" class="archive-card" @click="goToFormResult(folder)">
            <img :src="`http://localhost:3000/results/${folder}/page.1.jpeg`" alt="Предпросмотр документа" />
            <button class="delete-button" @click.stop="deleteForm(folder)">Удалить</button>
        </div>
    </div>
</div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'CreateForm',
    data() {
        return {
            folders: []
        };
    },
    created() {
        axios.get('http://localhost:3000/api/folders')
        .then(response => {
            console.log(response.data);
            this.folders = response.data;
        })
        .catch(error => {
            console.error('Ошибка при загрузке папок:', error);
        });
    },
    methods: {
        goToFormResult(folder) {
            this.$router.push(`/results/${folder}`);
        },
        deleteForm(folder) {
            const formId = folder.split('-')[1];

            axios.get(`http://localhost:3000/delete/${formId}`)
            .then(() => {
                this.folders = this.folders.filter(f => f !== folder);
            })
            .catch(error => {
                console.error('Ошибка при удалении формы:', error);
            });
        }
    }
}
</script>

<style scoped>
.my-forms {
    display: flex;
    margin-left: 310px;
}

.central-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 345px;
    height: 533px;
    margin-top: 170px;
    margin-left: 130px;
    position: fixed;
}

.my-forms-header {
    font-size: 40px;
    font-weight: bold;
    color: #303030;
}

.my-forms-logo {
    margin-top: 80px;
    width: 286px;
    height: 267px;
}

.archive-panel {
    margin-top: 115px;
    margin-left: 610px;
    width: 790px;
    height: 685px;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
}

.archive-card {
    width: 230px;
    height: 300px;
    position: relative;
    cursor: pointer;
}

.archive-card::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(to right, #50CE86, #6DB7F1);
    border-radius: 50px;
    z-index: -1;
    transition: all 0.1s ease;
}

.archive-card:hover::before {
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
}

.archive-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 46px;
}

.delete-button {
    width: 115px;
    position: absolute;
    bottom: 10px;
    left: 25%;
    font-family: Comfortaa;
    font-size: 16px;  
    background-color: #E85353;
    box-shadow: inset 12px 12px 20px rgba(255, 255, 255, 0.25);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s, background-color 0.2s, transform 0.1s;
}

.delete-button:hover {
    background-color: #d82a2a;
    transform: scale(1.02);
}

.archive-card:hover .delete-button {
    opacity: 1;
}

.upload-description {
    width: 650px;
    font-size: 30px;
    font-weight: bold;
    color: #303030;
    text-align: center;
    margin: auto;
    margin-top: 270px;
}

.supported-formats {
    width: 355px;
    font-size: 20px;
    color: #777;
    font-weight: bold;
    text-align: center;
    margin: auto;
    margin-top: 20px;
}

.file-input {
    display: none;
}
</style>
