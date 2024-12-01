import Image from "next/image";

const ProductDemo = () => {
  return (
    <div className=" max-w-7xl mx-auto px-8 sm:px-6 md:px-[100] pt-10 sm:pt-20">
      <Image
        src="https://images.unsplash.com/photo-1682506456442-a051e8dae813?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="product-demo-img"
        layout="responsive"
        width={16} // Aspect ratio width
        height={9} // Aspect ratio height
      />
    </div>
  );
};

export default ProductDemo;
