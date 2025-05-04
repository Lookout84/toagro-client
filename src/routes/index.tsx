import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { PublicRoute } from './PublicRoute';

// Pages
import { HomePage } from '@pages/HomePage';
import { LoginPage } from '@pages/LoginPage';
import { RegisterPage } from '@pages/RegisterPage';
import { ForgotPasswordPage } from '@pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';
import { ListingsPage } from '@pages/ListingsPage';
import { ListingDetailsPage } from '@pages/ListingDetailsPage';
import { CreateListingPage } from '@pages/CreateListingPage';
import { EditListingPage } from '@pages/EditListingPage';
import { CategoryPage } from '@pages/CategoryPage';
import { ProfilePage } from '@pages/ProfilePage';
import { SettingsPage } from '@pages/SettingsPage';
import { UserListingsPage } from '@pages/UserListingsPage';
import { ChatPage } from '@pages/ChatPage';
import { PaymentsPage } from '@pages/PaymentsPage';
import { PaymentResultPage } from '@pages/PaymentResultPage';
import { NotFoundPage } from '@pages/NotFoundPage';

// Admin Pages
import { AdminDashboardPage } from '@pages/admin/AdminDashboardPage';
import { AdminUsersPage } from '@pages/admin/AdminUsersPage';
import { AdminListingsPage } from '@/pages/admin/AdminListingsPage';
import { AdminCategoriesPage } from '@pages/admin/AdminCategoriesPage';
import { AdminPaymentsPage } from '@pages/admin/AdminPaymentsPage';
import { AdminSettingsPage } from '@pages/admin/AdminSettingsPage';

export const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/listings/:id" element={<ListingDetailsPage />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/categories/:slug" element={<CategoryPage />} />

      {/* Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/create-listing" element={<CreateListingPage />} />
        <Route path="/listings/:id/edit" element={<EditListingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/my-listings" element={<UserListingsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:userId" element={<ChatPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/payments/:transactionId" element={<PaymentResultPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/listings" element={<AdminListingsPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route path="/admin/payments" element={<AdminPaymentsPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </ReactRoutes>
  );
};