
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { voiceOverService } from './services/geminiService';
import { AppStatus, VoiceProfile } from './types';

const ARABIC_SCRIPT = `تَخَيَّلِي أَنَّ كُلَّ شَيْءٍ بَنَيْتِهِ فِي حَيَاتِكِ.. شَهَادَتَكِ الْجَامِعِيَّةَ، وَظِيفَتَكِ كَمُمَرِّضَةٍ، وَسُمْعَتَكِ الطَّيِّبَةَ.. كُلُّ هَذَا يَضِيعُ فِي لَحْظَةٍ وَاحِدَةٍ بِسَبَبِ "غَلْطَةٍ" بَسِيطَةٍ.

الْقِصَّةُ بَدَأَتْ بِمُخَالَفَةِ سُرْعَةٍ عَادِيَةٍ، عَشْرَةُ أَمْيَالٍ زِيَادَةً فَقَطْ.. لَكِنَّهَا انْتَهَتْ بِكَارِثَةٍ حَقِيقِيَّةٍ.

فِي لَيْلَةٍ مُظْلِمَةٍ بِوِلَايَةِ نِيُو مَكْسِيكُو.. أَوْقَفَ الضَّابِطُ سَيَّارَةً تَقُودُهَا شَابَّةٌ اسْمُهَا "لَيْلَى". فِي الْبِدَايَةِ، بَدَا الْأَمْرُ رُوتِينِيّاً.. لَكِنَّ الضَّابِطَ لَاحَظَ شَيْئاً غَرِيباً فِي طَرِيقَتِهَا.

"لَيْلَى" كَانَتْ مُمَرِّضَةً، مُتَعَلِّمَةً، وَمُهَذَّبَةً جِدّاً فِي حَدِيثِهَا.. لَكِنَّهَا وَقَعَتْ فِي فَخٍّ كَبِيرٍ. حَاوَلَتْ إِخْفَاءَ الْحَقِيقَةِ فِي الْبِدَايَةِ. عِنْدَمَا سَأَلَهَا الضَّابِطُ: "هَلْ شَرِبْتِ شَيْئاً؟".. قَالَتْ: "مَشْرُوبٌ وَاحِدٌ فَقَطْ".

لَكِن مَعَ مُرُورِ الْوَقْتِ، بَدَأَتِ التَّفَاصِيلُ تَتَغَيَّرُ.. الْمَشْرُوبُ الْوَاحِدُ أَصْبَحَ اثْنَيْنِ.. وَالِارْتِبَاكُ بَدَا وَاضِحاً عَلَيْهَا. هَلْ كَانَتْ تَتَرَنَّحُ بِالسَّيَّارَةِ لِأَنَّهَا تُغَنِّي مَعَ الرَّادْيُو فِعْلاً؟ أَمْ أَنَّ الْكَحُولَ بَدَأَ يُسَيْطِرُ عَلَى حَوَاسِّهَا؟

الضَّابِطُ طَلَبَ مِنْهَا النُّزُولَ مِنَ السَّيَّارَةِ.. وَهُنَا بَدَأَ التَّوَتُّرُ الْحَقِيقِيُّ. "لَيْلَى" خَلَعَتْ حِذَاءَهَا وَوَقَفَتْ حَافِيَةَ الْقَدَمَيْنِ عَلَى الْأَسْفَلْتِ الْبَارِدِ. طُلِبَ مِنْهَا أَنْ تَمْشِيَ عَلَى خَطٍّ مُسْتَقِيمٍ.. تِسْعَ خَطَوَاتٍ.. كَعْباً خَلْفَ أَصَابِعِ الْقَدَمِ.. ثُمَّ تَلْتَفِتُ وَتَرْجِعُ.

بَدَأَتْ "لَيْلَى" تُحَاوِلُ بِكُلِّ قُوَّتِهَا.. كَانَتْ تَعْتَذِرُ لِلضَّابِطِ مَعَ كُلِّ تَعَثُّرٍ.. وَتَتَوَسَّلُ إِلَيْهِ أَنْ يَتْرُكَهَا تَذْهَبُ لِحَالِ سَبِيلِهَا. لَكِنْ فِي هَذِهِ اللَّحَظَاتِ.. الْقَانُونُ لَا يَعْرِفُ الْعَوَاطِفَ.

وَعِنْدَمَا جَاءَتِ اللَّحْظَةُ الْحَاسِمَةُ.. وَطَلَبَ مِنْهَا الضَّابِطُ فَحْصَ النَّفَسِ الْمَيْدَانِيَّ.. رَفَضَتْ "لَيْلَى". وَفِي ثَوَانٍ مَعْدُودَةٍ.. تَحَوَّلَ الْمَشْهَدُ تَمَاماً. سُمِعَ صَوْتُ الْأَصْفَادِ وَهِيَ تُغْلَقُ عَلَى يَدِهَا. تَحَوَّلَتِ الْمُمَرِّضَةُ الْمُحْتَرَمَةُ إِلَى "مُتَّهَمَةٍ" فِي طَرِيقَهَا لِلسِّجْنِ.

فِي مَرْكَزِ الشُّرْطَةِ.. ظَهَرَتِ النَّتِيجَةُ النِّهَائِيَّةُ الصَّادِمَةُ. الرَّقَمُ كَانَ "صِفْر فَاصِلَة مِئَة وَأَحَد وَخَمْسِينَ". هَذَا الرَّقَمُ يَعْنِي أَنَّهَا كَانَتْ تَحْتَ تَأْثِيرِ ضِعْفِ الْكَمِّيَّةِ الْمَسْمُوحِ بِهَا!

فِي تِلْكَ اللَّحْظَةِ.. أَدْرَكَتْ "لَيْلَى" أَنَّ حَيَاتَهَا تَغَيَّرَتْ لِلْأَبَدِ. أَمَامَهَا عَشَرَةُ أَيَّامٍ فَقَطْ لِإِنْقَاذِ رُخْصَتِهَا.. وَسَنَوَاتٌ مِنَ الْمَحَاكِمِ الَّتِي سَتُلَاحِقُهَا فِي مِهْنَتِهَا لِلْأَبَدِ.

الدَّرْسُ مِنْ هَذِهِ الْقِصَّةِ بَسِيطٌ وَوَاضِحٌ: قَضَايَا الْقِيَادَةِ تَحْتَ التَّأْثِيرِ لَا تَبْدَأُ عِنْدَ وُقُوعِ حَادِثٍ.. بَلْ تَبْدَأُ فِي اللَّحْظَةِ الَّتِي تُقْنِعُ فِيهَا نَفْسَكَ بِأَنَّكَ "بِخَيْرٍ".. بَيْنَمَا الْوَاقِعُ يَقُولُ عَكْسَ ذَلِكَ تَمَاماً.

وَالْآنَ.. اسْأَلْ نَفْسَكَ: لَوْ كُنْتَ مَكَانَ الضَّابِطِ.. هَلْ كُنْتَ سَتُسَامِحُهَا؟ أَمْ أَنَّ الْقَانُونَ يَجِبُ أَنْ يُطَبَّقَ عَلَى الْجَمِيعِ؟ اكْتُبْ لِي رَأْيَكَ فِي التَّعْلِيقَاتِ.. وَشَارِكِ الْفِيدْيُو مَعَ شَخْصٍ تُحِبُّهُ.. لَعَلَّهُ يَكُونُ سَبَباً فِي إِنْقَاذِ حَيَاتِهِ.`;

const VOICE_PROFILES: VoiceProfile[] = [
  { id: 'Fenrir', name: 'Deep Professional', description: 'Deep, resonant, authoritative male voice.', gender: 'male' },
  { id: 'Puck', name: 'Narrative Warmth', description: 'Warmer, engaging male voice.', gender: 'male' },
  { id: 'Charon', name: 'Authoritative Calm', description: 'Lower register, calm and steady.', gender: 'male' },
  { id: 'Kore', name: 'Elegant Professional', description: 'Clear, professional, and sophisticated female voice.', gender: 'female' },
  { id: 'Zephyr', name: 'Bright Narrative', description: 'Bright, friendly, and expressive female voice.', gender: 'female' },
];

export default function App() {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [selectedVoice, setSelectedVoice] = useState<string>(VOICE_PROFILES[0].id);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const filteredVoices = useMemo(() => {
    const voices = VOICE_PROFILES.filter(v => v.gender === selectedGender);
    // Auto-select first voice of category if current selection isn't in filtered list
    if (!voices.find(v => v.id === selectedVoice)) {
       setSelectedVoice(voices[0].id);
    }
    return voices;
  }, [selectedGender, selectedVoice]);

  const stopAudio = useCallback(() => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
    }
    setStatus(AppStatus.IDLE);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const playAudio = useCallback(async () => {
    if (!audioBuffer) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    stopAudio();

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    
    source.connect(analyser);
    analyser.connect(ctx.destination);

    source.onended = () => {
      setStatus(AppStatus.IDLE);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };

    source.start(0);
    sourceNodeRef.current = source;
    setStatus(AppStatus.PLAYING);

    // Start Visualizer
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasCtx = canvas.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!canvasCtx) return;
        animationFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = '#0f172a';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * canvas.height;
          canvasCtx.fillStyle = `rgb(59, 130, 246)`;
          canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };
      draw();
    }
  }, [audioBuffer, stopAudio]);

  const handleGenerate = async () => {
    try {
      setStatus(AppStatus.GENERATING);
      setErrorMessage(null);
      const buffer = await voiceOverService.generateVoiceOver(ARABIC_SCRIPT, selectedVoice);
      setAudioBuffer(buffer);
      setStatus(AppStatus.IDLE);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "An unexpected error occurred.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleDownload = () => {
    if (!audioBuffer) return;
    alert("Audio generation complete. In a production environment, this would initiate a .wav export.");
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (sourceNodeRef.current) sourceNodeRef.current.stop();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto w-full mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
            <i className="fas fa-microphone-lines text-2xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Arabic Prestige</h1>
            <p className="text-slate-400 text-sm">Professional Voice-Over Studio</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
          <a 
            href="https://ko-fi.com/houssamrais#checkoutModal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all border border-slate-700 shadow-lg active:scale-95"
          >
            <i className="fas fa-mug-hot text-[#FF5E5B]"></i>
            <span>Support via Ko-Fi</span>
          </a>

          <button 
            onClick={handleGenerate}
            disabled={status === AppStatus.GENERATING}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              status === AppStatus.GENERATING 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 active:scale-95'
            }`}
          >
            {status === AppStatus.GENERATING ? (
              <><i className="fas fa-spinner fa-spin"></i> Generating...</>
            ) : (
              <><i className="fas fa-wand-magic-sparkles"></i> Render Audio</>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Script Section */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <i className="far fa-file-lines text-blue-400"></i> Script Preview
              </h2>
              <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md uppercase tracking-wider">Modern Standard Arabic</span>
            </div>
            <div className="arabic-text text-xl md:text-2xl leading-[2] text-slate-200 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 max-h-[60vh] overflow-y-auto whitespace-pre-wrap">
              {ARABIC_SCRIPT}
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <aside className="space-y-6">
          {/* Profile Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Vocal Profile</h3>
            
            {/* Gender Toggle */}
            <div className="flex bg-slate-950 p-1 rounded-xl mb-4 border border-slate-800">
               <button 
                onClick={() => setSelectedGender('male')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${selectedGender === 'male' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 <i className="fas fa-mars text-xs"></i> Male
               </button>
               <button 
                onClick={() => setSelectedGender('female')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${selectedGender === 'female' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 <i className="fas fa-venus text-xs"></i> Female
               </button>
            </div>

            <div className="space-y-3">
              {filteredVoices.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedVoice(profile.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border-2 ${
                    selectedVoice === profile.id
                    ? `border-${selectedGender === 'male' ? 'blue' : 'pink'}-600 bg-${selectedGender === 'male' ? 'blue' : 'pink'}-600/10 ring-1 ring-${selectedGender === 'male' ? 'blue' : 'pink'}-600`
                    : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{profile.name}</span>
                    {selectedVoice === profile.id && <i className={`fas fa-check-circle text-${selectedGender === 'male' ? 'blue' : 'pink'}-500`}></i>}
                  </div>
                  <p className="text-xs text-slate-400">{profile.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Player Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-hidden relative">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Playback Console</h3>
            
            <div className="h-24 bg-slate-950 rounded-2xl mb-6 flex items-center justify-center relative group overflow-hidden border border-slate-800">
               {status === AppStatus.PLAYING ? (
                 <canvas ref={canvasRef} className="w-full h-full" width={400} height={100} />
               ) : (
                 <div className="text-slate-700 font-mono text-xs uppercase tracking-widest">
                   {audioBuffer ? 'System Ready' : 'Awaiting Render'}
                 </div>
               )}
            </div>

            <div className="flex items-center gap-4">
              {status === AppStatus.PLAYING ? (
                <button 
                  onClick={stopAudio}
                  className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-3 rounded-2xl font-bold transition-all border border-red-600/30 active:scale-95"
                >
                  <i className="fas fa-stop mr-2"></i> Stop
                </button>
              ) : (
                <button 
                  onClick={playAudio}
                  disabled={!audioBuffer}
                  className={`flex-1 py-3 rounded-2xl font-bold transition-all border ${
                    audioBuffer 
                    ? 'bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border-blue-600/30 active:scale-95' 
                    : 'bg-slate-800 text-slate-600 border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <i className="fas fa-play mr-2"></i> Play Preview
                </button>
              )}
              
              <button 
                onClick={handleDownload}
                disabled={!audioBuffer}
                className={`p-3 rounded-2xl transition-all border ${
                  audioBuffer 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 active:scale-95' 
                  : 'bg-slate-800 text-slate-600 border-slate-800 cursor-not-allowed'
                }`}
                title="Download Audio"
              >
                <i className="fas fa-download"></i>
              </button>
            </div>

            {errorMessage && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs flex items-start gap-3">
                <i className="fas fa-circle-exclamation mt-0.5"></i>
                <p>{errorMessage}</p>
              </div>
            )}
          </div>

          {/* Specs Card */}
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-900/30 rounded-3xl p-6 shadow-xl">
             <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Technical Specs</h3>
             <ul className="space-y-2 text-xs text-slate-400">
               <li className="flex justify-between"><span>Sample Rate:</span> <span className="text-slate-200">24kHz PCM</span></li>
               <li className="flex justify-between"><span>Engine:</span> <span className="text-slate-200">Gemini 2.5 TTS</span></li>
               <li className="flex justify-between"><span>Bit Depth:</span> <span className="text-slate-200">16-bit Mono</span></li>
               <li className="flex justify-between"><span>Latency:</span> <span className="text-slate-200">Ultra-Low</span></li>
             </ul>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full mt-auto pt-12 pb-8 text-center text-slate-500 text-sm">
        <p>&copy; 2024 Arabic Prestige Voice Studio. Powered by Google Gemini AI.</p>
      </footer>
    </div>
  );
}
