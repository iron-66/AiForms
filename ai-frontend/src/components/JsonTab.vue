<template>
<div>
    <pre>{{ rawJson }}</pre>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            rawJson: null
        };
    },
    async created() {
        const pageId = this.$route.params.id;
        const formJsonUrl = `http://localhost:3000/results/${pageId}/form.json`;
        
        try {
            const response = await axios.get(formJsonUrl);
            this.rawJson = JSON.stringify(response.data, null, 2);
        } catch (error) {
            console.error('Ошибка при загрузке JSON:', error);
        }
    }
}
</script>

<style scoped>

</style>
  