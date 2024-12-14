import { THEMES } from '@/lib/constants';

const useBodyClass = () => {
  const setBodyClass = (currentTheme: string, newTheme: string) => {
    if (newTheme === THEMES.LIGHT) document.body.classList.remove(currentTheme);
    else {
      if (currentTheme === THEMES.LIGHT) document.body.classList.add(newTheme);
      else document.body.classList.replace(currentTheme, newTheme);
    }
  };

  return { setBodyClass };
};

export default useBodyClass;
