export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    description?: string;
    isHot?: boolean;
    isSale?: boolean;
    specs?: Record<string, string>;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Tai nghe Bluetooth Chống ồn Sony WH-1000XM5",
        price: 6990000,
        originalPrice: 8490000,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
        description: "Tai nghe chống ồn hàng đầu thế giới với thiết kế mới, nhẹ hơn và thoải mái hơn. Thời lượng pin lên đến 30 giờ.",
        isHot: true,
        isSale: true,
        specs: {
            "Thương hiệu": "Sony",
            "Kết nối": "Bluetooth 5.2",
            "Pin": "30 giờ",
            "Chống ồn": "Active Noise Cancelling (ANC)"
        }
    },
    {
        id: 2,
        name: "Loa Bluetooth JBL Flip 6 - Âm thanh mạnh mẽ",
        price: 2590000,
        originalPrice: 2990000,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
        description: "Loa di động chống nước IP67, âm thanh JBL Original Pro Sound mạnh mẽ, pin 12 giờ.",
        isHot: false,
        isSale: true,
        specs: {
            "Thương hiệu": "JBL",
            "Công suất": "20W",
            "Pin": "12 giờ",
            "Chống nước": "IP67"
        }
    },
    {
        id: 3,
        name: "Đồng hồ thông minh Apple Watch Series 9",
        price: 9590000,
        originalPrice: 10490000,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800",
        description: "Chip S9 SiP mạnh mẽ nhất, màn hình sáng gấp đôi, thao tác chạm hai lần mới.",
        isHot: true,
        isSale: false,
        specs: {
            "Thương hiệu": "Apple",
            "Kích thước": "41mm / 45mm",
            "Màn hình": "Always-On Retina",
            "Chống nước": "WR50"
        }
    },
    {
        id: 4,
        name: "Máy ảnh Fujifilm X-T5 Body - Bạc",
        price: 43990000,
        originalPrice: 45990000,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
        description: "Cảm biến 40MP X-Trans CMOS 5 HR, quay video 6.2K/30p, ổn định hình ảnh IBIS 7 stop.",
        isHot: false,
        isSale: false,
        specs: {
            "Thương hiệu": "Fujifilm",
            "Cảm biến": "40MP APS-C",
            "Video": "6.2K 30p",
            "Trọng lượng": "557g"
        }
    },
];
