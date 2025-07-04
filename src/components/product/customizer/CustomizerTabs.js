import React from 'react';
import Button from '../../ui/Button';

export default function CustomizerTabs({ activeTab, setActiveTab, tabRefs }) {
  const tabs = ['style', 'material', 'color', 'design', 'size'];
  return (
    <nav className="flex border-b border-gray-700" aria-label="Customizer tabs">
      {tabs.map((tab, idx) => (
        <Button
          key={tab}
          ref={el => tabRefs.current[idx] = el}
          variant={activeTab === tab ? 'primary' : 'secondary'}
          className={`px-4 py-2 font-medium capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            activeTab === tab 
              ? 'border-b-2 border-cyan-400 text-cyan-400' 
              : 'text-gray-400 hover:text-white'
          }`}
          aria-current={activeTab === tab ? 'page' : undefined}
          aria-controls={`customizer-panel-${tab}`}
          tabIndex={0}
          onClick={() => setActiveTab(tab)}
          onKeyDown={e => {
            if (e.key === 'ArrowRight') {
              tabRefs.current[(idx + 1) % tabs.length]?.focus();
            } else if (e.key === 'ArrowLeft') {
              tabRefs.current[(idx + tabs.length - 1) % tabs.length]?.focus();
            }
          }}
        >
          {tab}
        </Button>
      ))}
    </nav>
  );
}
