import React, { useState, createContext, useContext } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  tabs: Tab[];
  className?: string;
}

export const Tabs: React.FC<TabsProps> & {
  Content: typeof TabContent;
} = ({ children, defaultValue, value, onValueChange, tabs, className = '' }) => {
  const [internalValue, setInternalValue] = useState(defaultValue || tabs[0]?.id || '');
  
  const activeTab = value !== undefined ? value : internalValue;
  const setActiveTab = onValueChange || setInternalValue;

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {/* Tab Headers */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-primary-green text-primary-green'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {children}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

interface TabContentProps {
  value: string;
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ value, children }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabContent must be used within a Tabs component');
  }
  
  const { activeTab } = context;
  
  if (activeTab !== value) {
    return null;
  }
  
  return <>{children}</>;
};

Tabs.Content = TabContent;