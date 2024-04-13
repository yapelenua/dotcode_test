import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ITransaction, TWebSocket } from '../../types/app.types'


export const UseBittableStore = defineStore('bittableStore', () => {
  
  let connection: TWebSocket = null;
  const transactions = ref<ITransaction[]>([]);
  const totalAmount = ref(0);
  
  const sendMessage = (message: string) => {
    console.log("Sending message:", message);
    if (connection && connection.readyState === WebSocket.OPEN) {
      connection.send(message);
    } else {
      console.error("WebSocket connection is not open.");
    }
  };
  
  const reset = () => {
    transactions.value = [];
    recheckTotal();
  };
  
  const recheckTotal = () => {
    totalAmount.value = 0;
  };
  
  console.log("Starting connection to WebSocket Server");
  connection = new WebSocket("wss://ws.blockchain.com/inv");
  
  connection.onmessage = (event: MessageEvent) => {
    console.log("Received message:", event.data);
    const data = JSON.parse(event.data);
    if (data.op === "utx") {
      transactions.value.push(data as ITransaction);
      totalAmount.value += data.x.out[0].value;
    }
  };
  
  connection.onopen = (event: Event) => {
    console.log("Successfully connected to the WebSocket server.");
  };
  
  connection.onerror = (event: Event) => {
    console.error("WebSocket error:", event);
  };

  return {
    sendMessage,
    reset,
    transactions,
    totalAmount,
  }
})