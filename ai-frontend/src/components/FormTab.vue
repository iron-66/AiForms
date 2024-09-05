<template>
<div>
    <iframe :src="formUrl" width="100%" height="500px"></iframe>
</div>
</template>

<script>
export default {
    data() {
        return {
        formUrl: 'http://localhost:3000/form-url' // Пример URL для формы
        };
    }
}
</script>
  