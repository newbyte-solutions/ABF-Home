<template>
    <div>
        <header>
            <Navbar />
        </header>
        
        <main>
            <NuxtPage />
        </main>
    
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
export default {
    components: {
        Navbar: () => import('@/components/Navbar.vue'),
        Footer: () => import('@/components/Footer.vue'),
    }
}
</script>