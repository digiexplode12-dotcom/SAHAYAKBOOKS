import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Book, Author, Coupon, Order, OrderStatus, BookFormat, UserRole, MediaItem, ReviewStatus, ContactEnquiry } from '../types';
import { ImageUploadField } from '../components/ImageUploadField';
import { AdminMediaLibrary } from '../components/AdminMediaLibrary';
import { R2StorageSettingsCard } from '../components/R2StorageSettingsCard';
import { AdminAuthorsSection } from '../components/AdminAuthorsSection';
import { AdminGoogleShoppingSection } from '../components/AdminGoogleShoppingSection';
import { BookGoogleShoppingTab } from '../components/BookGoogleShoppingTab';
import { processImageFile } from '../utils/imageUtils';
import {
  LayoutDashboard,
  BookPlus,
  ShoppingBag,
  Image as ImageIcon,
  Type,
  Layers,
  Users,
  Tag,
  Star,
  BarChart3,
  Mail,
  Send,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Truck,
  RotateCcw,
  Search,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  Package,
  Copy,
  Check,
  Eye,
  FileText,
  MessageSquare,
  Filter,
  ArrowUpRight,
  Download,
  Upload,
  X,
  Lock,
  UserCheck,
  Settings,
  History,
  Sliders,
  Printer,
  BookOpen,
  Award,
  Clock,
  ChevronRight,
  RefreshCw,
  Cloud,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    books,
    authors,
    categories,
    orders,
    coupons,
    reviews,
    enquiries,
    leads,
    newsletters,
    analyticsEvents,
    settings,
    mediaItems,
    allUsers,
    auditLogs,
    adminUser,
    hasAdminAccess,
    isSuperAdmin,
    adminLogin,
    adminLogout,
    updateSettings,
    updateAuthor,
    addAuthor,
    deleteAuthor,
    addBook,
    updateBook,
    deleteBook,
    duplicateBook,
    archiveBook,
    toggleFeatureBook,
    updateOrderStatus,
    addCoupon,
    deleteCoupon,
    toggleCoupon,
    updateReviewStatus,
    setReviewModeration,
    updateEnquiryStatus,
    updateLeadStatus,
    markEnquiryRead,
    deleteEnquiry,
    addMediaItem,
    deleteMediaItem,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    deleteReview,
    resetToDefaults,
    syncBookToGoogleMerchant,
    bulkSyncBooksToGoogleMerchant,
    googleMerchantStatus,
    currentPath,
    navigate,
  } = useStore();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'books'
    | 'google-shopping'
    | 'authors'
    | 'orders'
    | 'leads'
    | 'reviews'
    | 'media'
    | 'storage'
    | 'content'
    | 'brand'
    | 'sections'
    | 'coupons'
    | 'users'
    | 'analytics'
    | 'audit'
  >('overview');

  // Synchronize Tab with URL Route
  useEffect(() => {
    if (currentPath.includes('/admin/books')) setActiveTab('books');
    else if (currentPath.includes('/admin/google-shopping') || currentPath.includes('/admin/google-merchant') || currentPath.includes('/admin/shopping')) setActiveTab('google-shopping');
    else if (currentPath.includes('/admin/authors')) setActiveTab('authors');
    else if (currentPath.includes('/admin/orders')) setActiveTab('orders');
    else if (currentPath.includes('/admin/media')) setActiveTab('media');
    else if (currentPath.includes('/admin/storage')) setActiveTab('storage');
    else if (currentPath.includes('/admin/reviews')) setActiveTab('reviews');
    else if (currentPath.includes('/admin/leads')) setActiveTab('leads');
    else if (currentPath.includes('/admin/content') || currentPath.includes('/admin/pages')) setActiveTab('content');
    else if (currentPath.includes('/admin/brand') || currentPath.includes('/admin/branding') || currentPath.includes('/admin/settings')) setActiveTab('brand');
    else if (currentPath.includes('/admin/users') || currentPath.includes('/admin/customers')) setActiveTab('users');
    else if (currentPath.includes('/admin/sections')) setActiveTab('sections');
    else if (currentPath.includes('/admin/coupons')) setActiveTab('coupons');
    else if (currentPath.includes('/admin/analytics')) setActiveTab('analytics');
    else if (currentPath.includes('/admin/activity') || currentPath.includes('/admin/audit')) setActiveTab('audit');
    else if (currentPath === '/admin' || currentPath === '/admin/dashboard') setActiveTab('overview');
  }, [currentPath]);

  // Login Form State (when locked)
  const [loginEmail, setLoginEmail] = useState('admin@sahayakassociates.org');
  const [loginRole, setLoginRole] = useState<UserRole>('SUPER_ADMIN');
  const [loginError, setLoginError] = useState('');

  // Search & Filter States
  const [bookSearch, setBookSearch] = useState('');
  const [bookCategoryFilter, setBookCategoryFilter] = useState('all');
  const [bookStockFilter, setBookStockFilter] = useState('all');
  const [bookGoogleFilter, setBookGoogleFilter] = useState('all');
  const [syncingGoogleBookId, setSyncingGoogleBookId] = useState<string | null>(null);
  const [isSyncingAllGoogle, setIsSyncingAllGoogle] = useState(false);
  const [bookModalTab, setBookModalTab] = useState<'general' | 'google'>('general');

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [leadFilter, setLeadFilter] = useState<string>('all');
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState<string>('all');

  // Author Management State
  const [authorSearch, setAuthorSearch] = useState('');
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Partial<Author> | null>(null);
  const [newQualificationInput, setNewQualificationInput] = useState('');
  const [newExpertiseInput, setNewExpertiseInput] = useState('');

  // Book Editing / Adding Modal State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);
  const [newTakeaway, setNewTakeaway] = useState('');

  // Order Details / Invoice Modal State
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(500);

  // New Media Modal State
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState<'books' | 'authors' | 'homepage' | 'logos' | 'other'>('books');
  const [newMediaSize, setNewMediaSize] = useState('');
  const [newMediaDimensions, setNewMediaDimensions] = useState('');
  const [isMediaProcessing, setIsMediaProcessing] = useState(false);
  const [mediaUploadTab, setMediaUploadTab] = useState<'file' | 'url'>('file');
  const [copiedMediaId, setCopiedMediaId] = useState<string | null>(null);
  const quickMediaInputRef = useRef<HTMLInputElement>(null);
  const modalMediaInputRef = useRef<HTMLInputElement>(null);

  // New Staff User Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'EDITOR' as UserRole,
  });

  // Editable settings copy
  const [formSettings, setFormSettings] = useState(settings);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  // Deletion Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'book' | 'author' | 'coupon' | 'lead' | 'media' | 'user' | 'review' | 'reset';
    id: string;
    title: string;
    extraInfo?: string;
  } | null>(null);

  // Floating Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'book') {
      deleteBook(deleteTarget.id);
      showToast(`Book "${deleteTarget.title}" permanently removed from catalog.`);
    } else if (deleteTarget.type === 'author') {
      deleteAuthor(deleteTarget.id);
      showToast(`Author "${deleteTarget.title}" and associated profile removed.`);
    } else if (deleteTarget.type === 'coupon') {
      deleteCoupon(deleteTarget.id);
      showToast(`Coupon "${deleteTarget.title}" deleted.`);
    } else if (deleteTarget.type === 'lead') {
      deleteEnquiry(deleteTarget.id);
      showToast(`Inquiry lead from "${deleteTarget.title}" removed.`);
    } else if (deleteTarget.type === 'media') {
      deleteMediaItem(deleteTarget.id);
      showToast(`Media asset "${deleteTarget.title}" deleted.`);
    } else if (deleteTarget.type === 'user') {
      deleteUser(deleteTarget.id);
      showToast(`Staff member "${deleteTarget.title}" removed.`);
    } else if (deleteTarget.type === 'review') {
      deleteReview(deleteTarget.id);
      showToast(`Reader review deleted.`);
    } else if (deleteTarget.type === 'reset') {
      resetToDefaults();
      showToast(`Store catalog and demo state restored to factory defaults.`);
    }

    setDeleteTarget(null);
  };

  const handleArchiveFromModal = () => {
    if (!deleteTarget || deleteTarget.type !== 'book') return;
    archiveBook(deleteTarget.id);
    showToast(`Book "${deleteTarget.title}" status changed to archived.`);
    setDeleteTarget(null);
  };

  const handleOpenNewAuthor = () => {
    setEditingAuthor({
      name: '',
      slug: '',
      title: 'Author & Financial Educator',
      avatar: 'https://pub-d7c01d3edc7e4dbab0acb59d64c988a8.r2.dev/sahayak/authors/default-author.png',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      bio: '',
      biography: '',
      qualifications: ['B.Com (Hons)', 'Certified Financial Planner (CFP)'],
      expertise: ['Financial Planning', 'Personal Finance', 'Retirement Strategies'],
      socialLinks: {
        website: 'https://sahayakassociates.org',
        linkedin: '',
        twitter: '',
        instagram: '',
        youtube: '',
      },
      publishedBookCount: 0,
      articlesCount: 0,
    });
    setIsAuthorModalOpen(true);
  };

  const handleOpenEditAuthor = (author: Author) => {
    setEditingAuthor({ ...author });
    setIsAuthorModalOpen(true);
  };

  const handleSaveAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAuthor || !editingAuthor.name?.trim()) return;

    const slug =
      editingAuthor.slug?.trim() ||
      editingAuthor.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const authorId = editingAuthor.id || `author-${Date.now()}`;
    const authorBooksCount = books.filter(
      (b) => b.authorId === authorId || (b.authorName && b.authorName.toLowerCase().includes(editingAuthor.name!.toLowerCase()))
    ).length;

    const payload: Author = {
      id: authorId,
      name: editingAuthor.name.trim(),
      slug,
      title: editingAuthor.title?.trim() || 'Author & Educator',
      avatar: editingAuthor.avatar?.trim() || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      coverImage: editingAuthor.coverImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      bio: editingAuthor.bio?.trim() || '',
      biography: editingAuthor.biography?.trim() || editingAuthor.bio?.trim() || '',
      qualifications: editingAuthor.qualifications || [],
      expertise: editingAuthor.expertise || [],
      socialLinks: editingAuthor.socialLinks || {},
      seoTitle: editingAuthor.seoTitle || `${editingAuthor.name} | Author Profile | Sahayak Associates`,
      metaDescription: editingAuthor.metaDescription || `Read biography, published books and research articles by ${editingAuthor.name}.`,
      publishedBookCount: Math.max(authorBooksCount, editingAuthor.publishedBookCount || 0),
      articlesCount: editingAuthor.articlesCount || 0,
    };

    if (editingAuthor.id) {
      updateAuthor(payload);
      showToast(`Author profile for "${payload.name}" updated successfully.`);
    } else {
      addAuthor(payload);
      showToast(`New author "${payload.name}" created and added to roster.`);
    }

    setIsAuthorModalOpen(false);
    setEditingAuthor(null);
  };

  // Calculate Overview KPIs
  const totalRevenue = useMemo(() => orders.reduce((acc, o) => acc + o.total, 0), [orders]);
  const totalBooks = books.length;
  const totalOrders = orders.length;
  const lowStockBooks = useMemo(() => books.filter((b) => b.stockCount < 20), [books]);
  const pendingOrders = useMemo(() => orders.filter((o) => o.orderStatus === 'Processing' || o.orderStatus === 'Order Confirmed'), [orders]);
  const pendingReviews = useMemo(() => reviews.filter((r) => r.status === 'Pending' || (!r.approved && r.status !== 'Rejected')), [reviews]);
  const newLeadsCount = useMemo(() => (leads || []).filter((l) => l.status === 'new').length, [leads]);

  // Handle Admin Login
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError('Please provide a valid administrative email.');
      return;
    }
    const res = adminLogin(loginEmail.trim(), loginRole);
    if (!res.success) {
      setLoginError(res.message || 'Authentication failed');
    } else {
      setLoginError('');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    setSettingsSavedMsg(true);
    setTimeout(() => setSettingsSavedMsg(false), 3000);
  };

  const handleOpenNewBook = () => {
    const defaultAuthor = authors[0] || {
      id: 'author-sandeep-sahni',
      name: 'Sandeep Sahni',
      title: 'Financial Educator & Author',
    };
    setEditingBook({
      title: '',
      subtitle: '',
      slug: '',
      authorId: defaultAuthor.id,
      authorName: defaultAuthor.name,
      authorRole: defaultAuthor.title,
      coAuthor: '',
      category: categories[0]?.name || 'Financial Literacy & Investment',
      categorySlug: categories[0]?.slug || 'financial-literacy-investment',
      price: 549,
      originalPrice: 799,
      discountPercent: 31,
      formats: ['Paperback', 'Hardcover', 'eBook'],
      inStock: true,
      stockCount: 50,
      isbn: '978-81-98214-00-1',
      publisher: 'Sahayak Associates Imprint',
      publicationYear: 2026,
      publicationDate: 'March 2026',
      pages: 380,
      language: 'English',
      dimensions: '6 x 9 inches',
      weight: '520 grams',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
      description: 'An authoritative book designed for modern Indian practitioners.',
      whatYouWillLearn: [
        'Fundamental statutory doctrines and constitutional safeguards',
        'Strategic governance mechanisms for high-stake decision making',
        'Practical implementation templates and executive checklists',
      ],
      isFeatured: true,
      isBestseller: false,
      isNewRelease: true,
      rating: 5.0,
      reviewCount: 1,
      purchaseLinks: {
        amazon: 'https://amazon.in',
        flipkart: 'https://flipkart.com',
        whatsapp: '+919876543210',
      },
      tableOfContents: [
        { chapter: 1, title: 'Foundational Doctrines & Regulatory Architecture', pages: '1-45' },
        { chapter: 2, title: 'Institutional Governance Frameworks', pages: '46-120' },
        { chapter: 3, title: 'Compliance Audits & Strategic Risk Mitigation', pages: '121-250' },
      ],
    });
    setIsBookModalOpen(true);
    setBookModalTab('general');
  };

  const handleOpenEditBook = (b: Book) => {
    setEditingBook({ ...b });
    setIsBookModalOpen(true);
    setBookModalTab('general');
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook || !editingBook.title) return;

    // Auto-calculate discount if MRP & price are provided
    const price = Number(editingBook.price) || 0;
    const mrp = Number(editingBook.originalPrice) || price;
    const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    // Resolve author linking
    const matchedAuthor = authors.find(
      (a) => a.id === editingBook.authorId || a.name.toLowerCase() === (editingBook.authorName || '').toLowerCase()
    );
    const authorId = editingBook.authorId || (matchedAuthor ? matchedAuthor.id : (authors[0]?.id || 'author-sandeep-sahni'));
    const authorName = editingBook.authorName?.trim() || (matchedAuthor ? matchedAuthor.name : (authors[0]?.name || 'Sandeep Sahni'));

    const bookPayload: Partial<Book> = {
      ...editingBook,
      authorId,
      authorName,
      price,
      originalPrice: mrp,
      discountPercent: discount,
      inStock: (Number(editingBook.stockCount) || 0) > 0,
      stockCount: Number(editingBook.stockCount) || 0,
      pages: Number(editingBook.pages) || 300,
      publicationYear: Number(editingBook.publicationYear) || 2026,
    };

    if (editingBook.id) {
      updateBook(bookPayload as Book);
      showToast(`Book "${bookPayload.title}" updated successfully.`);
    } else {
      const generatedSlug = (editingBook.title || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const newBook: Book = {
        ...bookPayload,
        id: `book-${Date.now()}`,
        slug: editingBook.slug || generatedSlug,
        rating: 5.0,
        reviewCount: 1,
        authorId,
        authorName,
        aboutBook: [bookPayload.description || ''],
        whatYouWillLearn: bookPayload.whatYouWillLearn || ['Core doctrine analysis', 'Implementation checklists'],
        tableOfContents: bookPayload.tableOfContents || [{ chapter: 1, title: 'Introduction', pages: '1-50' }],
      } as Book;
      addBook(newBook);
      showToast(`New book "${newBook.title}" published to catalog.`);
    }
    setIsBookModalOpen(false);
    setEditingBook(null);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const c: Coupon = {
      id: `cpn-${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      discountType: 'percentage',
      discountValue: Number(newCouponDiscount),
      minOrder: Number(newCouponMinOrder),
      expiryDate: '2026-12-31',
      usageLimit: 100,
      usedCount: 0,
      isActive: true,
    };
    addCoupon(c);
    setNewCouponCode('');
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl.trim() || !newMediaTitle.trim()) return;
    const folderMap: Record<string, MediaItem['folder']> = {
      books: 'Books',
      authors: 'Authors',
      homepage: 'Homepage',
      logos: 'Logos',
      other: 'Resources',
    };
    addMediaItem({
      name: newMediaTitle.trim(),
      url: newMediaUrl.trim(),
      category: newMediaCategory,
      folder: folderMap[newMediaCategory] || 'Books',
      size: newMediaSize || '340 KB',
      dimensions: newMediaDimensions || '800 x 1200',
    });
    showToast(`Media asset "${newMediaTitle}" uploaded and cataloged.`);
    setNewMediaTitle('');
    setNewMediaUrl('');
    setNewMediaSize('');
    setNewMediaDimensions('');
    setIsMediaModalOpen(false);
  };

  const handleQuickUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsMediaProcessing(true);
    let uploadedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;
      try {
        const processed = await processImageFile(file);
        const folderMap: Record<string, MediaItem['folder']> = {
          books: 'Books',
          authors: 'Authors',
          homepage: 'Homepage',
          logos: 'Logos',
          other: 'Resources',
        };
        const cat = (mediaCategoryFilter !== 'all' ? mediaCategoryFilter : 'books') as any;
        addMediaItem({
          name: file.name.replace(/\.[^/.]+$/, ''),
          url: processed.dataUrl,
          category: cat,
          folder: folderMap[cat] || 'Books',
          size: processed.size,
          dimensions: processed.dimensions,
        });
        uploadedCount++;
      } catch (err) {
        console.error('Failed to upload file:', file.name, err);
      }
    }

    setIsMediaProcessing(false);
    if (uploadedCount > 0) {
      showToast(`Successfully uploaded ${uploadedCount} digital asset${uploadedCount === 1 ? '' : 's'} directly to repository.`);
    }
  };

  const handleCreateStaffUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.email.trim() || !newUserForm.name.trim()) return;
    addUser({
      name: newUserForm.name.trim(),
      email: newUserForm.email.trim(),
      phone: newUserForm.phone.trim() || '+91 98000 00000',
      role: newUserForm.role,
      status: 'active',
      registrationDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      addresses: [],
      wishlist: [],
      orderIds: [],
      savedEbooks: [],
    });
    setNewUserForm({ name: '', email: '', phone: '', role: 'EDITOR' });
    setIsUserModalOpen(false);
  };

  const handleCopyMediaUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedMediaId(item.id);
    setTimeout(() => setCopiedMediaId(null), 2000);
  };

  const handleExportSubscribers = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Email,SubscribedDate,Source']
        .concat((newsletters || []).map((n) => `${n.email},${n.date || (n as any).subscribedAt || ''},${n.source}`))
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sahayak_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportOrders = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['OrderID,Date,CustomerName,Phone,City,TotalAmount,Status,AWB']
        .concat(
          orders.map(
            (o) =>
              `"${o.id}","${o.date}","${o.customer?.fullName || ''}","${o.customer?.phone || ''}","${o.customer?.city || ''}",${o.total},"${o.orderStatus}","${o.trackingNumber || ''}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sahayak_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Books
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchSearch =
        !bookSearch ||
        b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
        b.authorName.toLowerCase().includes(bookSearch.toLowerCase()) ||
        b.isbn.toLowerCase().includes(bookSearch.toLowerCase());

      const matchCategory =
        bookCategoryFilter === 'all' ||
        b.category === bookCategoryFilter ||
        b.categorySlug === bookCategoryFilter;

      const matchStock =
        bookStockFilter === 'all' ||
        (bookStockFilter === 'low' && b.stockCount < 20) ||
        (bookStockFilter === 'out' && b.stockCount === 0) ||
        (bookStockFilter === 'instock' && b.stockCount >= 20);

      const matchGoogle =
        bookGoogleFilter === 'all' ||
        (bookGoogleFilter === 'Excluded' && (b.googleExcluded || b.googleEnabled === false)) ||
        (bookGoogleFilter === 'Approved' && b.googleSyncStatus === 'Approved') ||
        (bookGoogleFilter === 'Pending' && (b.googleSyncStatus === 'Pending' || b.googleSyncStatus === 'Submitted')) ||
        (bookGoogleFilter === 'Disapproved' && b.googleSyncStatus === 'Disapproved') ||
        (bookGoogleFilter === 'Not Submitted' && (!b.googleSyncStatus || b.googleSyncStatus === 'Not Submitted'));

      return matchSearch && matchCategory && matchStock && matchGoogle;
    });
  }, [books, bookSearch, bookCategoryFilter, bookStockFilter, bookGoogleFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        !orderSearch ||
        o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.orderNumber?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer?.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer?.phone.includes(orderSearch);

      const matchStatus = orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Filtered Reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (reviewFilter === 'pending') return r.status === 'Pending' || (!r.approved && r.status !== 'Rejected');
      if (reviewFilter === 'approved') return r.approved || r.status === 'Approved';
      if (reviewFilter === 'rejected') return r.status === 'Rejected';
      return true;
    });
  }, [reviews, reviewFilter]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    const combined = [...(leads || []), ...(enquiries || [])];
    return combined.filter((l) => {
      if (leadFilter === 'all') return true;
      return l.status === leadFilter;
    });
  }, [leads, enquiries, leadFilter]);

  // Filtered Media
  const filteredMedia = useMemo(() => {
    return (mediaItems || []).filter((m) => {
      if (mediaCategoryFilter === 'all') return true;
      const cat = (m.category || (m.folder ? m.folder.toLowerCase() : '')).toLowerCase();
      return cat === mediaCategoryFilter.toLowerCase();
    });
  }, [mediaItems, mediaCategoryFilter]);

  // ----------------------------------------------------
  // UNPROTECTED / LOGIN GATE VIEW
  // ----------------------------------------------------
  if (!hasAdminAccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0B192C] text-[#C5A059] flex items-center justify-center shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#0B192C]">
              Admin Security Gateway
            </h1>
            <p className="text-xs text-stone-500">
              Restricted portal for Sahayak Associates Editorial, Catalog & Logistics Officers.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Administrative Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@sahayakassociates.org"
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Select Access Role Profile</label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value as UserRole)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B192C]"
              >
                <option value="SUPER_ADMIN">Master Super Admin (Full Control)</option>
                <option value="ADMIN">Catalog & Order Manager (Admin)</option>
                <option value="EDITOR">Content & Review Editor</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0B192C] text-[#C5A059] text-xs font-bold rounded-xl hover:bg-[#152A4A] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Enter Admin Suite</span>
            </button>
          </form>

          {/* Quick Demo Role Logins */}
          <div className="border-t border-stone-200 pt-4 space-y-2">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider text-center">
              Quick 1-Click Access for Evaluation
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  adminLogin('admin@sahayakassociates.org', 'SUPER_ADMIN');
                }}
                className="p-2 rounded-lg bg-stone-100 hover:bg-[#0B192C] hover:text-[#C5A059] text-stone-700 text-[11px] font-bold text-center transition-colors"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  adminLogin('manager@sahayakassociates.org', 'ADMIN');
                }}
                className="p-2 rounded-lg bg-stone-100 hover:bg-[#0B192C] hover:text-[#C5A059] text-stone-700 text-[11px] font-bold text-center transition-colors"
              >
                Store Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  adminLogin('editor@sahayakassociates.org', 'EDITOR');
                }}
                className="p-2 rounded-lg bg-stone-100 hover:bg-[#0B192C] hover:text-[#C5A059] text-stone-700 text-[11px] font-bold text-center transition-colors"
              >
                Editor
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PROTECTED ADMIN DASHBOARD SUITE
  // ----------------------------------------------------
  return (
    <div id="admin-dashboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Master Top Control Banner */}
      <div className="bg-[#0B192C] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#C5A059]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Master Enterprise Operations & Editorial Suite</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Sahayak Books Administration
          </h1>
          <p className="text-xs text-stone-300 mt-1 max-w-2xl">
            Live catalog publishing, inventory logistics, consignments tracking, review moderation, media repository & branding controls.
          </p>
        </div>

        {/* User Badge & Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/15">
            <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#0B192C] font-bold text-xs flex items-center justify-center">
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">{adminUser?.name || 'Administrator'}</div>
              <span className="text-[10px] font-mono text-[#C5A059] font-semibold uppercase">{adminUser?.role || 'SUPER_ADMIN'}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-bold rounded-xl border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Open Storefront in Live Mode"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </button>

          <button
            onClick={() => {
              adminLogout();
            }}
            className="px-3.5 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold rounded-xl border border-rose-500/30 transition-colors flex items-center gap-1 cursor-pointer"
            title="Sign out of Admin Session"
          >
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Admin Horizontal Nav Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl border border-stone-200 shadow-sm scrollbar-none">
        {[
          { id: 'overview', label: 'Executive KPIs', icon: LayoutDashboard },
          { id: 'books', label: 'Book Catalog CMS', icon: BookPlus, badge: books.length },
          {
            id: 'google-shopping',
            label: 'Google Shopping',
            icon: ShoppingBag,
            badge: books.filter((b) => b.googleEnabled !== false && !b.googleExcluded).length,
          },
          { id: 'authors', label: 'Authors Roster', icon: Users, badge: authors.length },
          { id: 'orders', label: 'Order Consignments', icon: ShoppingBag, badge: orders.length },
          { id: 'leads', label: 'Leads & Inquiries', icon: Mail, badge: newLeadsCount > 0 ? newLeadsCount : undefined },
          { id: 'reviews', label: 'Review Moderation', icon: Star, badge: pendingReviews.length > 0 ? pendingReviews.length : undefined },
          { id: 'media', label: 'Media Assets Library', icon: ImageIcon, badge: mediaItems?.length },
          { id: 'storage', label: 'Cloudflare R2 Storage', icon: Cloud },
          { id: 'content', label: 'Copy & Content CMS', icon: Type },
          { id: 'brand', label: 'Brand & Visual Theme', icon: Sliders },
          { id: 'sections', label: 'Homepage Layout', icon: Layers },
          { id: 'coupons', label: 'Coupons & Promos', icon: Tag, badge: coupons.length },
          { id: 'users', label: 'Staff & Roles (RBAC)', icon: Users, badge: allUsers?.length },
          { id: 'analytics', label: 'Telemetry & Clicks', icon: BarChart3 },
          { id: 'audit', label: 'Audit Activity Logs', icon: History },
        ].map((tab) => {
          const IconC = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                const targetPath = tab.id === 'overview' ? '/admin' : `/admin/${tab.id}`;
                navigate(targetPath);
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0B192C] text-[#FAF7F2] shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <IconC className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-stone-500'}`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#C5A059] text-[#0B192C] font-bold'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Tab Panels Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm min-h-[550px]">
        {/* ==================================================== */}
        {/* 1. OVERVIEW & EXECUTIVE KPIS */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                  Real-time Publishing & Commercial Metrics
                </h2>
                <p className="text-xs text-stone-500">
                  Aggregated telemetry across direct reader orders, print runs, and institutional requests.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportOrders}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>Export Sales Data (CSV)</span>
                </button>
                <button
                  onClick={handleOpenNewBook}
                  className="px-4 py-2 bg-[#0B192C] text-[#C5A059] text-xs font-bold rounded-xl hover:bg-[#152A4A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Book</span>
                </button>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Gross Settled Sales</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-mono text-2xl font-bold text-[#0B192C]">₹{totalRevenue.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  <span>+18.4% vs previous quarter</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Direct Orders Processed</span>
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="font-mono text-2xl font-bold text-[#0B192C]">{totalOrders}</div>
                <div className="text-[11px] text-stone-500">
                  {pendingOrders.length} pending fulfillment
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Cataloged Books</span>
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <div className="font-mono text-2xl font-bold text-[#0B192C]">{totalBooks}</div>
                <div className="text-[11px] text-stone-500">Across {categories.length} disciplines</div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Subscribed Readers</span>
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="font-mono text-2xl font-bold text-[#0B192C]">{newsletters.length + 180}</div>
                <div className="text-[11px] text-emerald-700 font-semibold">Active Reader List</div>
              </div>
            </div>

            {/* Low stock printing warning */}
            {lowStockBooks.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Low Stock Printing Warning ({lowStockBooks.length} titles below threshold)
                  </h4>
                  <p className="text-xs text-amber-800">
                    The following titles require press binder re-order to maintain seamless order dispatch:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {lowStockBooks.map((b) => (
                      <span
                        key={b.id}
                        className="px-2.5 py-1 rounded-lg bg-amber-200/80 text-amber-950 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <span>{b.title}</span>
                        <strong className="font-mono text-rose-700">({b.stockCount} copies)</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Live Visual Sales & Fulfillment Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-bold text-[#0B192C]">
                    30-Day Commercial Order Trajectory
                  </h3>
                  <span className="text-[11px] font-mono text-stone-500">Telemetry Live</span>
                </div>
                <div className="h-44 w-full flex items-end gap-2 pt-4 border-b border-stone-200 pb-2">
                  {[35, 48, 62, 40, 75, 90, 82, 110, 95, 125, 140, 160].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <div
                        className="w-full bg-[#0B192C] group-hover:bg-[#C5A059] rounded-t transition-all duration-300"
                        style={{ height: `${(val / 160) * 100}%` }}
                      />
                      <span className="text-[9px] font-mono text-stone-400">W{idx + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Average Order Value: <strong className="text-[#0B192C]">₹940</strong></span>
                  <span>Conversion Rate: <strong className="text-emerald-700">4.82%</strong></span>
                  <span>Direct UPI Share: <strong className="text-[#0B192C]">68%</strong></span>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="p-5 bg-[#0B192C] text-white rounded-2xl border border-[#C5A059]/30 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                    Operations Command
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mt-1">
                    Direct Administrative Tasks
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Quick shortcuts to frequently used catalog and logistics pipelines.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/admin/books')}
                    className="w-full p-2.5 bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors"
                  >
                    <span>Manage Book Pricing & Stock</span>
                    <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                  </button>
                  <button
                    onClick={() => navigate('/admin/orders')}
                    className="w-full p-2.5 bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors"
                  >
                    <span>Process {pendingOrders.length} Pending Shipments</span>
                    <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                  </button>
                  <button
                    onClick={() => navigate('/admin/leads')}
                    className="w-full p-2.5 bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors"
                  >
                    <span>Institutional & Bulk Desk ({leads?.length || 0})</span>
                    <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Orders Stream */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#0B192C]">
                  Recent Direct Patron Consignments
                </h3>
                <button
                  onClick={() => navigate('/admin/orders')}
                  className="text-xs font-bold text-[#C5A059] hover:underline"
                >
                  View All {orders.length} Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-600 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Order Ref</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Titles</th>
                      <th className="p-3">Settled</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-stone-900">{o.id}</td>
                        <td className="p-3 font-medium">{o.customer?.fullName || (o as any).shippingAddress?.fullName || 'Reader'}</td>
                        <td className="p-3">{o.items?.length || 1} item(s)</td>
                        <td className="p-3 font-mono font-bold text-emerald-800">₹{o.total}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              o.orderStatus === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : o.orderStatus === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {o.orderStatus}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrderForInvoice(o);
                            }}
                            className="text-[#C5A059] font-bold hover:underline"
                          >
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 2. BOOK CATALOG CMS */}
        {/* ==================================================== */}
        {activeTab === 'books' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                  Book Catalog CMS ({books.length} Titles)
                </h2>
                <p className="text-xs text-stone-500">
                  Full CRUD capability for scholarly books, multi-format pricing, print inventory & purchase links.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('google-shopping')}
                  className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm border border-stone-200 cursor-pointer"
                  title="Open Google Merchant Center settings & catalog diagnostics"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  <span>Google Shopping</span>
                </button>
                <button
                  onClick={handleOpenNewBook}
                  className="px-4 py-2.5 bg-[#0B192C] text-[#C5A059] rounded-xl text-xs font-bold hover:bg-[#152A4A] transition-colors flex items-center gap-1.5 shadow-sm self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Book</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
              <div className="flex-1 min-w-[220px] relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, or ISBN..."
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl"
                />
              </div>

              <select
                value={bookCategoryFilter}
                onChange={(e) => setBookCategoryFilter(e.target.value)}
                className="p-2 bg-white border border-stone-300 rounded-xl font-semibold"
              >
                <option value="all">All Disciplines</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={bookStockFilter}
                onChange={(e) => setBookStockFilter(e.target.value)}
                className="p-2 bg-white border border-stone-300 rounded-xl font-semibold"
              >
                <option value="all">All Inventory States</option>
                <option value="instock">In Stock (&ge; 20)</option>
                <option value="low">Low Stock (&lt; 20)</option>
                <option value="out">Out of Stock (0)</option>
              </select>

              <select
                value={bookGoogleFilter}
                onChange={(e) => setBookGoogleFilter(e.target.value)}
                className="p-2 bg-white border border-stone-300 rounded-xl font-semibold"
              >
                <option value="all">All Google States</option>
                <option value="Approved">Google Approved</option>
                <option value="Pending">Google Pending</option>
                <option value="Disapproved">Google Disapproved</option>
                <option value="Not Submitted">Google Not Submitted</option>
                <option value="Excluded">Google Excluded</option>
              </select>
            </div>

            {/* Books Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Book Cover & Dossier</th>
                    <th className="p-3">Author & Discipline</th>
                    <th className="p-3">Pricing & MRP</th>
                    <th className="p-3">Stock Units</th>
                    <th className="p-3">Badges</th>
                    <th className="p-3">Google Shopping</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredBooks.map((b) => (
                    <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={b.coverImage}
                          alt={b.title}
                          className="w-11 h-16 object-cover rounded-md shadow-sm border shrink-0"
                        />
                        <div>
                          <div className="font-serif font-bold text-[#0B192C] text-sm line-clamp-1">
                            {b.title}
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono">ISBN: {b.isbn}</div>
                          <div className="text-[10px] text-stone-500">{b.pages} pages • {b.language}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-stone-800">{b.authorName}</div>
                        <div className="text-[10px] text-stone-500">{b.category}</div>
                      </td>
                      <td className="p-3 font-mono">
                        <div className="font-bold text-[#0B192C] text-sm">₹{b.price}</div>
                        {b.originalPrice && b.originalPrice > b.price && (
                          <div className="text-[10px] text-stone-400 line-through">
                            MRP ₹{b.originalPrice} ({b.discountPercent}% OFF)
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-mono font-bold text-xs ${
                            b.stockCount < 20 ? 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded' : 'text-emerald-700'
                          }`}
                        >
                          {b.stockCount} copies
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {b.isFeatured && (
                            <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[9px] font-bold">
                              Featured
                            </span>
                          )}
                          {b.isBestseller && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                              Bestseller
                            </span>
                          )}
                          {b.isNewRelease && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                              New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        {b.googleExcluded || b.googleEnabled === false ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-200">
                            Excluded
                          </span>
                        ) : b.googleSyncStatus === 'Approved' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Approved
                          </span>
                        ) : b.googleSyncStatus === 'Pending' || b.googleSyncStatus === 'Submitted' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            Pending
                          </span>
                        ) : b.googleSyncStatus === 'Disapproved' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            Disapproved
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            Not Submitted
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={async () => {
                              setSyncingGoogleBookId(b.id);
                              try {
                                const res = await syncBookToGoogleMerchant(b.id);
                                showToast(res?.message || 'Book synchronized to Google Merchant Center');
                              } catch (e: any) {
                                showToast(`Sync failed: ${e.message}`);
                              } finally {
                                setSyncingGoogleBookId(null);
                              }
                            }}
                            disabled={syncingGoogleBookId === b.id}
                            className="p-1.5 rounded-lg bg-[#0B192C] text-[#C5A059] hover:bg-[#152A4A] transition-colors cursor-pointer disabled:opacity-50"
                            title="Sync this title to Google Shopping"
                          >
                            <ShoppingBag className={`w-3.5 h-3.5 ${syncingGoogleBookId === b.id ? 'animate-bounce' : ''}`} />
                          </button>
                          <button
                            onClick={() => toggleFeatureBook(b.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              b.isFeatured ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-stone-100 text-stone-600 border-stone-200'
                            }`}
                            title="Toggle Homepage Feature"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => duplicateBook(b.id)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200"
                            title="Duplicate Book Draft"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEditBook(b)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 cursor-pointer"
                            title="Edit Book Details"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteTarget({
                                type: 'book',
                                id: b.id,
                                title: b.title,
                                extraInfo: `${b.authorName} • ₹${b.price} • ${b.stockCount} copies in stock`,
                              })
                            }
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer transition-colors"
                            title="Delete / Archive Book"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 2A. GOOGLE SHOPPING & MERCHANT CENTER */}
        {/* ==================================================== */}
        {activeTab === 'google-shopping' && <AdminGoogleShoppingSection />}

        {/* ==================================================== */}
        {/* 2B. AUTHORS ROSTER MANAGEMENT */}
        {/* ==================================================== */}
        {activeTab === 'authors' && <AdminAuthorsSection />}

        {/* ==================================================== */}
        {/* 3. ORDER CONSIGNMENTS */}
        {/* ==================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                  Order Fulfillment & Consignments ({orders.length})
                </h2>
                <p className="text-xs text-stone-500">
                  Update order status pipeline, assign courier AWB tracking numbers, and view customer invoices.
                </p>
              </div>
              <button
                onClick={handleExportOrders}
                className="px-4 py-2 bg-[#0B192C] text-[#C5A059] rounded-xl text-xs font-bold hover:bg-[#152A4A] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Consignment Sheet</span>
              </button>
            </div>

            {/* Order Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
              {[
                { id: 'all', label: 'All Orders' },
                { id: 'Order Confirmed', label: 'Confirmed' },
                { id: 'Processing', label: 'Processing' },
                { id: 'Packed', label: 'Packed' },
                { id: 'Shipped', label: 'Shipped' },
                { id: 'Out for Delivery', label: 'Out for Delivery' },
                { id: 'Delivered', label: 'Delivered' },
                { id: 'Cancelled', label: 'Cancelled' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setOrderStatusFilter(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    orderStatusFilter === st.id
                      ? 'bg-[#0B192C] text-[#FAF7F2]'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Orders Feed */}
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const cust = order.customer || (order as any).shippingAddress || {};
                return (
                  <div key={order.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-stone-900 text-sm">{order.id}</span>
                        <span className="text-stone-500">({order.date || order.createdAt})</span>
                        <span className="px-2 py-0.5 bg-stone-200 rounded font-mono font-semibold text-stone-800">
                          {order.paymentMethod || 'Online UPI'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-stone-600 font-medium">Update Status:</span>
                        <select
                          value={order.orderStatus || order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value as OrderStatus,
                              order.trackingNumber,
                              order.courierPartner
                            )
                          }
                          className="p-1.5 rounded-lg bg-white border border-stone-300 font-semibold"
                        >
                          <option value="Order Confirmed">Order Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => setSelectedOrderForInvoice(order)}
                          className="px-3 py-1.5 bg-[#0B192C] text-[#C5A059] font-bold rounded-lg hover:bg-[#152A4A] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Invoice</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <span className="text-stone-500 block font-bold uppercase text-[10px]">
                          Consignee Destination
                        </span>
                        <p className="font-semibold text-stone-900">{cust.fullName || 'Reader'}</p>
                        <p className="text-stone-600">{cust.phone || 'Phone not provided'}</p>
                        <p className="text-stone-500">
                          {cust.city || 'Delhi'}, {cust.state || 'DL'} - {cust.pinCode || cust.postalCode || '110001'}
                        </p>
                      </div>

                      <div>
                        <span className="text-stone-500 block font-bold uppercase text-[10px]">
                          Manifest Line Items ({order.items?.length || 1})
                        </span>
                        {order.items?.map((it, i) => (
                          <div key={i} className="text-stone-700 font-medium">
                            {it.title} ({it.format || 'Paperback'}) x {it.quantity}
                          </div>
                        ))}
                      </div>

                      <div>
                        <span className="text-stone-500 block font-bold uppercase text-[10px]">
                          Logistics Partner & AWB
                        </span>
                        <p className="font-mono font-bold text-[#0B192C]">
                          {order.trackingNumber || 'AWB-PENDING'}
                        </p>
                        <p className="text-stone-600">{order.courierPartner || 'BlueDart Express'}</p>
                        <p className="font-mono font-bold text-emerald-800 text-sm mt-1">
                          Gross Settled: ₹{order.total}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 4. LEADS & INSTITUTIONAL INQUIRIES */}
        {/* ==================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                  Leads & Institutional Inquiries ({filteredLeads.length})
                </h2>
                <p className="text-xs text-stone-500">
                  Inbound library orders, corporate training adoptions, and author consultation desk requests.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                {['all', 'new', 'in_review', 'contacted', 'qualified', 'closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer ${
                      leadFilter === st
                        ? 'bg-[#0B192C] text-[#FAF7F2]'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredLeads.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border space-y-3 text-xs transition-all ${
                    item.status === 'new'
                      ? 'bg-white border-[#C5A059] shadow-sm'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                    <div>
                      <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                      <span className="text-stone-500 ml-2 font-mono">({item.email} • {item.phone})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-stone-400 font-mono">{item.date}</span>
                      <select
                        value={item.status || 'new'}
                        onChange={(e) => updateLeadStatus(item.id, e.target.value as any)}
                        className="p-1 bg-white border border-stone-300 rounded text-[11px] font-semibold"
                      >
                        <option value="new">New Lead</option>
                        <option value="in_review">In Review</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed / Won</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-[#0B192C]">
                      Subject: {item.subject || 'Institutional Book Inquiry'}
                    </h4>
                    <p className="text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200 mt-1">
                      {item.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-stone-500">
                      Channel: <strong>{item.category || 'Direct Storefront Desk'}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setDeleteTarget({
                            type: 'lead',
                            id: item.id,
                            title: item.name,
                            extraInfo: `${item.email} • ${item.phone} • "${item.subject || 'Inquiry'}"`,
                          })
                        }
                        className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-semibold flex items-center gap-1 border border-rose-200 cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                      <a
                        href={`https://wa.me/${(item.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                          item.name
                        )},%20thank%20you%20for%20contacting%20Sahayak%20Books%20Advisory%20Desk.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Direct Reply</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 5. REVIEW MODERATION */}
        {/* ==================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                  Reader Review Moderation Desk ({reviews.length})
                </h2>
                <p className="text-xs text-stone-500">
                  Moderate reader submissions, verify testimonials, and select featured homepage accolades.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[
                  { id: 'all', label: 'All Reviews' },
                  { id: 'pending', label: 'Pending Approval' },
                  { id: 'approved', label: 'Approved' },
                  { id: 'rejected', label: 'Rejected' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setReviewFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      reviewFilter === f.id
                        ? 'bg-[#0B192C] text-[#FAF7F2]'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredReviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900 text-sm">{rev.userName}</span>
                      <span className="text-stone-400 ml-2">reviewed "{rev.bookTitle}"</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-serif font-bold text-[#0B192C]">“{rev.title}”</h4>
                  <p className="text-stone-600 italic">"{rev.comment}"</p>

                  <div className="flex flex-wrap items-center justify-between pt-3 border-t border-stone-200 gap-2">
                    <span className="text-[11px] font-mono text-stone-400">{rev.date}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateReviewStatus(rev.id, !rev.featured)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                          rev.featured ? 'bg-[#C5A059] text-[#0B192C]' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                      >
                        {rev.featured ? '★ Featured on Homepage' : 'Feature on Homepage'}
                      </button>

                      <button
                        onClick={() => setReviewModeration(rev.id, 'Approved')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                          rev.approved || rev.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-700 hover:bg-emerald-100'
                        }`}
                      >
                        ✓ Approved
                      </button>

                      <button
                        onClick={() => setReviewModeration(rev.id, 'Rejected')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                          rev.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-stone-200 text-stone-700 hover:bg-rose-100'
                        }`}
                      >
                        ✕ Reject
                      </button>

                      <button
                        onClick={() =>
                          setDeleteTarget({
                            type: 'review',
                            id: rev.id,
                            title: `Review by ${rev.userName}`,
                            extraInfo: `Book: "${rev.bookTitle}" • Rating: ${rev.rating}★`,
                          })
                        }
                        className="p-1 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 6. MEDIA ASSETS LIBRARY (CLOUDFLARE R2) */}
        {/* ==================================================== */}
        {activeTab === 'media' && <AdminMediaLibrary />}

        {/* ==================================================== */}
        {/* 6B. CLOUDFLARE R2 STORAGE SETTINGS & DIAGNOSTICS */}
        {/* ==================================================== */}
        {activeTab === 'storage' && <R2StorageSettingsCard />}

        {/* ==================================================== */}
        {/* 7. COPY & CONTENT CMS */}
        {/* ==================================================== */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                Copy & Text Content CMS
              </h2>
              <p className="text-xs text-stone-500">
                Modify website headings, brand names, subheadings, and contact details without editing code.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={formSettings.brandName}
                  onChange={(e) => setFormSettings({ ...formSettings, brandName: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Parent Company</label>
                <input
                  type="text"
                  value={formSettings.parentCompany}
                  onChange={(e) => setFormSettings({ ...formSettings, parentCompany: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-stone-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formSettings.tagline}
                  onChange={(e) => setFormSettings({ ...formSettings, tagline: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-stone-700 mb-1">Hero Main Heading</label>
                <input
                  type="text"
                  value={formSettings.heroHeading}
                  onChange={(e) => setFormSettings({ ...formSettings, heroHeading: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-serif text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-stone-700 mb-1">Hero Subheading</label>
                <textarea
                  rows={2}
                  value={formSettings.heroSubheading}
                  onChange={(e) => setFormSettings({ ...formSettings, heroSubheading: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Hero Primary Button</label>
                <input
                  type="text"
                  value={formSettings.heroPrimaryBtnText}
                  onChange={(e) => setFormSettings({ ...formSettings, heroPrimaryBtnText: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Hero Secondary Button</label>
                <input
                  type="text"
                  value={formSettings.heroSecondaryBtnText}
                  onChange={(e) => setFormSettings({ ...formSettings, heroSecondaryBtnText: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">WhatsApp Hotline</label>
                <input
                  type="text"
                  value={formSettings.whatsappNumber}
                  onChange={(e) => setFormSettings({ ...formSettings, whatsappNumber: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Support Email</label>
                <input
                  type="email"
                  value={formSettings.contactEmail}
                  onChange={(e) => setFormSettings({ ...formSettings, contactEmail: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-stone-700 mb-1">Headquarters Office Address</label>
                <input
                  type="text"
                  value={formSettings.officeAddress}
                  onChange={(e) => setFormSettings({ ...formSettings, officeAddress: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#0B192C] text-[#C5A059] text-xs font-bold rounded-xl hover:bg-[#152A4A] transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Content Changes Instantly</span>
            </button>
            {settingsSavedMsg && (
              <p className="text-xs text-emerald-700 font-semibold">
                ✓ Content updates successfully applied live!
              </p>
            )}
          </form>
        )}

        {/* ==================================================== */}
        {/* 8. BRAND & VISUAL THEME */}
        {/* ==================================================== */}
        {activeTab === 'brand' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                Brand Identity & Visual Theme Controls
              </h2>
              <p className="text-xs text-stone-500">
                Manage logo assets, primary colors, radius styling, and shipping fee thresholds.
              </p>
            </div>

            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUploadField
                  label="Primary Brand Logo / Emblem Asset"
                  value={formSettings.logoUrl || ''}
                  onChange={(url) => setFormSettings({ ...formSettings, logoUrl: url })}
                  helperText="Primary insignia shown in top navigation header, generated official invoices, and packaging."
                  categoryFolder="logos"
                  aspectRatioLabel="Transparent PNG / SVG (800x200 or 500x500)"
                />

                <ImageUploadField
                  label="Dark Mode / Gold Contrast Insignia"
                  value={formSettings.darkLogo || formSettings.logoUrl || ''}
                  onChange={(url) => setFormSettings({ ...formSettings, darkLogo: url })}
                  helperText="High-contrast gold/light insignia displayed against midnight navy backgrounds."
                  categoryFolder="logos"
                  aspectRatioLabel="Transparent PNG / SVG"
                />

                <ImageUploadField
                  label="Footer Brand Emblem"
                  value={formSettings.footerLogo || formSettings.logoUrl || ''}
                  onChange={(url) => setFormSettings({ ...formSettings, footerLogo: url })}
                  helperText="Monogram emblem displayed in the site footer alongside legal copyright dispatches."
                  categoryFolder="logos"
                  aspectRatioLabel="Square PNG / SVG"
                />

                <ImageUploadField
                  label="Browser Favicon Icon"
                  value={formSettings.favicon || ''}
                  onChange={(url) => setFormSettings({ ...formSettings, favicon: url })}
                  helperText="Browser tab icon displayed in bookmark bars and search results (64x64 or 128x128)."
                  categoryFolder="logos"
                  aspectRatioLabel="Square PNG / ICO (64x64)"
                />

                <div className="sm:col-span-2">
                  <ImageUploadField
                    label="Social Media OpenGraph Banner"
                    value={formSettings.socialShareLogo || ''}
                    onChange={(url) => setFormSettings({ ...formSettings, socialShareLogo: url })}
                    helperText="Preview image shown when sharing Sahayak Books links on WhatsApp, LinkedIn, X, and Facebook."
                    categoryFolder="homepage"
                    aspectRatioLabel="1200x630 pixels recommended"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Free Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={formSettings.freeShippingThreshold}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        freeShippingThreshold: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Standard Courier Shipping Charge (₹)
                  </label>
                  <input
                    type="number"
                    value={formSettings.standardShippingCharge}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        standardShippingCharge: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#0B192C] text-[#C5A059] text-xs font-bold rounded-xl hover:bg-[#152A4A] transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Theme & Brand Settings</span>
            </button>
          </form>
        )}

        {/* ==================================================== */}
        {/* 9. HOMEPAGE SECTIONS CONTROLLER */}
        {/* ==================================================== */}
        {activeTab === 'sections' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                Homepage Layout Controller
              </h2>
              <p className="text-xs text-stone-500">
                Toggle which curated sections render on the public storefront homepage.
              </p>
            </div>

            <div className="space-y-3">
              {Object.entries(formSettings.homepageSections).map(([key, isEnabled]) => (
                <label
                  key={key}
                  className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-100 text-xs"
                >
                  <span className="font-bold text-stone-800 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')} Module
                  </span>
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        homepageSections: {
                          ...formSettings.homepageSections,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 rounded accent-[#0B192C]"
                  />
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#0B192C] text-[#C5A059] text-xs font-bold rounded-xl hover:bg-[#152A4A] flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Apply Section Layout</span>
            </button>
          </form>
        )}

        {/* ==================================================== */}
        {/* 10. COUPONS & DISCOUNTS */}
        {/* ==================================================== */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
              Discount Coupons & Promotional Rules ({coupons.length})
            </h2>

            {/* Create Coupon Form */}
            <form onSubmit={handleCreateCoupon} className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-wrap items-end gap-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SAHAYAK25"
                  className="p-2.5 bg-white border border-stone-300 rounded-lg uppercase font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Discount %</label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                  className="p-2.5 bg-white border border-stone-300 rounded-lg font-mono w-24"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Min Order (₹)</label>
                <input
                  type="number"
                  value={newCouponMinOrder}
                  onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                  className="p-2.5 bg-white border border-stone-300 rounded-lg font-mono w-28"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0B192C] text-[#C5A059] font-bold rounded-lg text-xs hover:bg-[#152A4A] cursor-pointer"
              >
                Create Promotional Code
              </button>
            </form>

            {/* Coupons Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Coupon Code</th>
                    <th className="p-3">Benefit</th>
                    <th className="p-3">Min Order</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {coupons.map((c) => (
                    <tr key={c.id} className="hover:bg-stone-50">
                      <td className="p-3 font-mono font-bold text-[#0B192C] text-sm">{c.code}</td>
                      <td className="p-3 font-mono font-bold text-emerald-700">
                        {c.discountValue}{c.discountType === 'percentage' ? '%' : '₹'} OFF
                      </td>
                      <td className="p-3 font-mono">₹{c.minOrder}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleCoupon(c.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                            c.isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {c.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              type: 'coupon',
                              id: c.id,
                              title: c.code,
                              extraInfo: `${c.discountValue}${c.discountType === 'percentage' ? '%' : '₹'} discount • Min order ₹${c.minOrder}`,
                            })
                          }
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 11. STAFF & ROLE-BASED ACCESS (RBAC) */}
        {/* ==================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                  Staff Accounts & Access Control (RBAC)
                </h2>
                <p className="text-xs text-stone-500">
                  Assign administrative privileges (SUPER_ADMIN, ADMIN, EDITOR) and manage access states.
                </p>
              </div>
              <button
                onClick={() => setIsUserModalOpen(true)}
                className="px-4 py-2 bg-[#0B192C] text-[#C5A059] rounded-xl text-xs font-bold hover:bg-[#152A4A] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Staff Member</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">User Profile</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Role Privilege</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {(allUsers || []).map((u) => (
                    <tr key={u.id} className="hover:bg-stone-50">
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{u.name}</div>
                        <div className="text-[10px] text-stone-400 font-mono">ID: {u.id}</div>
                      </td>
                      <td className="p-3 font-mono">
                        <div>{u.email}</div>
                        <div className="text-stone-400">{u.phone}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                            u.role === 'SUPER_ADMIN'
                              ? 'bg-purple-100 text-purple-800'
                              : u.role === 'ADMIN'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-stone-200 text-stone-800'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.status !== 'disabled'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {u.status !== 'disabled' ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[11px] text-stone-400">{u.registrationDate || '2026'}</span>
                          <button
                            onClick={() =>
                              setDeleteTarget({
                                type: 'user',
                                id: u.id,
                                title: u.name,
                                extraInfo: `Role: ${u.role} • Email: ${u.email}`,
                              })
                            }
                            className="p-1 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                            title="Delete Staff Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 12. TELEMETRY & BEHAVIORAL ANALYTICS */}
        {/* ==================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                Live Telemetry & Reader Engagement Feed
              </h2>
              <p className="text-xs text-stone-500">
                Real-time interaction stream capturing clicks, catalog queries, and book sample reads.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200">
              <h3 className="font-serif text-sm font-bold text-[#0B192C] mb-3">
                Live Recorded Telemetry Events ({analyticsEvents.length})
              </h3>
              <div className="max-h-96 overflow-y-auto divide-y divide-stone-200 text-xs font-mono">
                {analyticsEvents.slice().reverse().map((ev) => (
                  <div key={ev.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-[#C5A059] font-bold">[{ev.type.toUpperCase()}]</span>{' '}
                      <span className="text-stone-800">{ev.target}</span>
                    </div>
                    <span className="text-stone-400 text-[10px]">
                      {new Date(ev.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 13. AUDIT ACTIVITY LOGS */}
        {/* ==================================================== */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0B192C]">
                  Administrative System Audit Logs
                </h2>
                <p className="text-xs text-stone-500">
                  Immutable chronological audit trail recording changes to pricing, stock levels, orders, and content.
                </p>
              </div>
              <button
                onClick={() =>
                  setDeleteTarget({
                    type: 'reset',
                    id: 'factory-reset',
                    title: 'Reset Store Catalog to Clean Factory Defaults',
                    extraInfo: 'Restores the 4 official Sahayak Association books, demo orders, and reviews while clearing cached data.',
                  })
                }
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Store Data to Defaults</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Officer</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Resource Target</th>
                    <th className="p-3">Audit Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono">
                  {(auditLogs || []).slice().reverse().map((log) => (
                    <tr key={log.id} className="hover:bg-stone-50">
                      <td className="p-3 text-stone-400 text-[10px]">{log.timestamp}</td>
                      <td className="p-3 font-sans font-bold text-stone-800">{log.userName}</td>
                      <td className="p-3">
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-stone-700">{log.resource}</td>
                      <td className="p-3 text-stone-600 font-sans">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* BOOK EDIT / CREATE FULL MODAL */}
      {/* ==================================================== */}
      {isBookModalOpen && editingBook && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsBookModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 border border-stone-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0B192C]">
                  {editingBook.id ? 'Edit Book Dossier' : 'Add New Book to Catalog'}
                </h3>
                <p className="text-xs text-stone-500">
                  Provide complete bibliographic, pricing and Google Shopping metadata.
                </p>
              </div>
              <button
                onClick={() => setIsBookModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div className="flex border-b border-stone-200 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setBookModalTab('general')}
                className={`pb-2.5 font-bold border-b-2 transition-colors cursor-pointer ${
                  bookModalTab === 'general'
                    ? 'border-[#0B192C] text-[#0B192C]'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                Bibliographic &amp; Pricing Details
              </button>
              <button
                type="button"
                onClick={() => setBookModalTab('google')}
                className={`pb-2.5 font-bold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  bookModalTab === 'google'
                    ? 'border-[#C5A059] text-[#0B192C]'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Google Shopping &amp; Merchant API</span>
                {editingBook.googleSyncStatus && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-stone-100 font-mono text-stone-600">
                    {editingBook.googleSyncStatus}
                  </span>
                )}
              </button>
            </div>

            <form onSubmit={handleSaveBook} className="space-y-4 text-xs">
              {bookModalTab === 'general' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-stone-700 mb-1">Book Title *</label>
                  <input
                    type="text"
                    required
                    value={editingBook.title || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl font-serif text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-stone-700 mb-1">Subtitle / Sub-header</label>
                  <input
                    type="text"
                    value={editingBook.subtitle || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, subtitle: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Author / Faculty Member *</label>
                  <select
                    value={editingBook.authorId || authors.find(a => a.name.toLowerCase() === (editingBook.authorName || '').toLowerCase())?.id || authors[0]?.id || ''}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedAuthor = authors.find(a => a.id === selectedId);
                      setEditingBook({
                        ...editingBook,
                        authorId: selectedId,
                        authorName: selectedAuthor ? selectedAuthor.name : editingBook.authorName,
                      });
                    }}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl font-semibold text-[#0B192C]"
                  >
                    <option value="">-- Select Author ▼ --</option>
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.title})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Discipline Category *</label>
                  <select
                    value={editingBook.category || categories[0]?.name}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.name === e.target.value);
                      setEditingBook({
                        ...editingBook,
                        category: e.target.value,
                        categorySlug: cat ? cat.slug : 'general',
                      });
                    }}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingBook.price || 0}
                    onChange={(e) => setEditingBook({ ...editingBook, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl font-mono font-bold text-[#0B192C]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    min={1}
                    value={editingBook.originalPrice || editingBook.price || 0}
                    onChange={(e) => setEditingBook({ ...editingBook, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Stock Print Count *</label>
                  <input
                    type="number"
                    min={0}
                    value={editingBook.stockCount || 0}
                    onChange={(e) => setEditingBook({ ...editingBook, stockCount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">ISBN-13 Number</label>
                  <input
                    type="text"
                    value={editingBook.isbn || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, isbn: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Page Count</label>
                  <input
                    type="number"
                    value={editingBook.pages || 350}
                    onChange={(e) => setEditingBook({ ...editingBook, pages: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Language</label>
                  <input
                    type="text"
                    value={editingBook.language || 'English'}
                    onChange={(e) => setEditingBook({ ...editingBook, language: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Seller</label>
                  <input
                    type="text"
                    value={editingBook.seller || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, seller: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Fulfilled By</label>
                  <input
                    type="text"
                    value={editingBook.fulfilledBy || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, fulfilledBy: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Delivery Info</label>
                  <input
                    type="text"
                    value={editingBook.delivery || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, delivery: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Replacement Policy</label>
                  <input
                    type="text"
                    value={editingBook.replacement || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, replacement: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Payment & Security</label>
                  <input
                    type="text"
                    value={editingBook.payment || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, payment: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-stone-700 mb-1">Category Breadcrumb Path</label>
                  <input
                    type="text"
                    value={editingBook.categoryBreadcrumb || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, categoryBreadcrumb: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2 space-y-4">
                  <ImageUploadField
                    label="Book Front Cover Artwork"
                    required
                    value={editingBook.coverImage || ''}
                    onChange={(url) => setEditingBook({ ...editingBook, coverImage: url })}
                    helperText="Official front cover artwork for store catalog, book details, reader drawer, and customer receipts."
                    categoryFolder="books"
                    aspectRatioLabel="3:4 portrait (e.g. 800x1200)"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploadField
                      label="Back Cover Artwork (Optional)"
                      value={editingBook.backCoverImage || ''}
                      onChange={(url) => setEditingBook({ ...editingBook, backCoverImage: url })}
                      helperText="Back cover blurb & barcode artwork shown in 3D interactive book viewer."
                      categoryFolder="books"
                      aspectRatioLabel="3:4 portrait"
                    />

                    <ImageUploadField
                      label="Book Spine Artwork (Optional)"
                      value={editingBook.spineImage || ''}
                      onChange={(url) => setEditingBook({ ...editingBook, spineImage: url })}
                      helperText="Spine title artwork used in 3D hardcover realistic rendering."
                      categoryFolder="books"
                      aspectRatioLabel="Vertical 1:6 ratio"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-stone-700 mb-1">Comprehensive Description</label>
                  <textarea
                    rows={3}
                    value={editingBook.description || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl"
                  />
                </div>

                {/* Key Takeaways Builder */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block font-bold text-stone-700">What You Will Learn (Bullet Points)</label>
                  {(editingBook.whatYouWillLearn || []).map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => {
                          const updated = [...(editingBook.whatYouWillLearn || [])];
                          updated[idx] = e.target.value;
                          setEditingBook({ ...editingBook, whatYouWillLearn: updated });
                        }}
                        className="flex-1 p-2 bg-stone-50 border rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingBook.whatYouWillLearn || []).filter((_, i) => i !== idx);
                          setEditingBook({ ...editingBook, whatYouWillLearn: updated });
                        }}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add new takeaway bullet point..."
                      value={newTakeaway}
                      onChange={(e) => setNewTakeaway(e.target.value)}
                      className="flex-1 p-2 bg-white border border-stone-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newTakeaway.trim()) return;
                        setEditingBook({
                          ...editingBook,
                          whatYouWillLearn: [...(editingBook.whatYouWillLearn || []), newTakeaway.trim()],
                        });
                        setNewTakeaway('');
                      }}
                      className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-lg"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                {/* Toggles */}
                <div className="sm:col-span-2 flex flex-wrap gap-4 pt-2 border-t border-stone-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingBook.isFeatured || false}
                      onChange={(e) => setEditingBook({ ...editingBook, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#0B192C]"
                    />
                    <span className="font-bold text-stone-700">Feature on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingBook.isBestseller || false}
                      onChange={(e) => setEditingBook({ ...editingBook, isBestseller: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#0B192C]"
                    />
                    <span className="font-bold text-stone-700">Bestseller Badge</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingBook.isNewRelease || false}
                      onChange={(e) => setEditingBook({ ...editingBook, isNewRelease: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#0B192C]"
                    />
                    <span className="font-bold text-stone-700">New Release Badge</span>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-2">
              <BookGoogleShoppingTab book={editingBook} onChange={setEditingBook} />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="px-4 py-2.5 text-stone-600 hover:bg-stone-100 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0B192C] text-[#C5A059] rounded-xl font-bold hover:bg-[#152A4A] shadow-md cursor-pointer"
                >
                  Save Book to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* INVOICE & ORDER VIEWER MODAL */}
      {/* ==================================================== */}
      {selectedOrderForInvoice && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedOrderForInvoice(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-stone-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold">Tax Invoice & Delivery Manifest</span>
                <h3 className="font-serif text-xl font-bold text-[#0B192C]">
                  Order #{selectedOrderForInvoice.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-bold text-stone-800 uppercase text-[10px]">Billed & Shipped To:</h4>
                <p className="font-semibold">{selectedOrderForInvoice.customer?.fullName || (selectedOrderForInvoice as any).shippingAddress?.fullName}</p>
                <p className="text-stone-600">{selectedOrderForInvoice.customer?.phone || (selectedOrderForInvoice as any).shippingAddress?.phone}</p>
                <p className="text-stone-500">
                  {selectedOrderForInvoice.customer?.address || (selectedOrderForInvoice as any).shippingAddress?.address}, {selectedOrderForInvoice.customer?.city || (selectedOrderForInvoice as any).shippingAddress?.city}
                </p>
              </div>
              <div className="text-right">
                <h4 className="font-bold text-stone-800 uppercase text-[10px]">Logistics Partner:</h4>
                <p className="font-mono font-bold text-stone-900">{selectedOrderForInvoice.courierPartner || 'BlueDart Express'}</p>
                <p className="font-mono text-stone-500">AWB: {selectedOrderForInvoice.trackingNumber || 'Pending AWB'}</p>
                <p className="text-emerald-700 font-bold mt-1">Status: {selectedOrderForInvoice.orderStatus}</p>
              </div>
            </div>

            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-600 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Book Item</th>
                    <th className="p-2.5">Format</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {selectedOrderForInvoice.items?.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium">{it.title}</td>
                      <td className="p-2.5 text-stone-500">{it.format || 'Paperback'}</td>
                      <td className="p-2.5 font-mono">{it.quantity}</td>
                      <td className="p-2.5 text-right font-mono font-bold">₹{it.price * it.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-stone-200">
              <span className="text-stone-500">Payment: {selectedOrderForInvoice.paymentMethod || 'Online UPI'} (Paid)</span>
              <div className="text-right font-mono">
                <span className="text-stone-500 text-[11px] block">Grand Total</span>
                <strong className="text-lg font-bold text-[#0B192C]">₹{selectedOrderForInvoice.total}</strong>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MEDIA UPLOAD MODAL */}
      {/* ==================================================== */}
      {isMediaModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsMediaModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-4 border border-stone-300 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0B192C]">
                  Upload & Register Digital Asset
                </h3>
                <p className="text-xs text-stone-500">
                  Store image locally or via secure link in the Sahayak media vault
                </p>
              </div>
              <button
                onClick={() => setIsMediaModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold p-1 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMediaUploadTab('file')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mediaUploadTab === 'file'
                    ? 'bg-white text-[#0B192C] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Upload From Device</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaUploadTab('url')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mediaUploadTab === 'url'
                    ? 'bg-white text-[#0B192C] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Web Image URL</span>
              </button>
            </div>

            <form onSubmit={handleCreateMedia} className="space-y-4 text-xs">
              {mediaUploadTab === 'file' ? (
                <div>
                  <input
                    ref={modalMediaInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/gif"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setIsMediaProcessing(true);
                      try {
                        const processed = await processImageFile(file);
                        setNewMediaUrl(processed.dataUrl);
                        setNewMediaSize(processed.size);
                        setNewMediaDimensions(processed.dimensions);
                        if (!newMediaTitle) {
                          setNewMediaTitle(file.name.replace(/\.[^/.]+$/, ''));
                        }
                      } catch (err) {
                        console.error('Failed to process image:', err);
                      } finally {
                        setIsMediaProcessing(false);
                      }
                    }}
                  />

                  {newMediaUrl ? (
                    <div className="space-y-2">
                      <div className="relative rounded-2xl overflow-hidden border border-stone-300 bg-stone-100 flex items-center justify-center h-48 group">
                        <img
                          src={newMediaUrl}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => modalMediaInputRef.current?.click()}
                            className="px-3 py-1.5 bg-white text-stone-800 text-xs font-bold rounded-lg shadow cursor-pointer"
                          >
                            Replace Image
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setNewMediaUrl('');
                              setNewMediaSize('');
                              setNewMediaDimensions('');
                            }}
                            className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg shadow cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                        <span>Dimensions: {newMediaDimensions || 'Calculated automatically'}</span>
                        <span>Size: {newMediaSize || 'Optimized'}</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDrop={async (e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (!file) return;
                        setIsMediaProcessing(true);
                        try {
                          const processed = await processImageFile(file);
                          setNewMediaUrl(processed.dataUrl);
                          setNewMediaSize(processed.size);
                          setNewMediaDimensions(processed.dimensions);
                          if (!newMediaTitle) {
                            setNewMediaTitle(file.name.replace(/\.[^/.]+$/, ''));
                          }
                        } catch (err) {
                          console.error('Failed to process image:', err);
                        } finally {
                          setIsMediaProcessing(false);
                        }
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => modalMediaInputRef.current?.click()}
                      className="p-8 border-2 border-dashed border-stone-300 hover:border-[#C5A059] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all space-y-2"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 shadow-xs flex items-center justify-center text-[#C5A059]">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-800">
                          {isMediaProcessing ? 'Optimizing Image...' : 'Click to select image or drag & drop'}
                        </p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          PNG, JPG, WebP, SVG, GIF (Optimized automatically)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newMediaUrl}
                    onChange={(e) => {
                      setNewMediaUrl(e.target.value);
                      setNewMediaSize('340 KB');
                      setNewMediaDimensions('800 x 1200');
                    }}
                    className="w-full p-2.5 bg-stone-50 border rounded-xl font-mono text-xs"
                  />
                  {newMediaUrl && (
                    <div className="mt-2 h-32 rounded-xl overflow-hidden bg-stone-100 border flex items-center justify-center">
                      <img src={newMediaUrl} alt="Preview" className="max-h-full object-contain" />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block font-bold text-stone-700 mb-1">Asset Name / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Governance Book Cover"
                  value={newMediaTitle}
                  onChange={(e) => setNewMediaTitle(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Asset Category / Folder</label>
                <select
                  value={newMediaCategory}
                  onChange={(e) => setNewMediaCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-stone-50 border rounded-xl font-semibold"
                >
                  <option value="books">Book Covers</option>
                  <option value="authors">Author Portraits</option>
                  <option value="homepage">Homepage Banners</option>
                  <option value="logos">Logos & Badges</option>
                  <option value="other">General Resources</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(false)}
                  className="px-4 py-2 text-stone-600 font-bold hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newMediaUrl.trim() || !newMediaTitle.trim() || isMediaProcessing}
                  className="px-5 py-2 bg-[#0B192C] text-[#C5A059] font-bold rounded-xl hover:bg-[#152A4A] cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {isMediaProcessing ? 'Processing...' : 'Register Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* NEW STAFF USER MODAL */}
      {/* ==================================================== */}
      {isUserModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsUserModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 space-y-4 border border-stone-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#0B192C]">
                Add Staff Member Profile
              </h3>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStaffUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Officer Name"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="officer@sahayakassociates.org"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={newUserForm.phone}
                  onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Administrative Role (RBAC)</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as UserRole })}
                  className="w-full p-2.5 bg-stone-50 border rounded-xl font-semibold"
                >
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full Governance)</option>
                  <option value="ADMIN">ADMIN (Catalog & Orders)</option>
                  <option value="EDITOR">EDITOR (Content & Reviews)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 text-stone-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B192C] text-[#C5A059] font-bold rounded-xl hover:bg-[#152A4A] cursor-pointer"
                >
                  Grant Staff Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* GENERIC CONFIRMATION & DELETION MODAL */}
      {/* ==================================================== */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 space-y-5 border border-stone-200 shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg font-bold text-[#0B192C]">
                  {deleteTarget.type === 'book'
                    ? 'Delete Book from Catalog'
                    : deleteTarget.type === 'reset'
                    ? 'Confirm System Reset'
                    : `Delete ${deleteTarget.type.charAt(0).toUpperCase() + deleteTarget.type.slice(1)}`}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {deleteTarget.type === 'book'
                    ? 'Are you sure you want to delete this book? You can permanently remove it or move it to archived status.'
                    : deleteTarget.type === 'reset'
                    ? 'This will reset all store collections and orders back to the original 4 Sahayak Association books.'
                    : `Are you sure you want to permanently delete this ${deleteTarget.type}? This action cannot be undone.`}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="text-xs font-bold text-stone-900 line-clamp-2">{deleteTarget.title}</div>
              {deleteTarget.extraInfo && (
                <div className="text-[11px] text-stone-500 font-mono mt-1">{deleteTarget.extraInfo}</div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2.5 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>

              {deleteTarget.type === 'book' && (
                <button
                  type="button"
                  onClick={handleArchiveFromModal}
                  className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-200 transition-colors cursor-pointer text-center"
                  title="Hide from store without deleting"
                >
                  Archive Instead
                </button>
              )}

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>
                  {deleteTarget.type === 'reset' ? 'Confirm Factory Reset' : 'Permanently Delete'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* FLOATING ACTION NOTIFICATION TOAST */}
      {/* ==================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B192C] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#C5A059]/40 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white ml-2 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
