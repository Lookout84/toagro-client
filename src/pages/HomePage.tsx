import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchListings } from '@store/slices/listingsSlice';
import { fetchCategories } from '@store/slices/categoriesSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { ListingCard } from '@components/listings/ListingCard';
import { CategoryCard } from '@components/categories/CategoryCard';
import { Spinner } from '@components/common/Spinner';
import { SearchIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: listings, isLoading: listingsLoading } = useAppSelector(state => state.listings);
  const { items: categories, isLoading: categoriesLoading } = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchListings({ limit: 8 }));
    dispatch(fetchCategories({ active: true }));
  }, [dispatch]);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-primary-green py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Знайди або продай сільськогосподарську продукцію
            </h1>
            <p className="text-xl text-green-200 mb-8 max-w-3xl mx-auto">
              ToAgro - надійний маркетплейс для фермерів, оптовиків та покупців
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('search-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Шукати оголошення
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary-green">
                <Link to="/create-listing">Створити оголошення</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12" viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none">
            <path d="M0 48L1440 0V48H0Z" fill="var(--background-primary)" />
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-form" className="py-12 -mt-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <form className="flex gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Що ви шукаєте?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/50"
                />
              </div>
              <Button type="submit" size="lg">
                Шукати
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Популярні категорії</h2>
            <Link 
              to="/categories"
              className="inline-flex items-center text-primary-green hover:text-primary-green-hover transition-colors"
            >
              Дивитись всі
              <ArrowRightIcon className="ml-1 h-5 w-5" />
            </Link>
          </div>
          {categoriesLoading ? (
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.slice(0, 6).map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Listings Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Нові оголошення</h2>
            <Link 
              to="/listings"
              className="inline-flex items-center text-primary-green hover:text-primary-green-hover transition-colors"
            >
              Всі оголошення
              <ArrowRightIcon className="ml-1 h-5 w-5" />
            </Link>
          </div>
          {listingsLoading ? (
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {listings.slice(0, 8).map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Як це працює</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold">1</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Зареєструйтесь</h3>
              <p className="text-gray-600">Створіть безкоштовний акаунт за кілька хвилин</p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold">2</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Оберіть товар</h3>
              <p className="text-gray-600">Знайдіть те, що шукаєте, або створіть оголошення</p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold">3</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Здійсніть угоду</h3>
              <p className="text-gray-600">Безпечно зв'яжіться з продавцем і закінчіть оборудку</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готові почати продаж вашої продукції?
          </h2>
          <p className="text-lg text-green-200 mb-8 max-w-2xl mx-auto">
            Приєднуйтесь до тисяч фермерів та продавців, які вже користуються нашим маркетплейсом
          </p>
          <Button
            variant="secondary"
            size="lg"
          >
            <Link to="/create-listing">Створити оголошення</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};