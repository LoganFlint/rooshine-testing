export interface Wallet {
  publicKey: string;
  userId: string | null;
}

export interface WalletAuth {
	timestamp: string,
	address: string,
	signature: string,
}
