<template>
<div class="result-page">
    <div class="central-panel">
        <h1 class="result-page-header">Результат</h1>
        <img v-if="imageExists" :src="imageSrc" alt="Предпросмотр документа" class="document-preview">
        <div v-else>Изображение обрабатывается, пожалуйста, подождите...</div>
    </div>
    <div class="result-window">
        <div class="tabs">
            <button :class="{ active: activeTab === 'form' }" @click="activeTab = 'form'">форма</button>
            <button :class="{ active: activeTab === 'questions' }" @click="activeTab = 'questions'">вопросы</button>
            <button :class="{ active: activeTab === 'json' }" @click="activeTab = 'json'">json</button>
        </div>
        <component :is="activeTabComponent" class="result"></component>
    </div>
</div>
</template>
      
<script>
import FormTab from '../components/FormTab.vue';
import QuestionsTab from '../components/QuestionsTab.vue';
import JsonTab from '../components/JsonTab.vue';
import axios from 'axios';

export default {
    name: 'ResultPage',
    data() {
        return {
            activeTab: 'form',
            imageSrc: '',
            imageExists: false,
            pageId: this.$route.params.id,
        };
    },
    components: {
        FormTab,
        QuestionsTab,
        JsonTab
    },
    computed: {
        activeTabComponent() {
            return {
                form: FormTab,
                questions: QuestionsTab,
                json: JsonTab
            }[this.activeTab];
        }
    },
    async created() {
        const pageId = this.$route.params.id;
        this.imageSrc = `http://localhost:3000/results/${pageId}/page.1.jpeg`;

        while (!this.imageExists) {
            try {
                await axios.get(this.imageSrc);
                this.imageExists = true;
            } catch {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
}
</script>

<style scoped>
.result-page {
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

.result-page-header {
    font-size: 40px;
    font-weight: bold;
    color: #303030;
}

.document-preview {
    max-width: 366px;
    max-height: 524px;
    border: 1px solid #5F5F5F;
}

.result-window {
    margin-top: 115px;
    margin-left: 130px;
    width: 810px;
    height: 685px;
    position: relative;
    background: #F5F6FF;
    border-radius: 46px;
}

.result-window::before {
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

.tabs {
    display: flex;
    gap: 30px;
    margin-top: 30px;
    margin-left: 30px;
}

button {
    width: 230px;
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

button:hover {
    background-color: #a3a3a3;
}

button.active {
    background-color: #50CE86;
    cursor: default;
    transition: background-color 0.3s;
}

.result {
    width: 750px;
    height: 520px;
    margin-top: 30px;
    margin-left: 30px;
    border: 1px solid #5F5F5F;
    overflow-y: auto;
    overflow-x: auto;
    padding: 15px;
    box-sizing: border-box;
}

.result::-webkit-scrollbar {
    width: 8px;
    height: 0px;
}

.result::-webkit-scrollbar-track {
    -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
    background-color: #f9f9fd;
    border-radius: 10px;
    margin: 5px;
}

.result::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(180deg, #50CE86, #6DB7F1);
    transition: background 0.3s ease;
}

.result::-webkit-scrollbar-thumb:hover {
    background: #50CE86;
    cursor: pointer;
}
</style>
