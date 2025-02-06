import React from 'react';
import { Link } from 'gatsby';

interface Translation {
  lang: string;
  slug: string;
}

interface LanguageSwitcherProps {
  translations: Translation[];
  currentLang: string;
}

const LanguageSwitcher = ({ translations, currentLang }: LanguageSwitcherProps) => {
  if (!translations || translations.length === 0) return null;

  const languageNames: { [key: string]: string } = {
    ru: 'Русский',
    en: 'English',
    uk: 'Українська',
  };

  return (
    <div className="language-switcher">
      <div className="label">
        <h4>Available languages:</h4>
      </div>
      <div>
        {translations.map((translation) => (
          <Link
            key={translation.lang}
            to={translation.lang === 'en' 
              ? `/posts/${translation.slug}`
              : `/${translation.lang}/posts/${translation.slug}`}
            className="language-link"
          >
            {languageNames[translation.lang] || translation.lang}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
