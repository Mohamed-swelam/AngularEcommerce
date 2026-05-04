export type ToastType = 'success' | 'danger' | 'warning' | 'info';

export const showToast = (message: string, type: ToastType = 'info'): void => {
  if (typeof document === 'undefined') return;

  const containerId = 'app-toast-container';
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-bg-${type} border-0 show`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  const wrapper = document.createElement('div');
  wrapper.className = 'd-flex';

  const body = document.createElement('div');
  body.className = 'toast-body';
  body.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close btn-close-white me-2 m-auto';
  closeButton.setAttribute('aria-label', 'Close');

  const removeToast = (): void => {
    toast.remove();
  };

  closeButton.addEventListener('click', removeToast);

  wrapper.appendChild(body);
  wrapper.appendChild(closeButton);
  toast.appendChild(wrapper);
  container.appendChild(toast);

  setTimeout(removeToast, 3000);
};
