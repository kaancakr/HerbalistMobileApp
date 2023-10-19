import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../constans/translation/I18n";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.defaultLocale);
  const [languageChanged, setLanguageChanged] = useState(false);

  useEffect(() => {
    const fetchSelectedLanguage = async () => {
      try {
        const language = await AsyncStorage.getItem("selectedLanguage");
        if (language) {
          setSelectedLanguage(language);
          i18n.locale = language;
        }
      } catch (error) {
        console.error("Error fetching language from AsyncStorage:", error);
      }
    };

    fetchSelectedLanguage();
  }, []);

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    i18n.locale = language;
    setLanguageChanged(true); // Set languageChanged to trigger updates

    try {
      await AsyncStorage.setItem("selectedLanguage", language);
    } catch (error) {
      console.error("Error saving language to AsyncStorage:", error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        handleLanguageChange,
        languageChanged,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
