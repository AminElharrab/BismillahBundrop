import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ConfirmationPage = () => {
  const { receiptid } = useParams();
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/receipts/${receiptid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch receipt");
        }
        const data = await response.json();
        setReceipt(data);
      } catch (error) {
        console.error("Error fetching receipt:", error);
      }
    };

    fetchReceipt();
  }, [receiptid]);

  if (!receipt) {
    return <div>Loading...</div>;
  }

  return (
    <div className="confirmation">
      <h2>Thank you for your order!</h2>
      <p>Your order details:</p>
      <ul>
        {receipt.orderDetails.map((item) => (
          <li key={item.id}>
            {item.title} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${receipt.totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default ConfirmationPage;
