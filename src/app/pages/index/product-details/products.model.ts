export interface ProductsSpec {
    Category: string;
    Color: string[];
    Description: [{
        DescriptionText: string,
        Features: string[],
        Specification: string[],
        _id: string,
    }];
    For: string;
    Images: [{
        public_id: string,
        url: string
    }];
    MarketPrice: number;
    Price: number;
    Producers: string;
    Sizes: string[];
    Subtitle: string;
    rating: number;
    Tags: string[];
    Title: string;
    Weight: string[];
    amount: number;
    mainMaterial: string;
    reviews: [{
        reviewText: string,
        author: string,
        rating: number
    }];
    sizeChat: [];
    stockLevel: number;
    _id: string;
    IsSaved: boolean;
}

export interface Advert {
    _id: string;
    Images: {
        public_id: string,
        url: string
    };
    Title: string;
    Subtitle: string;
    rating: number;
    MarketPrice: number;
    Price: number;
    advertString: string;
    company: string;
}
