export const localePrice = (price: number) => {
   return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
   });
}