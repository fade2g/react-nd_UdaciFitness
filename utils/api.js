import { AsyncStorage } from 'react-native';
import {CALENDAR_STORAGE_KEY, formatCalendarResults} from "./_calendar";

export function fetchCalendarResults() {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}

/**
 * Stores the entry with the given key using AsyncStorage
 * @param entry {object} Entry to be stored
 * @param key {string} Key to then entry
 */
export function submitEntry({entry, key}) {
  AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))

}

/**
 * Removes the entry from the local DB (AKA AsyncStorage
 * @param key {string} The key of the item to be removed
 * @returns {Promise.<Object>}
 */
export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
    })
}
