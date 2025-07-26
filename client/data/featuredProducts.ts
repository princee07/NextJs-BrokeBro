// featuredProducts.ts
// Exporting featured products array for use in EcommerceHero

export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    isSale?: boolean;
    discount?: number;
    description?: string;
    code?: string;
    codeType?: string; // 'fixed' or 'percentage'
}

const featuredProducts: Product[] = [
    {
        id: 1,
        name: "Canva Pro Subscription",
        price: 89.99,
        originalPrice: 129.99,
        image: '/assets/logos/canva-logo.png',
        rating: 4.8,
        reviews: 2847,
        isNew: true,
        isSale: true,
        discount: 31,
        description: "Unlock premium features with Canva Pro for stunning designs.",
        code: "CANVA10",
        codeType: "fixed",
    },
    {
        id: 2,
        name: "Grammarly Premium",
        price: 199.99,
        originalPrice: 249.99,
        image: "/assets/logos/grammarly.png",
        rating: 4.6,
        reviews: 1923,
        isSale: true,
        discount: 20,
        description: "25% off Grammarly premium for students",
        code: "GRAMMARLY20",
        codeType: "fixed",
    },
    {
        id: 3,
        name: "Notion Pro Plan",
        price: 59.99,
        image: "/assets/logos/notion (1).png",
        rating: 4.9,
        reviews: 956,
        isNew: true,
        description: "Unlock 100% off on your Notion's workspace.",
        code: "NOTION100",
        codeType: "fixed",
    },
    {
        id: 4,
        name: "Microsoft Office 365",
        price: 34.99,
        originalPrice: 49.99,
        image: "/assets/logos/microsoft.png",
        rating: 4.5,
        reviews: 743,
        isSale: true,
        discount: 30,
        description: "Get a 3-month free trial on Microsoft 365 Personal, then 50% off.",
        code: "OFFICE36550",
        codeType: "fixed",
    },
    {
        id: 5,
        name: "HP Laptop",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://logos-world.net/wp-content/uploads/2020/12/Hewlett-Packard-Logo-2009.png",
        rating: 4.7,
        reviews: 1456,
        isSale: true,
        discount: 20,
        description: "Get exclusive student offers on hp laptops",
        code: "HPSTUDENT20",
        codeType: "fixed",
    },
    {
        id: 6,
        name: "Figma Professional",
        price: 49.99,
        image: "/assets/logos/figma.png",
        rating: 4.8,
        reviews: 892,
        isNew: true,
        description: "Free figma Education plan to students and educators",
        code: "FIGMAEDU",
        codeType: "fixed",
    },
    {
        id: 7,
        name: "Dell",
        price: 49.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6j9ncPmKx_M7HFjWoRe5xp_IhRm4Fdyw7w&s",
        rating: 4.8,
        reviews: 892,
        isNew: true,
        description: "Unlock special deals for students, parents, and education staff with exclusive vouchers",
        code: "DELLSTUDENT",
        codeType: "fixed",
    },
    {
        id: 8,
        name: "Lenovo",
        price: 49.99,
        image: "https://w7.pngwing.com/pngs/631/322/png-transparent-lenovo-logo-laptop-lenovo-thinkpad-thinkpad-x1-carbon-intel-dell-lenovo-logo-electronics-text-rectangle.png",
        rating: 4.8,
        reviews: 892,
        isNew: true,
        description: "Upto 55% off on student laptop",
        code: "LENOVO55",
        codeType: "fixed",
    },
    {
        id: 9,
        name: "Apple MacBook Pro",
        price: 49.99,
        image: "https://images.seeklogo.com/logo-png/42/1/apple-logo-png_seeklogo-427436.png",
        rating: 4.8,
        reviews: 892,
        isNew: true,
        description: "Save up to ₹10000 on select Mac or iPad with education pricing.",
        code: "APPLEEDU",
        codeType: "fixed",
    }
];

export default featuredProducts;
