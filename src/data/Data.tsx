import axios from 'axios';
import { UnsplashImage } from '../types/UnsplashImage';

const accessKey = import.meta.env.VITE_API_KEY;

const cache: { [key: number]: UnsplashImage[] } = {};

export const fetchImages = async (count: number = 4): Promise<UnsplashImage[]> => {
    // Check if the data is in the cache
    if (cache[count]) {
        console.log('Returning cached data:', cache[count]); // Log cached data
        return cache[count];
    }

    try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        const response = await axios.get(`https://api.unsplash.com/photos/random?count=${count}`, {
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        });
        console.log('API Response:', response.data); // Log the response data
        cache[count] = response.data; // Cache the response data
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
};
