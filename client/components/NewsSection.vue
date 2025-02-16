<template>
        <h2 class="text-center text-2xl font-semibold my-4">Nyheter</h2>
    <div
      class="w-full h-fit px-0 md:px-10 flex flex-col md:flex-row items-center justify-center md:space-x-20"
    >
      <router-link v-for="news in newsItems" :key="news._id" :to="`/nyheter/${news._id}`">
        <div class="w-56 h-80 bg-gray-200 hover:scale-110 transition relative">
          <img
            :src="news.articleImageUrl || 'https://placehold.co/300x200'"
            alt="News image"
            class="max-w-full max-h-[200px] drop-shadow-xl"
          />
          <h1 class="text-xl font-semibold text-center my-4">{{ news.articleTitle }}</h1>
          <p class="px-2 text-center">
            {{ news.articleDescription }}
          </p>
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button :class="{
              'px-4 py-2 border-2': true,
              'border-green-400 hover:bg-green-400': grade === '8',
              'border-indigo-400 hover:bg-indigo-400': grade === '9',
              'border-orange-400 hover:bg-orange-400': grade === '10'
            }">Les Mer</button>
          </div>
        </div>
      </router-link>
    </div>
    <router-link
      to="/nyheter"
      :class="{
        'w-fit px-10 py-4 mt-10 border-2 bg-transparent transition mx-auto': true,
        'border-green-400 hover:bg-green-400': grade === '8',
        'border-indigo-400 hover:bg-indigo-400': grade === '9',
        'border-orange-400 hover:bg-orange-400': grade === '10'
      }"
    >
      Se mer
    </router-link>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    grade: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newsItems: []
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/news/');
      this.newsItems = response.data
        .filter(news => news.articleGrade === this.grade)
        .slice(0, 3);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }
}
</script>