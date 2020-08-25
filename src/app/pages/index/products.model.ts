
export interface Products {
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


export interface Storys {
    _id: string;
    title: string;
    Subtitle: string;
    storyMedia: [{
        public_id: string,
        url: string
    }];
    storyText: string;
    React: [{
        reactor: string,
        reaction: string
    }];
    Comments: [{
        author: string,
        commentText: string
    }];

}

