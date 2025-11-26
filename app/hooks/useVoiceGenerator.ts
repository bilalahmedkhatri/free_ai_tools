'use client';

import { useState, useEffect, useRef } from 'react';
import { VoiceParams } from '../types';
import { promptStorage } from '../lib/promptStorage';

export function useVoiceGenerator() {
  const [params, setParams] = useState<VoiceParams>({
    text: '',
    voice: '',
    rate: 1,
    pitch: 1,
    volume: 1,
  });
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const generationControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const prompts = promptStorage.load();
    setSavedPrompts(prompts);
  }, []);

  useEffect(() => {
    if (savedPrompts.length > 0 || promptStorage.count() > 0) {
      promptStorage.save(savedPrompts);
    }
  }, [savedPrompts]);

  const handleGenerate = async (apiVoiceId?: string) => {
    if (!params.text.trim()) {
      setErrorMessage('Please enter some text to generate a voiceover.');
      setStatusMessage(null);
      return;
    }

    if (!apiVoiceId) {
      setErrorMessage('Please select a voice from the dropdown before generating.');
      setStatusMessage(null);
      return;
    }

    setErrorMessage(null);

    const charCount = params.text.length;
    const wordCount = params.text.trim().split(/\s+/).filter(Boolean).length;
    const isLongText = charCount > 2500;
    const isMediumText = charCount > 1000;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const clearAllTimers = () => timers.forEach(clearTimeout);

    try {
      generationControllerRef.current?.abort();
      const controller = new AbortController();
      generationControllerRef.current = controller;

      setIsGenerating(true);
      
      setStatusMessage(isLongText 
        ? `Processing ${wordCount} words (${charCount} characters) — this could take longer than usual...`
        : 'Starting generation...'
      );

      const timeouts = isLongText 
        ? [
            [10000, `Still processing your ${wordCount}-word text — larger inputs take more time. Our servers are working on it.`],
            [25000, `Heavy traffic detected. Your ${charCount}-character voiceover is being generated — thanks for your patience.`],
            [45000, `Long text generation in progress. With ${wordCount} words, this takes extra time. Please hang tight; your audio will be ready shortly.`]
          ]
        : isMediumText
        ? [
            [12000, `Processing ${wordCount} words — our servers are handling extra traffic, so this might take a bit longer.`],
            [28000, `Heavy traffic detected. We are processing your ${charCount}-character voiceover — thanks for your patience.`],
            [50000, `Generation is still running due to high demand. Your ${wordCount}-word audio will be ready shortly.`]
          ]
        : [
            [15000, 'Still working — our servers are handling extra traffic, so this might take a few more seconds.'],
            [30000, 'Heavy traffic detected. We are processing your voiceover — thanks for your patience while we keep going.'],
            [60000, 'Generation is still running due to high demand. Please hang tight; your audio will be ready shortly.']
          ];

      timeouts.forEach(([delay, message]) => {
        timers.push(setTimeout(() => setStatusMessage(message as string), delay as number));
      });

      const response = await fetch('/api/voiceover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: params.text,
          voice_id: apiVoiceId,
          speed: params.rate,
          pitch: params.pitch,
          volume: params.volume,
          tone: 'neutral',
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('API Error:', error);
        throw new Error(error.error || 'Failed to generate voiceover');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      console.log('Downloading audio from:', data.audio_url);
      const audioResponse = await fetch(data.audio_url, { signal: controller.signal });
      
      if (!audioResponse.ok) {
        throw new Error(`Failed to download audio file: ${audioResponse.status} ${audioResponse.statusText}`);
      }
      
      const audioBlob = await audioResponse.blob();
      console.log('Audio downloaded, blob size:', audioBlob.size);
      setAudioBlob(audioBlob);

      clearAllTimers();
      setStatusMessage(null);
      setErrorMessage(null);
      generationControllerRef.current = null;
      setIsGenerating(false);
    } catch (error) {
      clearAllTimers();
      setIsGenerating(false);
      console.error('Error generating voiceover:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        setStatusMessage('Generation was interrupted. Please try again.');
        setErrorMessage(null);
        generationControllerRef.current = null;
        return;
      }

      const rawMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      const errorMap: Record<string, string> = {
        '404': 'The selected voice model is not available. Please try a different voice or contact support.',
        'Failed to download audio': 'The audio file could not be downloaded. Please verify the backend configuration.',
        'Failed to fetch': 'Unable to connect to the voiceover API. Make sure the backend server is running at http://localhost:8000.',
      };

      const uiMessage = Object.keys(errorMap).find(key => rawMessage.includes(key))
        ? errorMap[Object.keys(errorMap).find(key => rawMessage.includes(key))!]
        : `Error generating voiceover: ${rawMessage}`;
      
      setStatusMessage(null);
      setErrorMessage(uiMessage);
      generationControllerRef.current = null;
    }
  };

  const handleSavePrompt = () => {
    if (params.text.trim() && !savedPrompts.includes(params.text)) {
      setSavedPrompts([...savedPrompts, params.text]);
      return true; // Indicate success
    }
    return false; // Already saved or empty
  };

  const loadPrompt = (prompt: string) => {
    setParams(prev => ({ ...prev, text: prompt }));
  };

  const deletePrompt = (index: number) => {
    setSavedPrompts(savedPrompts.filter((_, i) => i !== index));
  };

  const dismissError = () => setErrorMessage(null);

  return {
    params,
    setParams,
    savedPrompts,
    audioBlob,
    handleGenerate,
    isGenerating,
    statusMessage,
    errorMessage,
    dismissError,
    handleSavePrompt,
    loadPrompt,
    deletePrompt,
  };
}
