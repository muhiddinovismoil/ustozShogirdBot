import { Keyboard } from "grammy";
export const menuButtons = new Keyboard()
    .text("Sherik kerak", "sherik")
    .resized()
    .text("Ish joyi kerak", "ish")
    .resized()
    .row()
    .text("Hodim kerak", "hodim")
    .resized()
    .text("Ustoz kerak", "ustoz")
    .row()
    .resized()
    .text("Shogird kerak", "shogird")
    .resized();
