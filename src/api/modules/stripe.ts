import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';

export async function verifyDocument(): Promise<boolean> {
    const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
    let secret;
    
    try {
        const { data } = await axios.post("/api/v1/user/me/verification", { "type": "document" });
        secret = data.client_secret;
    } catch (e) {
        try {
            const { data } = await axios.get("/api/v1/user/me/verification");
            secret = data.client_secret;
            if(data.status == "verified") return true;
        } catch (e) {
            return false;
        }
    }
    
    const stripeError = (await stripe?.verifyIdentity(secret))?.error;
    return stripeError === null ? true : false;
}