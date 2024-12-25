import { Keyboard } from "grammy";
export const contactKeyboard = new Keyboard()
    .text("Share your contact")
    .resized()
    .requestContact();
export const locationKeyboard = new Keyboard()
    .text("Share your location")
    .resized()
    .requestLocation();
