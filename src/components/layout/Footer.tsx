import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-green text-white mt-auto">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="ToAgro" className="h-8 w-8" />
              <span className="text-xl font-bold">ToAgro</span>
            </Link>
            <p className="text-gray-300">
              Ваш надійний маркетплейс для купівлі та продажу сільськогосподарської продукції.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/listings" className="text-gray-300 hover:text-white transition-colors">
                  Оголошення
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">
                  Категорії
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Про нас
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Допомога</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  Питання та відповіді
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  Як це працює
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-white transition-colors">
                  Підтримка
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Політика конфіденційності
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Україна, Київ</li>
              <li>вул. Хрещатик, 1</li>
              <li>
                <a href="mailto:support@toagro.com" className="hover:text-white transition-colors">
                  support@toagro.com
                </a>
              </li>
              <li>
                <a href="tel:+380123456789" className="hover:text-white transition-colors">
                  +38 (012) 345-67-89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} ToAgro. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};