<template>
<div>
    <pre>{{ rawJson }}</pre>
</div>
</template>

<script>
import axios from 'axios';
import { urls } from '../../routes.js';

export default {
    data() {
        return {
            rawJson: null
        };
    },
    async created() {
        const pageId = this.$route.params.id;
        const formJsonUrl = urls.getFormJson(pageId);
        
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
  