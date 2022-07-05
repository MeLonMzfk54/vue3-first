import axios from "axios";
import {ref, onMounted} from 'vue'

export function usePosts(limit) {
  const posts = ref([])
  const totalPages = ref(1)
  const isPostsLoading = ref(false)
  const fetching = async () => {
    try {
      isPostsLoading.value = true;
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: 1,
          _limit: limit
        }
      });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
      posts.value = response.data;
    } catch (e) {
      alert('Ошибка')
    } finally {
      isPostsLoading.value = false;
    }
  }
  onMounted(fetching)
  return {
    posts, isPostsLoading, totalPages
  }
}