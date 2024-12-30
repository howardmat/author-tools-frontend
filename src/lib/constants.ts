export const QUERY_KEYS = {
  CHARACTERS: 'characters',
  LOCATIONS: 'locations',
  CREATURES: 'creatures',
  USER_SETTINGS: 'user-settings',
  WORKSPACES: 'workspaces',
  FILE: 'file',
};

const API_URL = import.meta.env.VITE_API_URL;
export const API_ENDPOINTS = {
  CHARACTERS: `${API_URL}/characters`,
  LOCATIONS: `${API_URL}/locations`,
  CREATURES: `${API_URL}/creatures`,
  USER_SETTINGS: `${API_URL}/user-setting`,
  WORKSPACE: `${API_URL}/workspace`,
  FILE: `${API_URL}/file`,
};

export const JWT_TEMPLATE = 'author-tools-jwt';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  DARK_ORANGE: 'dark-orange',
  DARK_BLUE: 'dark-blue',
  DARK_VIOLET: 'dark-violet',
};

export const DEFAULT_WORKSPACE_ID = 'DEFAULT';
