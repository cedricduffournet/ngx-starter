import { ModalOptions } from 'ngx-bootstrap/modal/modal-options.class';

export const GLOBAL_MODAL_CONFIG: ModalOptions = {
  animated: false
};

export const CRUD_MODAL_CONFIG: ModalOptions = {
  ...GLOBAL_MODAL_CONFIG,
  keyboard: false,
  ignoreBackdropClick: true
};
