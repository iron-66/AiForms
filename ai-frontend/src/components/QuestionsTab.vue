<template>
<div>
    <div v-for="(question, index) in questions" :key="question.id" class="question-block">
        <p class="question">Вопрос {{ index + 1 }}</p>
        <h3>{{ question.question_text }}</h3>
        <p class="description">Подсказка: {{ question.hint_text }}</p>
        <p class="description">Тип: {{ question.answer_type }}</p>
        <div v-if="index < questions.length - 1" class="separator"></div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { urls } from '../../routes.js';

export default {
    data() {
        return {
            questions: []
        };
    },
    async created() {
        const pageId = this.$route.params.id;
        const formJsonUrl = urls.getFormJson(pageId);
        
        try {
            const response = await axios.get(formJsonUrl);
            const formData = response.data;
            this.questions = formData.pages;
        } catch (error) {
            console.error('Ошибка при загрузке form.json:', error);
        }
    }
}
</script>

<style scoped>
.question-block {
    margin-bottom: 2.2vh;
    font-weight: bold;
}

.question {
    font-size: min(0.93vw, 18px);
    color: #303030;
}

h3 {
    font-size: min(1.04vw, 20px);
    color: #303030;
}

.description {
    font-size: min(0.93vw, 18px);
    color: #777;
}

.separator {
    border-bottom: 1px solid #ccc;
    margin: 2.2vh 0;
}
</style>
