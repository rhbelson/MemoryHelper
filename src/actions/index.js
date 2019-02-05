import { ADD_REMINDER, DELETE_REMINDER, DELETE_ALL_REMINDERS, TOGGLE_MODAL } from '../constants';

export const addReminder = (text, dueDate, phone, modal) => {
  const action = {
    type: ADD_REMINDER,
    text,
    dueDate,
    phone,
    modal,
  };
  return action;
}

export const deleteReminder = (id) => {
  const action = {
    type: DELETE_REMINDER,
    id
  };
  return action;
}

export const deleteAllReminders = () => {
  const action = {
    type: DELETE_ALL_REMINDERS,
  };
  return action;
}
