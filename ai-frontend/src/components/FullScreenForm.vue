<template>
<div class="fullscreen-form-container">
    <div class="header">
        <img src="../assets/images/Logo beta.png" alt="AiForms Logo" class="logo" />
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
                console.log('Результаты успешно сохранены');
            } catch (error) {
                console.error('Ошибка при сохранении ответов:', error);
            }
        },
    },
};
</script>

<style scoped>
.fullscreen-form-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    max-width: 150px;
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
    margin: 10px 0;
}

.input-field {
    margin: 20px 0;
    width: 500px;
}

input, select {
    width: 100%;
    padding: 15px;
    font-size: 17px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
    font-family: Comfortaa;
}

.form-navigation {
    margin-top: 20px;
    display: flex;
    gap: 30px;
    justify-content: center;
}

.gradient-btn {
    padding: 10px 20px;
    position: relative;
    border-radius: 17px;
    border: none;
    background: #F5F6FF;
    color: #303030;
    font-weight: bold;
    font-size: 17px;
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

.form-completion {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    text-align: center;
}

@media (max-width: 768px) {
    .fullscreen-form-container {
        padding: 10px;
    }

    .header {
        flex-direction: column;
        align-items: center;
    }

    .input-field {
        width: 100%;
    }

    input, select {
        padding: 12px;
        font-size: 15px;
    }

    .gradient-btn {
        padding: 8px 15px;
        font-size: 15px;
    }
}
</style>
    