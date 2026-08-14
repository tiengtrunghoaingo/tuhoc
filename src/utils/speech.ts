// Web Speech API wrapper for Chinese Pronunciation

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private zhVoice: SpeechSynthesisVoice | null = null;
  private isSupported: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.isSupported = true;
      this.loadVoices();
      
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Look for standard Chinese mainland voices first
    this.zhVoice = 
      voices.find(v => v.lang === 'zh-CN' || v.lang === 'cmn-Hans-CN') ||
      voices.find(v => v.lang.startsWith('zh')) ||
      null;
  }

  public speak(text: string, rate: number = 0.9, onEnd?: () => void, onError?: () => void) {
    if (!this.synth || !this.isSupported) {
      console.warn('Speech synthesis not supported in this browser.');
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any ongoing speech

      const cleanText = text.replace(/[\[\]\(\)]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      if (this.zhVoice) {
        utterance.voice = this.zhVoice;
      }
      utterance.lang = 'zh-CN';
      utterance.rate = Math.max(0.6, Math.min(1.4, rate));
      utterance.pitch = 1.0;

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.error('Speech error:', e);
        this.currentUtterance = null;
        if (onError) onError();
        else if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err) {
      console.error('TTS error:', err);
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  public speakVietnamese(text: string, rate: number = 1.0) {
    if (!this.synth) return;
    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = rate;
      this.synth.speak(utterance);
    } catch (e) {
      console.error(e);
    }
  }
}

export const speechService = new SpeechService();
