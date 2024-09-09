<template>
<div class="settings-page">
    <div class="central-panel">
        <h1 class="settings-page-header">Настройки</h1>
        <img src="../assets/images/Settings logo.png" alt="Настройки" class="settings-page-logo">
        <p class="settings-description">Здесь Вы можете изменить промпт, согласно которому происходит генерация вопросов для форм</p>
    </div>
    <div class="settings-window">
        <textarea class="prompt-input" v-model="currentPrompt" placeholder="Введите промпт"></textarea>
        <div class="buttons">
            <button class="save-btn" @click="savePrompt">сохранить</button>
            <button class="default-btn" @click="resetToDefault">вернуть по умолчанию</button>
        </div>
    </div>
</div>
</template>
    
<script>
import axios from 'axios';
import { urls } from '../../routes.js';

export default {
    name: 'SettingsPage',
    data() {
        return {
            currentPrompt: '',
            defaultPrompt: '',
        };
    },
    mounted() {
        this.loadPrompt();
    },
    methods: {
        async loadPrompt() {
            try {
                const response = await axios.get(urls.getPrompt);
                this.currentPrompt = response.data.currentPrompt;
                this.defaultPrompt = response.data.defaultPrompt;
            } catch (error) {
                console.error('Ошибка при запросе промпта:', error);
            }
        },
        async savePrompt() {
            try {
                await axios.post(urls.savePrompt, { prompt: this.currentPrompt });
                alert('Промпт сохранён');
            } catch (error) {
                console.error('Ошибка сохранения промпта:', error);
            }
        },
        resetToDefault() {
            this.currentPrompt = this.defaultPrompt;
        }
    }
}
</script>
    
<style scoped>
.settings-page {
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
}

.settings-page-header {
    font-size: 40px;
    font-weight: bold;
    color: #303030;
}

.settings-page-logo {
    width: 286px;
    height: 267px;
}

.settings-description {
    text-align: center;
    margin-top: 80px;
    width: 355px;
    height: 88px;
    font-family: Comfortaa;
    font-size: 20px;
    font-weight: bold;
    color: #777777;
}

.settings-window {
    margin-top: 115px;
    margin-left: 130px;
    width: 810px;
    height: 685px;
    position: relative;
    background: #F5F6FF;
    border-radius: 46px;
    cursor: pointer;
}

.settings-window::before {
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

.prompt-input {
    width: 750px;
    height: 520px;
    margin-top: 30px;
    margin-left: 30px;
    background: #F5F6FF;
    border: 1px solid #5F5F5F;
    border-radius: 15px;
    font-size: 17px;
    overflow-y: auto;
    overflow-x: auto;
    padding: 25px;
    box-sizing: border-box;
    resize: none;
    overflow-y: auto;
    white-space: pre-wrap;
}

.prompt-input::-webkit-scrollbar {
    width: 10px;
    height: 0px;
}

.prompt-input::-webkit-scrollbar-track {
    -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
    background-color: #f9f9fd;
    border-radius: 10px;
    margin: 20px;
}

.prompt-input::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(180deg, #50CE86, #6DB7F1);
    transition: background 0.3s ease;
}

.prompt-input::-webkit-scrollbar-thumb:hover {
    background: #50CE86;
    cursor: pointer;
}

.buttons {
    display: flex;
    margin-top: 30px;
    margin-left: 30px;
    gap: 30px;
}

.save-btn {
    width: 260px;
    height: 75px;
    border-radius: 20px;
    border: none;
    outline: none;
    background-color: #50CE86;
    font-family: Comfortaa;
    font-size: 30px;
    color: #fff;
    box-shadow: inset 12px 12px 20px rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: background-color 0.3s;
}

.default-btn {
    width: 460px;
    height: 75px;
    border-radius: 20px;
    border: none;
    outline: none;
    background-color: #B3B3B3;
    font-family: Comfortaa;
    font-size: 30px;
    color: #fff;
    box-shadow: inset 12px 12px 20px rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: background-color 0.3s;
}

.default-btn:hover, .save-btn:hover {
    background-color: #6DB7F1;
}
</style>
