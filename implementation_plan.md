# Kế hoạch Triển khai E-commerce Website (Giống seo-goods.com)

Dựa trên phân tích trang web mục tiêu, đây là các bước để xây dựng một trang web tương tự sử dụng công nghệ hiện đại (Next.js & Tailwind CSS).

## 1. Phân tích & Thiết kế
- **Giao diện**: Clean, nền trắng, tập trung vào hình ảnh sản phẩm.
- **Bố cục**:
  - Header: Logo, Thanh tìm kiếm, Giỏ hàng.
  - Body: Banner quảng cáo, Danh sách sản phẩm (Grid), Các mục nổi bật (Hot, Sale).
  - Footer: Thông tin liên hệ, chính sách.
- **Tính năng chính**: Xem sản phẩm, Tìm kiếm, Thêm vào giỏ, Thanh toán (mô phỏng).

## 2. Công nghệ sử dụng (Tech Stack)
- **Framework**: Next.js (React) - Tối ưu cho SEO và hiệu năng.
- **Styling**: Tailwind CSS - Thiết kế nhanh, hiện đại.
- **Icons**: Lucide React hoặc Heroicons.
- **State Management**: React Context API (cho Giỏ hàng).
- **Dữ liệu**: Mock Data (dữ liệu giả) ban đầu, sau đó có thể kết nối API/CMS.

## 3. Các bước thực hiện chi tiết

### Bước 1: Khởi tạo Dự án
- Cài đặt Next.js + Tailwind CSS.
- Cấu hình font chữ và màu sắc cơ bản (Design System).

### Bước 2: Xây dựng Components Cơ bản
- **Header**: Bao gồm Logo, Input tìm kiếm, Icon giỏ hàng với số lượng.
- **Footer**: Các liên kết chính sách, thông tin liên hệ.
- **ProductCard**: Hiển thị ảnh, tên, giá, nút "Mua ngay".

### Bước 3: Xây dựng Trang chủ (Home Page)
- **Hero Section**: Banner chạy slide hoặc ảnh tĩnh lớn.
- **Product Grid**: Lưới hiển thị sản phẩm (Responsive mobile/desktop).
- **Categories**: Các section như "Sản phẩm bán chạy", "Giảm giá".

### Bước 4: Chức năng Giỏ hàng (Cart)
- Tạo `CartContext` để quản lý trạng thái giỏ hàng toàn cục.
- Trang Giỏ hàng: Hiển thị danh sách đã chọn, tổng tiền.

### Bước 5: Trang Chi tiết Sản phẩm (Product Detail)
- Hiển thị ảnh lớn, thông tin chi tiết, nút thêm vào giỏ.

### Bước 6: Hoàn thiện & Tối ưu
- Responsive check (Mobile/Tablet).
- SEO tags (Title, Meta description).
- Hiệu ứng UI (Hover, Transitions).
