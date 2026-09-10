import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SampleReaderModal } from './components/SampleReaderModal';
import { AuthModal } from './components/AuthModal';

// Views
import { HomeView } from './views/HomeView';
import { BooksCatalogView } from './views/BooksCatalogView';
import { BookDetailView } from './views/BookDetailView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { UserDashboardView } from './views/UserDashboardView';
import { CustomerAccountView } from './views/CustomerAccountView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { ResetPasswordView } from './views/ResetPasswordView';
import { VerifyEmailView } from './views/VerifyEmailView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { AuthorsView, AuthorDetailView } from './views/AuthorsView';
import { BlogsView, BlogDetailView } from './views/BlogsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { CategoriesView, CategoryDetailView } from './views/CategoriesView';
import {
  PrivacyPolicyView,
  TermsConditionsView,
  ShippingPolicyView,
  ReturnRefundPolicyView,
} from './views/PolicyViews';
import { SitemapView } from './views/SitemapView';

const MainRouter: React.FC = () => {
  const { currentPath, settings } = useStore();

  // Scroll to top on route change & update document title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let titleSuffix = 'Sahayak Books | Knowledge That Moves You Forward';
    if (currentPath === '/') {
      document.title = `${settings.brandName} - Powered by ${settings.parentCompany}`;
    } else if (currentPath.startsWith('/books/')) {
      document.title = `Book Dossier | ${settings.brandName}`;
    } else if (currentPath === '/books') {
      document.title = `Scholarly Publications Catalog | ${settings.brandName}`;
    } else if (currentPath === '/checkout') {
      document.title = `Secure Checkout | ${settings.brandName}`;
    } else if (currentPath.startsWith('/order-success')) {
      document.title = `Order Confirmed | ${settings.brandName}`;
    } else if (currentPath.startsWith('/track-order')) {
      document.title = `Track Consignment | ${settings.brandName}`;
    } else if (currentPath === '/dashboard') {
      document.title = `Reader Dashboard | ${settings.brandName}`;
    } else if (currentPath.startsWith('/admin')) {
      document.title = `Admin Master Control | ${settings.brandName}`;
    } else if (currentPath === '/authors') {
      document.title = `Authors & Jurists Faculty | ${settings.brandName}`;
    } else if (currentPath === '/blogs') {
      document.title = `Insights & Articles | ${settings.brandName}`;
    } else if (currentPath === '/about') {
      document.title = `About Sahayak Associates | ${settings.brandName}`;
    } else if (currentPath === '/contact') {
      document.title = `Contact Advisory Desk | ${settings.brandName}`;
    } else {
      document.title = `${settings.brandName} - ${settings.tagline}`;
    }
  }, [currentPath, settings]);

  // Route Dispatcher
  const renderRoute = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <HomeView />;
    }

    // 2. Books Catalog
    if (currentPath === '/books') {
      return <BooksCatalogView />;
    }

    // 3. Book Detail: /books/:slug
    if (currentPath.startsWith('/books/')) {
      const slug = currentPath.replace('/books/', '');
      return <BookDetailView slug={slug} />;
    }

    // 4. Checkout
    if (currentPath === '/checkout') {
      return <CheckoutView />;
    }

    // 5. Order Success: /order-success/:orderId
    if (currentPath.startsWith('/order-success')) {
      const parts = currentPath.split('/');
      const orderId = parts[2] || '';
      return <OrderSuccessView orderId={orderId} />;
    }

    // 6. Order Tracking: /track-order
    if (currentPath.startsWith('/track-order')) {
      return <OrderTrackingView />;
    }

    // Customer Authentication Routes
    if (currentPath.startsWith('/login')) {
      return <LoginView />;
    }
    if (currentPath.startsWith('/register')) {
      return <RegisterView />;
    }
    if (currentPath.startsWith('/forgot-password')) {
      return <ForgotPasswordView />;
    }
    if (currentPath.startsWith('/reset-password')) {
      return <ResetPasswordView />;
    }
    if (currentPath.startsWith('/verify-email')) {
      return <VerifyEmailView />;
    }
    if (currentPath === '/account' || currentPath.startsWith('/account/')) {
      return <CustomerAccountView />;
    }

    // 7. Customer Dashboard
    if (currentPath === '/dashboard') {
      return <CustomerAccountView />;
    }

    // 8. Admin Control Center
    if (currentPath.startsWith('/admin')) {
      return <AdminDashboardView />;
    }

    // 9. Authors Roster & Detail
    if (currentPath === '/authors' || currentPath === '/author') {
      return <AuthorsView />;
    }
    if (currentPath.startsWith('/authors/')) {
      const slug = currentPath.replace('/authors/', '');
      return <AuthorDetailView slug={slug} />;
    }
    if (currentPath.startsWith('/author/')) {
      const slug = currentPath.replace('/author/', '');
      return <AuthorDetailView slug={slug} />;
    }

    // 10. Blogs & Articles
    if (currentPath === '/blogs') {
      return <BlogsView />;
    }
    if (currentPath.startsWith('/blogs/')) {
      const slug = currentPath.replace('/blogs/', '');
      return <BlogDetailView slug={slug} />;
    }

    // 11. Categories & Disciplines
    if (currentPath === '/categories') {
      return <CategoriesView />;
    }
    if (currentPath.startsWith('/categories/')) {
      const slug = currentPath.replace('/categories/', '');
      return <CategoryDetailView slug={slug} />;
    }

    // 12. Institutional & Information Pages
    if (currentPath === '/about') {
      return <AboutView />;
    }
    if (currentPath === '/contact') {
      return <ContactView />;
    }
    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyView />;
    }
    if (currentPath === '/terms-conditions') {
      return <TermsConditionsView />;
    }
    if (currentPath === '/shipping-policy') {
      return <ShippingPolicyView />;
    }
    if (currentPath === '/returns-policy') {
      return <ReturnRefundPolicyView />;
    }
    if (currentPath === '/sitemap') {
      return <SitemapView />;
    }

    // Fallback default
    return <HomeView />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0B192C] font-sans antialiased selection:bg-[#C5A059] selection:text-[#0B192C]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">{renderRoute()}</main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <SampleReaderModal />
      <AuthModal />
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
