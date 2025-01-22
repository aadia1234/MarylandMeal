import MacroDocument from "./MacroDocument";

export default interface FoodLogDocument {
    date: Date;
    macros: {
        target: MacroDocument,
        consumed: MacroDocument
    }
    ids: { id: number, quantity: number }[];
}