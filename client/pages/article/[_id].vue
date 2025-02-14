  <template>
    <div class="w-full min-h-screen bg-white drop-shadow-2xl relative flex flex-col justify-center items-center p-4">
      <div class="container mx-auto px-4 py-8">
        <div v-if="article">
          <h1 class="text-4xl font-bold mb-6 text-gray-900">{{ article.articleTitle }}</h1>
          <div class="prose lg:prose-xl max-w-none mb-8 text-gray-700">
            {{ article.articleContent }}
          </div>
          <div class="flex flex-wrap gap-4 text-sm text-gray-600">
            <span class="flex items-center">
              <span class="font-semibold mr-1">Author:</span>
              {{ article.articleAuthor }}
            </span>
            <span class="flex items-center">
              <span class="font-semibold mr-1">Published:</span>
              {{ article.articlePublishedDate }}
            </span>
          </div>
        </div>
        <div v-else-if="error" class="text-center text-red-600 text-lg">
          {{ error }}
        </div>
        <div v-else class="text-center text-gray-600 text-lg">
          Loading...
        </div>
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios'

  export default {
    data() {
      return {
        article: null,
        error: null
      }
    },
    async mounted() {
      try {
        const response = await axios.get(`http://localhost:5000/news/article/${this.$route.params._id}`);
        this.article = response.data;
      } catch (error) {
        console.error('Error fetching article:', error);
        this.error = 'Failed to load article';
      }
    }
  }
  </script>