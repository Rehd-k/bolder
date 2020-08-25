export interface Sellers {
    _id: string;
    companyLogo: {
        url: string,
        public_id: string
    };
    companyName: string;
    rating: number;
    isVerified: boolean;
    Website: string;
    headerImage: string;
    Address: {
        location: string,
        state: string
    };
    reviews: [{
        author: string,
        reviewHeader: string,
        rating: number,
        reviewText: string
    }];
    About: string;
    Types: string[];
    follwers: [{
        follwerId: string,
        followerName: string,
    }];
    createdOn: Date;
}


























