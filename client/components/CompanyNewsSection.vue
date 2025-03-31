  <template>
    <div class="p-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        <div v-for="article in articles" :key="article._id" class="bg-white rounded-lg p-5 shadow-md">
          <h3 class="mt-0 mb-2.5">{{ article.articleTitle }}</h3>
          <p>{{ article.articleDescription }}</p>
          <span class="text-gray-600 text-sm">{{ formatDate(article.articleDate) }}</span>
        </div>
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios'
  import { useRuntimeConfig } from '#app'

  export default {
    name: 'CompanyNewsSection',
    props: {
      companyId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        articles: []
      }
    },
    computed: {
      filteredNews() {
        return this.articles.slice(0, 3)
      }
    },
    methods: {
      async fetchNews() {
        const { public: publicConfig } = useRuntimeConfig();
        try {
          const response = await axios.get(`${publicConfig.apiBase}/news/`)
          this.articles = response.data.filter(item => item.articleCompany === this.companyId)
        } catch (error) {
          console.error('Error fetching news:', error)
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString()
      }
    },
    mounted() {
      this.fetchNews()
    }
  }
  </script>