import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-gray-100 pt-12 pb-8 text-sm text-gray-600">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-gray-900">Về chúng tôi</h3>
                        <p className="mb-4">
                            SEO Goods chuyên cung cấp các sản phẩm công nghệ, gia dụng chất lượng cao với giá tốt nhất thị trường.
                        </p>
                        <p>Email: support@seogoods.com</p>
                    </div>

                    {/* Column 2: Policies */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-gray-900">Chính sách</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-blue-600">Chính sách bảo mật</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Điều khoản dịch vụ</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Chính sách đổi trả</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Vận chuyển & Giao hàng</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-gray-900">Hỗ trợ khách hàng</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-blue-600">Trung tâm trợ giúp</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Hướng dẫn mua hàng</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Kiểm tra đơn hàng</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter (Optional) */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-gray-900">Đăng ký nhận tin</h3>
                        <p className="mb-4">Nhận thông tin khuyến mãi mới nhất.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="w-full rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                            />
                            <button className="rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} SEO Goods. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
