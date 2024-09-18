<template>
<div class="my-forms">
    <div class="central-panel">
        <h1 class="my-forms-header">Мои формы</h1>
        <img src="../assets/images/My forms logo.png" alt="Создать форму" class="my-forms-logo">
    </div>
    <div class="archive-panel">
        <div v-for="folder in folders" :key="folder" class="archive-card" @click="goToFormResult(folder)">
            <img :src="getImageSrc(folder)" alt="Предпросмотр документа" />
            <button class="delete-button" @click.stop="deleteForm(folder)">Удалить</button>
        </div>
    </div>
</div>
</template>
  
<script>
import axios from 'axios';
import { urls } from '../../routes.mjs';

export default {
    name: 'MyForms',
    mounted() {
        document.title = 'AiForms | Мои формы';
    },
    data() {
        return {
            folders: []
        };
    },
    created() {
        axios.get(urls.getFolders)
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

            axios.get(urls.deleteForm(formId))
            .then(() => {
                this.folders = this.folders.filter(f => f !== folder);
            })
            .catch(error => {
                console.error('Ошибка при удалении формы:', error);
            });
        },
        getImageSrc(folder) {
            return urls.getImageUrl(folder);
        },
    }
}
</script>

<style scoped>
.my-forms {
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
    position: fixed;
}

.my-forms-header {
    font-size: min(2.08vw, 40px);
    font-weight: bold;
    color: #303030;
}

.my-forms-logo {
    margin-top: 8.78vh;
    width: 14.9vw;
}

.archive-panel {
    margin-top: 12.62vh;
    margin-left: 31.77vw;
    width: 41.15vw;
    height: 7.52vh;
    display: flex;
    flex-wrap: wrap;
    gap: 2.6vw;
}

.archive-card {
    width: 11.98vw;
    height: 32.93vh;
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
    border-radius: 2.604vw;
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
    border-radius: 2.395vw;
}

.delete-button {
    width: 5.99vw;
    position: absolute;
    bottom: 1.09vh;
    left: 25%;
    font-family: Comfortaa;
    font-size: min(0.83vw, 16px);
    background-color: #E85353;
    box-shadow: inset 12px 12px 20px rgba(255, 255, 255, 0.25);
    color: white;
    border: none;
    padding: 1.09vh 0.52vw;
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
</style>
