// src/apiConfig.js
const API_BASE_URL = 'http://localhost/phucuong_api';

export const API_URLS = {
  LOGIN: `${API_BASE_URL}/login.php`,
  REGISTER: `${API_BASE_URL}/register.php`,
  PRODUCTS: `${API_BASE_URL}/products.php`,
  NEWS: `${API_BASE_URL}/news.php`,
  CHECKOUT: `${API_BASE_URL}/checkout.php`,
  GET_ORDERS: `${API_BASE_URL}/get_orders.php`,
  GET_ORDER_DETAILS: `${API_BASE_URL}/get_order_details.php`,
  ADMIN_GET_ALL_ORDERS: `${API_BASE_URL}/admin_get_all_orders.php`,
  ADMIN_UPDATE_ORDER_STATUS: `${API_BASE_URL}/admin_update_order_status.php`,
  ADMIN_GET_ORDER_DETAILS: `${API_BASE_URL}/admin_get_order_details.php`,

  // --- THÊM DÒNG NÀY ---
  ADMIN_DASHBOARD_STATS: `${API_BASE_URL}/admin_dashboard_stats.php`,
  ADMIN_REVENUE_REPORT: `${API_BASE_URL}/admin_revenue_report.php`,
  ADMIN_ADD_PRODUCT: `${API_BASE_URL}/admin_add_product.php`,
  ADMIN_DELETE_PRODUCT: `${API_BASE_URL}/admin_delete_product.php`,
  ADMIN_UPDATE_PRODUCT: `${API_BASE_URL}/admin_update_product.php`,

  ADMIN_USERS: `${API_BASE_URL}/admin_users.php`,
  ADMIN_ADD_USER: `${API_BASE_URL}/admin_add_user.php`,
  ADMIN_UPDATE_USER: `${API_BASE_URL}/admin_update_user.php`,
  ADMIN_DELETE_USER: `${API_BASE_URL}/admin_delete_user.php`,

  ADMIN_ADD_NEWS: `${API_BASE_URL}/admin_add_news.php`,
  ADMIN_UPDATE_NEWS: `${API_BASE_URL}/admin_update_news.php`,
  ADMIN_DELETE_NEWS: `${API_BASE_URL}/admin_delete_news.php`,

  SUBMIT_CONTACT: `${API_BASE_URL}/submit_contact.php`,
  ADMIN_GET_CONTACTS: `${API_BASE_URL}/admin_get_contacts.php`,
};