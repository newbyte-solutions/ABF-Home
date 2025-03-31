<template>
    <div>
        <h1>Edit Company</h1>
        <p>Company ID: {{ companyId }}</p>
    </div>
</template>

<script>
export default {
    props: {
        companyId: {
            type: String,
            required: true
        }
    }
}
</script>