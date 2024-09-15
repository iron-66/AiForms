<template>
<div class="form-container">
    <div class="header">
        <img src="../assets/images/Logo beta.png" alt="AiForms Logo" class="logo" />
        <button @click="openInNewTab" class="gradient-btn">Открыть в отдельной вкладке</button>
    </div>
    <div class="form-content" v-if="questions.length && !isCompleted">
        <h2>Вопрос {{ currentQuestionIndex + 1 }}</h2>
        <h3>{{ currentQuestion.question_text }}</h3>
        <p v-if="currentQuestion.answer_type !== 'text'">{{ currentQuestion.hint_text }}</p>

        <div class="input-field">
            <template v-if="currentQuestion.answer_type === 'text'">
                <input type="text" v-model="formData[currentQuestionIndex]" :placeholder="currentQuestion.hint_text" />
            </template>

            <template v-if="currentQuestion.answer_type === 'number'">
                <input type="number" v-model="formData[currentQuestionIndex]" />
            </template>

            <template v-if="currentQuestion.answer_type === 'email'">
                <input type="email" v-model="formData[currentQuestionIndex]" />
            </template>

            <template v-if="currentQuestion.answer_type === 'phone_number'">
                <input type="tel" v-model="formData[currentQuestionIndex]" />
            </template>

            <template v-if="currentQuestion.answer_type === 'date'">
                <input type="date" v-model="formData[currentQuestionIndex]" />
            </template>

            <template v-if="currentQuestion.answer_type === 'selection'">
                <select v-model="formData[currentQuestionIndex]">
                    <option v-for="(option, index) in currentQuestion.options" :key="index">{{ option }}</option>
                </select>
            </template>
        </div>

        <div class="form-navigation">
            <button class="gradient-btn" @click="prevQuestion" :disabled="currentQuestionIndex === 0">Назад</button>
            <button class="gradient-btn" @click="nextQuestion">Далее</button>
        </div>
    </div>

    <div class="form-completion" v-if="isCompleted">
        <h2>Спасибо за ответ!<br>Результаты успешно записаны!</h2>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { urls } from '../../routes.js';

export default {
    data() {
        return {
            questions: [],
            currentQuestionIndex: 0,
            formData: [],
            isCompleted: false,
        };
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
    },
    async created() {
        const pageId = this.$route.params.id;
        const formJsonUrl = urls.getFormJson(pageId);

        try {
            const response = await axios.get(formJsonUrl);
            this.questions = response.data.pages;
            this.formData = new Array(this.questions.length).fill('');
        } catch (error) {
            console.error('Ошибка при загрузке form.json:', error);
        }
    },
    methods: {
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
            } else {
                this.completeForm();
            }
        },
        prevQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
            }
        },
        async completeForm() {
            this.isCompleted = true;
            try {
                await axios.post(urls.saveAnswers(this.$route.params.id), { answers: this.formData });
                console.log('Результаты успешно сохранены', this.formData);
            } catch (error) {
                console.error('Ошибка при сохранении ответов:', error);
            }
        },
        openInNewTab() {
            const fullScreenFormUrl = this.$router.resolve({
                name: 'FullScreenForm',
                params: { id: this.$route.params.id },
            }).href;
            window.open(fullScreenFormUrl, '_blank');
        },
    },
};
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    box-sizing: border-box;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    max-width: 7.81vw;
}

.gradient-btn {
    padding: 1.09vh 1.04vw;
    position: relative;
    border-radius: 17px;
    border: none;
    background: #F5F6FF;
    color: #303030;
    font-weight: bold;
    font-size: min(0.88vw, 17px);
    font-family: Comfortaa;
    cursor: pointer;
    transition: background 0.5s ease;
}

.gradient-btn::before {
    content: "";
    position: absolute;
    left: -2px;
    top: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(to right, #50CE86, #6DB7F1);
    border-radius: 19px;
    z-index: -1;
    transition: background 0.5s ease;
}

.gradient-btn:hover:not(:disabled) {
    background: linear-gradient(to right, #50CE86, #6DB7F1);
    color: #F5F6FF;
    transition: background 0.5s ease;
}

.gradient-btn:disabled {
    background: #e2e1e1;
    cursor: not-allowed;
}

.gradient-btn:disabled::before {
    content: "";
    position: absolute;
    left: -2px;
    top: -2px;
    right: -2px;
    bottom: -2px;
    background: #e2e1e1;
    border-radius: 19px;
    z-index: -1;
    transition: background 0.5s ease;
}

.form-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.09vh 0.52vw;
}

h2 {
    font-size: min(1.3vw, 25px);
}

h3 {
    font-size: min(1.04vw, 20px);
}

h2, h3, p {
    margin: 1.09vh 0;
}

.input-field {
    margin: 2.2vh 0;
    width: 100%;
}

input, select {
    width: 100%;
    padding: 1.64vh 0.78vw;
    font-size: min(0.88vw, 17px);
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
    font-family: Comfortaa;
}

.form-navigation {
    margin-top: 2.2vh;
    display: flex;
    gap: 1.56vw;
    justify-content: center;
}

.form-completion {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    text-align: center;
}
</style>
