/**
 * Payment Service
 * Simulates a secure payment gateway integration.
 */

const LATEST_TXN_KEY = "luxebook_latest_transaction";
const TXN_HISTORY_KEY = "luxebook_transaction_history";

import { authService } from "./authService";

const getUserKey = (baseKey) => {
  const user = authService.getCurrentUser();
  return user ? `${baseKey}_${user.id}` : baseKey;
};

export const paymentService = {
  /**
   * Processes a mock payment.
   * @param {Object} paymentDetails 
   * @param {Object} itemDetails 
   * @returns {Promise<Object>}
   */
  processPayment: async (paymentDetails, itemDetails) => {
    // Simulate network latency & gateway processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simulate validation error for testing (e.g. if CVV is '000')
    if (paymentDetails.cvv === '000') {
      throw new Error("Card declined by issuer. Please check your details.");
    }

    const timestamp = Date.now();
    const randomHex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    
    const transaction = {
      id: `TXN-${timestamp}-${randomHex}`,
      amount: itemDetails.price,
      currency: "USD",
      item: itemDetails.name,
      date: new Date().toISOString(),
      status: "COMPLETED",
      last4: paymentDetails.cardNumber.slice(-4)
    };

    // Save to latest transaction
    localStorage.setItem(getUserKey(LATEST_TXN_KEY), JSON.stringify(transaction));

    // Append to history
    const history = paymentService.getTransactionHistory();
    history.push(transaction);
    localStorage.setItem(getUserKey(TXN_HISTORY_KEY), JSON.stringify(history));

    return transaction;
  },

  /**
   * Retrieves the most recent transaction (useful for success page receipt).
   * @returns {Object|null}
   */
  getLatestTransaction: () => {
    const data = localStorage.getItem(getUserKey(LATEST_TXN_KEY));
    return data ? JSON.parse(data) : null;
  },

  /**
   * Retrieves the full transaction history.
   * @returns {Array}
   */
  getTransactionHistory: () => {
    const data = localStorage.getItem(getUserKey(TXN_HISTORY_KEY));
    return data ? JSON.parse(data) : [];
  }
};
