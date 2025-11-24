import { ProductCard } from "@/components/product/product-card";
import { PRODUCTS } from "@/lib/data";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      {/* Hero Section (Placeholder) */}
      <section className="mb-12 overflow-hidden rounded-2xl bg-gray-900 text-white">
        <div className="flex flex-col items-center justify-between gap-8 p-8 md:flex-row md:p-16">
          <div className="max-w-lg space-y-4">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Công nghệ mới <br /> <span className="text-blue-400">Trải nghiệm mới</span>
            </h1>
            <p className="text-gray-300">
              Khám phá các sản phẩm công nghệ hàng đầu với mức giá ưu đãi nhất trong tháng này.
            </p>
            <button className="rounded-full bg-white px-8 py-3 font-bold text-gray-900 transition hover:bg-gray-100">
              Mua ngay
            </button>
          </div>
          <div className="relative h-64 w-full md:h-80 md:w-1/2">
            {/* Placeholder for Hero Image */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"></div>
          </div>
        </div>
      </section>


      {/* Hot Products Section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
            Xem tất cả
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
          {/* Duplicate for demo grid */}
          {PRODUCTS.map((product) => (
            <ProductCard key={`${product.id}-copy`} {...product} id={`${product.id}-copy`} />
          ))}
        </div>
      </section>
    </div>
  );
}
