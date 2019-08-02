import Emitter from 'emmett';
const toastEmitter = new Emitter();
enum ToastEvents {
  ShowToast = 'showToast',
}
export {
  toastEmitter,
  ToastEvents,
};