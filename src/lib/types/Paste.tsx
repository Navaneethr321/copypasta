import PasteTypes from './PasteTypes';
export default interface Paste {
  date: Date;
  text: string;
  type: PasteTypes;
}