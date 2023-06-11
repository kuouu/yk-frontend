import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const END_POINT = process.env.END_POINT

// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: END_POINT!,
  consumerKey: process.env.WOOCOMMERCE_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_SECRET!,
  version: "wc/v3"
});

// fetch all products from WooCommerce //
export const fetchWooCommerceProducts = async() =>  {
  try {
    const response = await api.get("products")
    return response.data
  } catch (error: any) {
    console.log(error)
  }
}