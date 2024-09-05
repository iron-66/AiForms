<template>
<div>
    <div v-if="questions.length">
        <div v-for="(question, index) in questions" :key="question.id" class="question-block">
            <p class="question">Вопрос {{ index + 1 }}</p>
            <h3>{{ question.question_text }}</h3>
            <p class="description">Подсказка: {{ question.hint_text }}</p>
            <p class="description">Тип: {{ question.answer_type }}</p>
            <div v-if="index < questions.length - 1" class="separator"></div>
        </div>
    </div>
    <div v-else>
        Формы еще не сгенерированы, пожалуйста, подождите...
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            questions: []
        };
    },
    async created() {
        const pageId = this.$route.params.id;
        const formJsonUrl = `http://localhost:3000/results/${pageId}/form.json`;
        
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
    margin-bottom: 20px;
}

.question {

    font-weight: bold;
}

h3 {
    font-weight: bold;
    color: #303030;
}

.description {
    color: #777;
    font-weight: bold;
}

.separator {
    border-bottom: 1px solid #ccc;
    margin: 20px 0;
}
</style>
