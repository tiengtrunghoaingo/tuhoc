import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { StatsBar } from './components/StatsBar';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { FloatingSidebar } from './components/FloatingSidebar';
import { BottomToastBar } from './components/BottomToastBar';
import { MobileBottomNav } from './components/MobileBottomNav';

// Modals
import { HskStudyModal } from './components/modals/HskStudyModal';
import { RadicalsModal } from './components/modals/RadicalsModal';
import { DialogueModal } from './components/modals/DialogueModal';
import { MockExamModal } from './components/modals/MockExamModal';
import { WritingPracticeModal } from './components/modals/WritingPracticeModal';
import { TranslatorModal } from './components/modals/TranslatorModal';
import { DictationModal } from './components/modals/DictationModal';
import { AiTutorDrawer } from './components/modals/AiTutorDrawer';
import { SettingsModal } from './components/modals/SettingsModal';
import { NotebookModal } from './components/modals/NotebookModal';
import { SearchModal } from './components/modals/SearchModal';
import { AuthModal } from './components/modals/AuthModal';
import { AccountSheetModal } from './components/modals/AccountSheetModal';

import { ChineseWord, AppSettings, HskLevel, UserProfile } from './types';
import { HSK_WORDS_SAMPLE } from './data/chineseData';

export default function App() {
  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedHskLevel, setSelectedHskLevel] = useState<HskLevel>(1);
  const [examType, setExamType] = useState<'hsk' | 'thpt'>('hsk');

  // Auth User Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem('hoai_ngo_current_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Notebook Saved Words (Local storage persistence)
  const [savedWords, setSavedWords] = useState<ChineseWord[]>(() => {
    try {
      const saved = localStorage.getItem('hoai_ngo_saved_words');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [HSK_WORDS_SAMPLE[0], HSK_WORDS_SAMPLE[1]];
  });

  // User Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('hoai_ngo_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      showPinyin: true,
      showHanViet: true,
      isTraditional: false,
      speechRate: 0.9,
      fontSize: 'medium',
      autoPlayAudio: false
    };
  });

  // Persist user auth and sync with backend stats database
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('hoai_ngo_current_user', JSON.stringify(currentUser));
        // Auto-sync with backend accounts stats table
        fetch('/api/accounts/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: currentUser.name,
            email: currentUser.email,
            avatar: currentUser.avatar,
            provider: currentUser.provider || 'email',
            isVip: currentUser.isVip ?? true,
            currentHskTarget: selectedHskLevel || 1,
            lessonsCompleted: 15,
            hskWordsLearned: savedWords.length > 0 ? savedWords.length * 10 : 45
          })
        }).catch(err => console.log('Sync err:', err));
      } else {
        localStorage.removeItem('hoai_ngo_current_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Persist saved words
  useEffect(() => {
    try {
      localStorage.setItem('hoai_ngo_saved_words', JSON.stringify(savedWords));
    } catch (e) {
      console.error(e);
    }
  }, [savedWords]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem('hoai_ngo_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Keyboard shortcut (⌘K or Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setActiveModal('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSaveWord = (word: ChineseWord) => {
    setSavedWords(prev => {
      const exists = prev.some(w => w.id === word.id);
      if (exists) {
        return prev.filter(w => w.id !== word.id);
      } else {
        return [...prev, word];
      }
    });
  };

  const isWordSaved = (wordId: string) => {
    return savedWords.some(w => w.id === wordId);
  };

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleRequestAuth = () => {
    setAuthMode('login');
    setActiveModal('auth');
  };

  const handleSelectCategory = (actionKey: string) => {
    switch (actionKey) {
      case 'hsk':
        setSelectedHskLevel(1);
        setActiveModal('hsk');
        break;
      case 'topic_vocab':
        setSelectedHskLevel(2);
        setActiveModal('hsk');
        break;
      case 'dialogue':
      case 'patterns':
        setActiveModal('dialogue');
        break;
      case 'radicals':
        setActiveModal('radicals');
        break;
      case 'exam':
        setExamType('hsk');
        setActiveModal('exam');
        break;
      case 'thpt_exam':
        setExamType('thpt');
        setActiveModal('exam');
        break;
      case 'writing':
        setActiveModal('writing');
        break;
      case 'translate':
        setActiveModal('translate');
        break;
      case 'reading':
      case 'measure_words':
        setSelectedHskLevel(1);
        setActiveModal('hsk');
        break;
      default:
        setActiveModal('hsk');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-red-600 selection:text-white">
      
      {/* Top Navigation Bar */}
      <Header
        onOpenSearch={() => setActiveModal('search')}
        onOpenDictation={() => setActiveModal('dictation')}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setActiveModal('auth');
        }}
        onOpenCategory={handleSelectCategory}
        onOpenNotebook={() => setActiveModal('notebook')}
        onOpenAccountSheet={() => setActiveModal('account_sheet')}
        savedCount={savedWords.length}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onStartLearning={() => {
            setSelectedHskLevel(1);
            setActiveModal('hsk');
          }}
          onExploreCourses={() => {
            const section = document.getElementById('courses-section');
            section?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenWordDetail={(word) => {
            setSelectedHskLevel(word.level);
            setActiveModal('hsk');
          }}
          onToggleSaveWord={handleToggleSaveWord}
          isSaved={isWordSaved}
          currentUser={currentUser}
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setActiveModal('auth');
          }}
        />

        {/* 11 Categories Section */}
        <CategoryGrid 
          onSelectCategory={handleSelectCategory} 
          currentUser={currentUser}
        />

        {/* Stats Summary Bar */}
        <StatsBar />

        {/* Call to Action Banner */}
        <CallToAction
          onRegister={() => {
            setAuthMode('register');
            setActiveModal('auth');
          }}
        />
      </main>

      {/* Modern Dark Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Floating Action Buttons */}
      <FloatingSidebar
        onOpenSettings={() => setActiveModal('settings')}
        onOpenNotebook={() => setActiveModal('notebook')}
        onOpenAiTutor={() => setActiveModal('aitutor')}
        onOpenDictation={() => setActiveModal('dictation')}
        onOpenAccountSheet={() => setActiveModal('account_sheet')}
        savedCount={savedWords.length}
        isAdmin={currentUser?.email?.toLowerCase() === 'canhln1224@gmail.com'}
      />

      {/* Bottom Sticky Quick Indicator */}
      <BottomToastBar
        onOpenHsk={() => {
          setSelectedHskLevel(1);
          setActiveModal('hsk');
        }}
      />

      {/* Mobile Bottom Navigation Bar (iOS / Android App feel) */}
      <MobileBottomNav
        activeModal={activeModal}
        currentUser={currentUser}
        onGoHome={() => {
          setActiveModal(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHsk={() => {
          setSelectedHskLevel(1);
          setActiveModal('hsk');
        }}
        onOpenDictation={() => setActiveModal('dictation')}
        onOpenAiTutor={() => setActiveModal('aitutor')}
        onOpenAuthOrProfile={() => {
          setAuthMode('login');
          setActiveModal('auth');
        }}
        onOpenAccountSheet={() => setActiveModal('account_sheet')}
      />

      {/* Interactive Modals */}
      <HskStudyModal
        isOpen={activeModal === 'hsk'}
        onClose={() => setActiveModal(null)}
        initialLevel={selectedHskLevel}
        onToggleSaveWord={handleToggleSaveWord}
        isSaved={isWordSaved}
        settings={settings}
        currentUser={currentUser}
        onRequestAuth={handleRequestAuth}
      />

      <RadicalsModal
        isOpen={activeModal === 'radicals'}
        onClose={() => setActiveModal(null)}
        currentUser={currentUser}
        onRequestAuth={handleRequestAuth}
      />

      <DialogueModal
        isOpen={activeModal === 'dialogue'}
        onClose={() => setActiveModal(null)}
        currentUser={currentUser}
        onRequestAuth={handleRequestAuth}
      />

      <MockExamModal
        isOpen={activeModal === 'exam'}
        onClose={() => setActiveModal(null)}
        examType={examType}
        currentUser={currentUser}
        onRequestAuth={handleRequestAuth}
      />

      <WritingPracticeModal
        isOpen={activeModal === 'writing'}
        onClose={() => setActiveModal(null)}
        currentUser={currentUser}
        onRequestAuth={handleRequestAuth}
      />

      <TranslatorModal
        isOpen={activeModal === 'translate'}
        onClose={() => setActiveModal(null)}
        currentUser={currentUser}
        onRequestAuth={handleRequestAuth}
      />

      <DictationModal
        isOpen={activeModal === 'dictation'}
        onClose={() => setActiveModal(null)}
        currentUser={currentUser}
        onRequestAuth={handleRequestAuth}
      />

      <AiTutorDrawer
        isOpen={activeModal === 'aitutor'}
        onClose={() => setActiveModal(null)}
        currentUser={currentUser}
        onRequestAuth={handleRequestAuth}
      />

      <SettingsModal
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal(null)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      <NotebookModal
        isOpen={activeModal === 'notebook'}
        onClose={() => setActiveModal(null)}
        savedWords={savedWords}
        onRemoveWord={(id) => setSavedWords(prev => prev.filter(w => w.id !== id))}
        onOpenStudy={() => setActiveModal('hsk')}
      />

      <SearchModal
        isOpen={activeModal === 'search'}
        onClose={() => setActiveModal(null)}
        onSelectWord={(word) => {
          setSelectedHskLevel(word.level);
          setActiveModal('hsk');
        }}
      />

      <AuthModal
        isOpen={activeModal === 'auth'}
        onClose={() => setActiveModal(null)}
        initialMode={authMode}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Spreadsheet Account & Lessons Statistics Modal */}
      <AccountSheetModal
        isOpen={activeModal === 'account_sheet'}
        onClose={() => setActiveModal(null)}
        currentUserEmail={currentUser?.email}
        onRequestAdminLogin={() => {
          setAuthMode('login');
          setActiveModal('auth');
        }}
      />

    </div>
  );
}
