export const formatCurrency = (amount: number, currency: string = 'UAH'): string => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
  
    return new Intl.DateTimeFormat('uk-UA', { ...defaultOptions, ...options }).format(d);
  };
  
  export const formatRelativeTime = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return 'щойно';
    }
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${getUkrainianPlural(diffInMinutes, 'хвилину', 'хвилини', 'хвилин')} тому`;
    }
  
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${getUkrainianPlural(diffInHours, 'годину', 'години', 'годин')} тому`;
    }
  
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${getUkrainianPlural(diffInDays, 'день', 'дні', 'днів')} тому`;
    }
  
    return formatDate(d, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  export const formatNumber = (number: number): string => {
    return new Intl.NumberFormat('uk-UA').format(number);
  };
  
  export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format as +38 (0XX) XXX-XX-XX
    if (cleaned.length === 12 && cleaned.startsWith('38')) {
      return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10)}`;
    }
    
    return phoneNumber;
  };
  
  // Ukrainian pluralization
  const getUkrainianPlural = (number: number, one: string, few: string, many: string): string => {
    const mod10 = number % 10;
    const mod100 = number % 100;
  
    if (mod10 === 1 && mod100 !== 11) {
      return one;
    }
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return few;
    }
    return many;
  };