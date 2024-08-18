export interface UnsplashImage {
    id: string;
    urls: {
        regular: string;
    };
    alt_description?: string;
    user: {
        name: string;
    };
}
