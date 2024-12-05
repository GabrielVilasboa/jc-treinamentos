import { reactive } from 'vue';

const alerts = reactive([]);

export const addAlert = ({ title, message, alertType = 'info', duration = 3000 }) => {
  const id = Date.now();
  alerts.push({ id, title, message, alertType });

  setTimeout(() => {
    closeAlert(id);
  }, duration);
};

export const closeAlert = (id) => {
  const index = alerts.findIndex(alert => alert.id === id);
  if (index !== -1) {
    alerts.splice(index, 1);
  }
};

export const useAlerts = () => {
  return { alerts, addAlert, closeAlert };
};
