// featuredProducts.ts

export interface Product {
    id: number;
    name: string;
    price?: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    isSale?: boolean;
    description?: string;
    code?: string;
    slug?: string;
    codeType?: string; // 'fixed' or 'percentage'
    offerDetails?: {
        eligibility: string;
        steps: string[];
        note: string;
    };
}

const featuredProducts: Product[] = [
    {
        id: 1,
        name: "Microsoft 365 Student Offer",
        price: 0,
        originalPrice: 1899,
        image: "/assets/technology/microsoft.png",
        rating: 4.9,
        reviews: 4213,
        isNew: true,
        isSale: true,
        description: "Students enjoy 3 months of Microsoft 365 Personal for free",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "College students with valid .edu or college-issued email",
            steps: [
                "Visit the Microsoft 365 College Student Pricing page",
                "Sign in or create a Microsoft account",
                "Verify student status via college email",
                "Start your 3-month free trial"
            ],
            note: "A valid payment method is required..."
        }
    },
    {
        id: 2,
        name: "Notion for Students",
        price: 0,
        originalPrice: 500,
        image: "/assets/technology/notion.png",
        rating: 4.8,
        reviews: 3121,
        isNew: true,
        isSale: true,
        description: "Free Plus Plan for students, with 50% off Notion AI",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Students and educators at accredited colleges and universities",
            steps: [
                "Sign up or log in to Notion using your school email",
                "Go to Settings → Billing → Change Plan",
                "Select 'Get free Education plan'"
            ],
            note: "Institution must be listed in the WHED database..."
        }
    },
    {
        id: 3,
        name: "Canva for Education",
        price: 0,
        originalPrice: 3999,
        image: "/assets/technology/canva.png",
        rating: 4.9,
        reviews: 2756,
        isNew: false,
        isSale: true,
        description: "Free Canva Pro access for certified K–12 teachers",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Certified K–12 teachers...",
            steps: [
                "Visit the Canva for Education page",
                "Click 'Get verified' and follow the instructions"
            ],
            note: "Not available for higher education institutions."
        }
    },
    {
        id: 4,
        name: "Spotify Premium Student",
        price: 59,
        originalPrice: 119,
        image: "/assets/technology/spotify.png",
        rating: 4.7,
        reviews: 6832,
        isNew: false,
        isSale: true,
        description: "Enjoy ad-free music, offline listening",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Students enrolled in accredited colleges or universities",
            steps: [
                "Visit the Spotify Student Discount page",
                "Sign in or create a Spotify account",
                "Verify student status"
            ],
            note: "1-month free then ₹59/month..."
        }
    },
    {
        id: 5,
        name: "Adobe Creative Cloud Student Plan",
        price: 1999,
        originalPrice: 5744,
        image: "/assets/technology/adobe.png",
        rating: 4.6,
        reviews: 3419,
        isNew: false,
        isSale: true,
        description: "Get access to 20+ Adobe apps like Photoshop",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Students with valid school ID",
            steps: [
                "Go to the Adobe Student Plan page",
                "Click on 'Buy Now'",
                "Sign in and provide proof of student status"
            ],
            note: "Discount subject to verification..."
        }
    },
    {
        id: 6,
        name: "Apple Music Student Plan",
        price: 59,
        originalPrice: 119,
        image: "/assets/technology/applemusic.png",
        rating: 4.7,
        reviews: 4992,
        isNew: false,
        isSale: true,
        description: "Get Apple Music at ₹59/month with free Apple TV+",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Verified college students",
            steps: [
                "Open Apple Music app",
                "Go to 'Listen Now'",
                "Verify via SheerID"
            ],
            note: "Apple TV+ included..."
        }
    },
    {
        id: 7,
        name: "Grammarly for Students",
        price: 0,
        originalPrice: 999,
        image: "/assets/technology/grammarly.png",
        rating: 4.5,
        reviews: 3887,
        isNew: false,
        isSale: true,
        description: "Improve your writing with Grammarly Free",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Students with a valid school email",
            steps: [
                "Visit the Grammarly for Students page",
                "Sign up using your school email"
            ],
            note: "Free version includes limited features..."
        }
    },
    {
        id: 8,
        name: "Lenovo Student Store",
        image: "/assets/technology/lenovo.png",
        rating: 4.4,
        reviews: 1621,
        isNew: false,
        isSale: true,
        description: "Save on laptops and accessories at Lenovo",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Verified students via SheerID",
            steps: [
                "Visit the Lenovo Student Store",
                "Add products to cart",
                "Verify student status at checkout"
            ],
            note: "Extra savings on select models."
        }
    },
    {
        id: 9,
        name: "Realme Student Program",
        image: "/assets/technology/relame.png",
        rating: 4.3,
        reviews: 1342,
        isNew: true,
        isSale: true,
        description: "Exclusive offers on Realme smartphones",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Students with verified status",
            steps: [
                "Visit the Realme Student Discount Program page",
                "Verify your student status",
                "Access special discounts"
            ],
            note: "Discounts may vary..."
        }
    },
    {
        id: 10,
        name: "Dell Student Offers",
        image: "/assets/technology/dell.png", // Add this image
        rating: 4.4,
        reviews: 2104,
        isNew: false,
        isSale: true,
        description: "Access exclusive deals on Dell laptops",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "College/university students",
            steps: [
                "Visit the Dell Student Offers page",
                "Select your product and verify status"
            ],
            note: "Offers vary depending on product..."
        }
    },
    {
        id: 11,
        name: "HP Student Store",
        image: "/assets/technology/Hp.png",
        rating: 4.4,
        reviews: 1932,
        isNew: false,
        isSale: true,
        description: "Get up to ₹8000 off and cashback on laptops",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Students with school email",
            steps: [
                "Go to the HP Student Store",
                "Register with school email",
                "Browse and buy products"
            ],
            note: "Cashback may apply on select models..."
        }
    },
    {
        id: 12,
        name: "GluedRC Game Student Offer",
        price: 0,
        originalPrice: 999,
        image: "/assets/mostviewed/gllued.png",
        rating: 4.5,
        reviews: 1200,
        isNew: true,
        isSale: true,
        description: "Choose from two exclusive GluedRC combos",
        code: undefined,
        codeType: undefined,
        offerDetails: {
            eligibility: "Students with valid school email. BrokeBro users only.",
            steps: [
                "1. Swipe & Strike Combo (Rs 399 | Mon-Fri):",
                "- 1 Game of Bowling",
                "- 5 Arcade Game Swipes",
                "- 1 Welcome Drink",
                "2. Play, Bite, Repeat (Rs 699 | Mon-Fri):",
                "- 3 Hours of Unlimited Gaming",
                "- 1 Veg Burger",
                "- 1 Welcome Drink"
            ],
            note: "Capped at 1 ticket/day/user. BrokeBro users only."
        }
    }
];

export default featuredProducts;
