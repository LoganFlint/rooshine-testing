import axios from "axios"
import { useStore } from "../../store"
import { Buffer } from "buffer";
import type { CardData } from "../circle";
import type { BillingPayload } from "../circle"
import * as openpgp from "../../../openpgp.mjs";

export async function getEncryptionKey(): Promise<{ keyId: string, publicKey: string }> {
	const store = useStore();
	const { data } = await axios.get(`/api/v1/user/me/card/encryption_key`);
	store.updateKeyId(data.keyId);
	store.updateCirclePublicKey(data.publicKey);
	return data;
}

export async function activateUser(
	param: BillingPayload
): Promise<string> {
	return (await axios.post(`/api/v1/user/me/activation`, param)).data;
}

export async function encrypt(item: string): Promise<string> {
	const publicKey = (await openpgp.readKey({ armoredKey: Buffer.from((await getEncryptionKey()).publicKey, "base64").toString() })) as openpgp.PublicKey;
	return Buffer.from((await openpgp.encrypt({
		message: (await openpgp.createMessage({ text: item })),
		encryptionKeys: publicKey
	})), "ascii").toString("base64");
}

export async function encryptCard(card: CardData): Promise<string> {
	return await encrypt(JSON.stringify(card));
}
