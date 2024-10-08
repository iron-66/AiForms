<template>
<div class="result-page">
    <div class="central-panel">
        <h1 class="result-page-header">Результат</h1>
        <img v-if="imageExists" :src="imageSrc" alt="Предпросмотр документа" class="document-preview">
        <div v-else>Изображение обрабатывается, пожалуйста, подождите...</div>
    </div>
    <div class="result-window">
        <div v-if="questions.length" class="tabs">
            <button :class="{ active: activeTab === 'form' }" @click="activeTab = 'form'">форма</button>
            <button :class="{ active: activeTab === 'questions' }" @click="activeTab = 'questions'">вопросы</button>
            <button :class="{ active: activeTab === 'json' }" @click="activeTab = 'json'">json</button>
        </div>
        <div class="processing-text" v-if="hasError">Возникла ошибка<br><br>Попробуйте перезагрузить страницу<br>или выбрать другой формат документа</div>
        <div class="processing-text" v-else-if="!questions.length">Обработка документа,<br>пожалуйста, подождите...</div>
        <component v-else :is="activeTabComponent" class="result"></component>
    </div>
</div>
</template>
      
<script>
import FormTab from '../components/FormTab.vue';
import QuestionsTab from '../components/QuestionsTab.vue';
import JsonTab from '../components/JsonTab.vue';
import axios from 'axios';
import { urls } from '../../routes.mjs';

export default {
    name: 'ResultPage',
    mounted() {
        document.title = 'AiForms | Просмотр результата';
    },
    data() {
        return {
            activeTab: 'form',
            imageSrc: '',
            imageExists: false,
            questions: [],
            pageId: this.$route.params.id,
            hasError: false,
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
        this.imageSrc = urls.getImage(pageId);

        while (!this.imageExists) {
            try {
                await axios.get(this.imageSrc);
                this.imageExists = true;
            } catch {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        const formJsonUrl = urls.getFormJson(pageId);
        try {
            const response = await axios.get(formJsonUrl);
            const formData = response.data;

            if (formData.pages.length > 0) {
                this.questions = formData.pages;
            } else {
                this.processing = true;
                await this.processForm(pageId);
                this.processing = false;
            }
        } catch (error) {
            console.error('Ошибка при загрузке form.json:', error);
        }
    },
    methods: {
        async processForm(pageId) {
            try {
                const uniqueId = pageId.match(/form-(\d+)/)[1];
                const extractUrl = urls.extractForm(uniqueId);
                await axios.get(extractUrl);

                const formJsonUrl = urls.getFormJson(pageId);
                const response = await axios.get(formJsonUrl);
                const formData = response.data;

                if (formData.pages.length > 0) {
                    this.questions = formData.pages;
                } else {
                    console.warn('Обработка формы завершена, но вопросы не были сгенерированы.');
                }
            } catch (error) {
                console.error('Ошибка при обработке формы:', error);
                this.hasError = true;
            }
        },
    },
}
</script>

<style scoped>
.result-page {
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

.result-page-header {
    font-size: min(2.08vw, 40px);
    font-weight: bold;
    color: #303030;
}

.document-preview {
    max-width: 19.06vw;
    max-height: 57.52vh;
    border: 1px solid #5F5F5F;
}

.result-window {
    margin-top: 12.62vh;
    margin-left: 6.78vw;
    width: 42.18vw;
    height: 75.2vh;
    position: relative;
    border-radius: 2.39vw;
    z-index: 0;
}

.result-window::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(to right, #50CE86, #6DB7F1);
    border-radius: 2.6vw;
    z-index: -3;
}

.result-window::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #F5F6FF;
    border-radius: 2.39vw;
    z-index: -2;
}

.tabs {
    display: flex;
    margin-top: 3.29vh;
    margin-left: 1.56vw;
    gap: 1.56vw;
}

button {
    width: 11.98vw;
    height: 8.23vh;
    border-radius: 1.04vw;
    border: none;
    outline: none;
    background-color: #B3B3B3;
    font-family: Comfortaa;
    font-size: min(1.56vw, 30px);
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

.processing-text {
    font-family: Comfortaa;
    font-size: min(1.56vw, 30px);
    font-weight: bold;
    color: #303030;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
}

.result {
    width: 39.06vw;
    height: 57.08vh;
    margin-top: 3.29vh;
    margin-left: 1.56vw;
    border: 1px solid #5F5F5F;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: auto;
    padding: 1.3vw;
    box-sizing: border-box;
}

.result::-webkit-scrollbar {
    width: 10px;
    height: 0px;
}

.result::-webkit-scrollbar-track {
    -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
    background-color: #f9f9fd;
    border-radius: 10px;
    margin: 20px;
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
