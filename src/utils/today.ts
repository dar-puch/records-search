const date = new Date();
export const today = () =>
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
