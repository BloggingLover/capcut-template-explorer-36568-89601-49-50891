const SEARCH_API_URL = 'https://cc-search.onrender.com/';
const COLLECTION_API_BASE_URL = 'https://cc-list.onrender.com/get_collection_templates?id=';

// API Secret for securing requests - UPDATE THIS VALUE
const APP_SECRET = "YOUR_SECRET_API_KEY_HERE_CHANGE_ME";
const API_HEADERS = {
  'X-App-Secret': APP_SECRET,
  'Content-Type': 'application/json'
};

export interface Author {
  uid: number;
  web_uid: string;
  unique_id: string;
  name: string;
  avatar_url: string;
  description: string;
}

export interface VideoDynamicCover {
  url: string;
  width: number;
  height: number;
}

export interface DraftSegInfo {
  text_seg_len: number;
  video_seg_len: number;
}

export interface VideoTemplate {
  id: number;
  web_id: string;
  title: string;
  short_title: string;
  author: Author;
  cover_url: string;
  cover_width: number;
  cover_height: number;
  video_url: string;
  duration: number;
  template_url: string;
  fragment_count: number;
  usage_amount: number;
  play_amount: number;
  like_count: number;
  favorite_count: number;
  video_dynamic_cover?: VideoDynamicCover;
  create_time: number;
  draft_seg_info?: DraftSegInfo;
}

export interface ApiResponse {
  ret: string;
  errmsg: string;
  data: {
    total: number;
    video_templates?: VideoTemplate[];
    item_list?: VideoTemplate[];
    has_more: boolean;
  };
}

export class ApiService {
  static async getCollectionTemplates(collectionId: number, count: number = 200, retries = 3): Promise<ApiResponse> {
    const cacheKey = `collection_${collectionId}_${count}`;
    
    // Try to get from cache first
    const { CacheService } = await import('./cache');
    const cachedData = await CacheService.get<ApiResponse>(cacheKey);
    
    if (cachedData) {
      console.log('Loading collection from cache');
      return cachedData;
    }

    // Fetch from API with retry logic
    const url = `${COLLECTION_API_BASE_URL}${collectionId}&count=${count}`;
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: API_HEADERS
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch collection templates');
        }

        const data: ApiResponse = await response.json();
        
        // Normalize collection API response - it uses item_list instead of video_templates
        if (data.data?.item_list && !data.data.video_templates) {
          data.data.video_templates = data.data.item_list;
        }
        
        // Cache only if we have valid data
        if (data.data && data.data.video_templates && data.data.video_templates.length > 0) {
          await CacheService.set(cacheKey, data);
          console.log('Collection cached successfully');
        }
        
        return data;
      } catch (error) {
        lastError = error as Error;
        if (attempt < retries - 1) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    throw lastError || new Error('Failed to fetch after retries');
  }

  static async searchTemplates(query: string, retries = 3): Promise<ApiResponse> {
    const cacheKey = `search_${query.toLowerCase().trim()}`;
    
    // Try to get from cache first
    const { CacheService } = await import('./cache');
    const cachedData = await CacheService.get<ApiResponse>(cacheKey);
    
    if (cachedData) {
      console.log('Loading search results from cache');
      return cachedData;
    }

    // Fetch from API with retry logic
    const url = `${SEARCH_API_URL}?search=${encodeURIComponent(query)}`;
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: API_HEADERS
        });

        if (!response.ok) {
          throw new Error('Failed to search templates');
        }

        const data: ApiResponse = await response.json();
        
        // Ensure data structure is valid
        if (!data.data || !data.data.video_templates) {
          console.error('Invalid response structure:', data);
          return {
            ret: 'error',
            errmsg: 'Invalid response structure',
            data: {
              total: 0,
              video_templates: [],
              has_more: false,
            },
          };
        }
        
        // Cache only if we have valid data
        if (data.data && data.data.video_templates && data.data.video_templates.length > 0) {
          await CacheService.set(cacheKey, data);
          console.log('Search results cached successfully');
        }
        
        return data;
      } catch (error) {
        lastError = error as Error;
        if (attempt < retries - 1) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    throw lastError || new Error('Failed to search after retries');
  }
}

export const categories = [
  { id: 6001, display_name: "For You", emoji: "✨" },
  { id: 6003, display_name: "TikTok", emoji: "🎵" },
  { id: 6011, display_name: "Lifestyle", emoji: "🌟" },
  { id: 4010, display_name: "Business", emoji: "💼" },
  { id: 6086, display_name: "Student", emoji: "📚" },
  { id: 6008, display_name: "Velocity", emoji: "⚡" },
  { id: 6007, display_name: "Lyrics", emoji: "🎤" },
  { id: 6019, display_name: "Fitness", emoji: "💪" },
  { id: 6010, display_name: "Memes", emoji: "😂" },
  { id: 6002, display_name: "Effects", emoji: "✨" },
  { id: 6004, display_name: "Celebrate", emoji: "🎉" },
  { id: 6005, display_name: "Fandom", emoji: "💜" },
  { id: 6080, display_name: "Editor's Picks", emoji: "🏆" },
  { id: 6029, display_name: "Gaming", emoji: "🎮" },
  { id: 6104, display_name: "Daily VLOG", emoji: "📹" },
  { id: 6105, display_name: "Travel VLOG", emoji: "✈️" },
  { id: 6107, display_name: "Collage", emoji: "🖼️" },
  { id: 6108, display_name: "Slideshow", emoji: "📸" },
  { id: 6113, display_name: "Hot", emoji: "🔥" },
  { id: 6094, display_name: "AI Filter", emoji: "🤖" },
  { id: 6038, display_name: "Aesthetic", emoji: "🌸" },
  { id: 6009, display_name: "Friends", emoji: "👯" },
];
