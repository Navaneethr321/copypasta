import Paste from './Paste';
export default interface UserData {
  hasPassword: boolean;
  pastes: Array<Paste>;
}