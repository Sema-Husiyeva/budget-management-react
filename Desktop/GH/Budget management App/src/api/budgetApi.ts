import axios from 'axios';

const NewsAPI = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'X-Api-Key': 'fd913d6b55b34d5e8b2f5ea455097b30', 
  },
});

export const fetchBudgetArticles = (query: string = 'budget OR finance OR saving money') => {
  return NewsAPI.get('/everything', {
    params: {
      q: query.toLowerCase(),   
      language: 'en',              
      sortBy: 'publishedAt',     
      pageSize: 48,               
    },
  });
};