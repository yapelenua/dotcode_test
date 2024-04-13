export interface INode {
  id: string;
  type: string;
  label: string;
  position: { x: number; y: number };
  style: { background: string; border: string; width: string; height: string };
}


export interface ITransaction {
  hash: string;
  x: {
    inputs: { prev_out: { addr: string } }[];
    out: { addr: string; value: number }[];
  };
}

export type TWebSocket = WebSocket | null