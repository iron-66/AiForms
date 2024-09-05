<template>
    <div class="form-container">
      <img src="../assets/images/Logo beta.png" alt="AiForms Logo" class="logo" />
      <button @click="openInNewTab" class="open-link-btn">Открыть в отдельной вкладке</button>
      <div v-if="questions.length">
        <h2>Вопрос {{ currentQuestionIndex + 1 }}</h2>
        <h3>{{ currentQuestion.question_text }}</h3>
        <p>Подсказка: {{ currentQuestion.hint_text }}</p>
  
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
          <button @click="prevQuestion" :disabled="currentQuestionIndex === 0">Назад</button>
          <button @click="nextQuestion" :disabled="currentQuestionIndex === questions.length - 1">Далее</button>
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
        formData: [], // Сохраняет ответы пользователей
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
        this.questions = response.data.pages; // Предполагается, что вопросы хранятся в "pages"
        this.formData = new Array(this.questions.length).fill(''); // Инициализация пустого массива для ответов
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
    margin: 0 auto;
    text-align: center;
    background-color: #f5f6ff;
    padding: 20px;
    border-radius: 10px;
  }
  
  .logo {
    max-width: 150px;
    margin-bottom: 20px;
  }
  
  .open-link-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border: 2px solid transparent;
    border-radius: 15px;
    background: linear-gradient(to right, #50ce86, #6db7f1);
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .open-link-btn:hover {
    background: linear-gradient(to right, #6db7f1, #50ce86);
  }
  
  .input-field {
    margin: 20px 0;
  }
  
  input, select {
    width: 80%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-navigation {
    margin-top: 20px;
  }
  
  button {
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
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background-color: #6db7f1;
  }
  </style>
  