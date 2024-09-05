<template>
<div class="form-container">
    <div class="header">
        <img src="../assets/images/Logo beta.png" alt="AiForms Logo" class="logo" />
        <button @click="openInNewTab" class="open-link-btn">Открыть в отдельной вкладке</button>
    </div>
    <div class="form-content" v-if="questions.length">
        <h2>Вопрос {{ currentQuestionIndex + 1 }}</h2>
        <h3>{{ currentQuestion.question_text }}</h3>
        <p>{{ currentQuestion.hint_text }}</p>

        <div class="input-field">
            <template v-if="currentQuestion.answer_type === 'text'">
                <input type="text" v-model="formData[currentQuestionIndex]" />
            </template>

            <template v-if="currentQuestion.type === 'number'">
                <input type="number" v-model="formData[currentQuestionIndex]" />
            </template>

            <template v-if="currentQuestion.type === 'email'">
                <input type="email" v-model="formData[currentQuestionIndex]" />
            </template>

            <template v-if="currentQuestion.type === 'phone_number'">
                <input type="tel" v-model="formData[currentQuestionIndex]" />
            </template>

            <template v-if="currentQuestion.type === 'date'">
                <input type="date" v-model="formData[currentQuestionIndex]" />
            </template>

            <template v-if="currentQuestion.type === 'selection'">
                <select v-model="formData[currentQuestionIndex]">
                    <option v-for="(option, index) in currentQuestion.options" :key="index">{{ option }}</option>
                </select>
            </template>
        </div>

        <div class="form-navigation">
            <button class="nav-btn" @click="prevQuestion" :disabled="currentQuestionIndex === 0">Назад</button>
            <button class="nav-btn" @click="nextQuestion" :disabled="currentQuestionIndex === questions.length - 1">Далее</button>
        </div>
    </div>
    <div v-else>
        Формы ещё не сгенерированы, пожалуйста, подождите...
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            questions: [],
            currentQuestionIndex: 0,
            formData: [],
        };
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
    },
    async created() {
        const pageId = this.$route.params.id;
        const formJsonUrl = `http://localhost:3000/results/${pageId}/form.json`;

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
            }
        },
        prevQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
            }
        },
        openInNewTab() {
            const formUrl = `http://localhost:3000/results/${this.$route.params.id}/form.json`;
            window.open(formUrl, '_blank');
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
    max-width: 150px;
}

.open-link-btn {
    padding: 12px 22px;
    position: relative;
    background: #F5F6FF;
    border-radius: 17px;
    border: none;
    color: #303030;
    font-weight: bold;
    font-size: 17px;
    font-family: Comfortaa;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.open-link-btn::before {
    content: "";
    position: absolute;
    left: -4px;
    top: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(to right, #50CE86, #6DB7F1);
    border-radius: 16px;
    z-index: -1;
}

.form-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

h2, h3, p {
    margin: 10px 0; /* уменьшение отступов для заголовков и текста */
}

.input-field {
    margin: 20px 0;
}

input, select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-navigation {
    margin-top: 20px;
}

.nav-btn {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    background-color: #50ce86;
    color: white;
    font-size: 18px;
    cursor: pointer;
    border-radius: 15px;
    transition: background-color 0.3s ease;
}

.nav-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.nav-btn:hover:not(:disabled) {
    background-color: #6db7f1;
}
</style>
  