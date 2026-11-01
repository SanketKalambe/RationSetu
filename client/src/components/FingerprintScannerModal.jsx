import React, { useState } from 'react';
import { 
  Fingerprint, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  Laptop, 
  Smartphone,
  Sliders, 
  Info,
  QrCode,
  Check,
  ArrowRight
} from 'lucide-react';
import Modal from './Modal';
import API from '../services/api';

const FingerprintScannerModal = ({ isOpen, onClose, memberName, onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  const [scanStepMessage, setScanStepMessage] = useState('');
  const [scannedData, setScannedData] = useState(null);
  // Modes: 'simulated' (Default/Recommended), 'platform' (Windows Hello / Laptop), 'cross_device' (Phone QR)
  const [mode, setMode] = useState('simulated');
  const [error, setError] = useState(null);

  const isWebAuthnSupported = typeof window !== 'undefined' && !!window.PublicKeyCredential;

  const startScan = async () => {
    setScanning(true);
    setError(null);
    setScannedData(null);

    // MODE: WebAuthn Hardware (Platform or Cross-Device)
    if (mode === 'platform' || mode === 'cross_device') {
      if (!isWebAuthnSupported) {
        setError('Your browser does not support WebAuthn biometrics. Please use the Optical Sensor simulator.');
        setScanning(false);
        return;
      }

      try {
        setScanStepMessage('Requesting cryptographic challenge from server...');
        
        let challengeBase64;
        try {
          const res = await API.get('/auth/webauthn-challenge');
          challengeBase64 = res.data.challenge;
        } catch (apiErr) {
          const fallback = new Uint8Array(32);
          window.crypto.getRandomValues(fallback);
          challengeBase64 = btoa(String.fromCharCode(...fallback));
        }

        const rawChallenge = atob(challengeBase64.replace(/-/g, '+').replace(/_/g, '/'));
        const challengeBuffer = Uint8Array.from(rawChallenge, c => c.charCodeAt(0));

        const userEncoder = new TextEncoder();
        const userIdBytes = userEncoder.encode((memberName || 'beneficiary').slice(0, 16));

        setScanStepMessage(
          mode === 'platform' 
            ? 'Prompting Windows Hello / Laptop Fingerprint sensor...'
            : 'Prompting Phone / Cross-Device sensor...'
        );

        // Build authenticatorSelection
        // For 'platform': forces local PC fingerprint / Windows Hello PIN directly (No phone QR code!)
        // For 'cross_device': allows hybrid caBLE phone pairing
        const authenticatorSelection = mode === 'platform'
          ? {
              authenticatorAttachment: 'platform',
              userVerification: 'preferred'
            }
          : {
              userVerification: 'preferred',
              residentKey: 'preferred'
            };

        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: challengeBuffer,
            rp: {
              name: 'RationSetu e-POS Biometric Terminal'
            },
            user: {
              id: userIdBytes,
              name: ((memberName || 'beneficiary').toLowerCase().replace(/\s+/g, '.') + '@rationsetu.gov.in'),
              displayName: memberName || 'Ration Beneficiary'
            },
            pubKeyCredParams: [
              { alg: -7, type: 'public-key' },   // ES256 (Smartphones / TouchID)
              { alg: -257, type: 'public-key' }  // RS256 (Windows Hello)
            ],
            authenticatorSelection,
            timeout: 60000,
            attestation: 'none'
          }
        });

        const credId = credential.id || btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));
        const hash = `WEBAUTHN_${credId.slice(0, 24)}_APPROVED`;

        setScannedData({
          hash,
          quality: '100% (Cryptographic Proof)',
          timestamp: new Date().toLocaleTimeString(),
          method: mode === 'platform' ? 'Windows Hello / Hardware Sensor' : 'Phone / WebAuthn Sensor',
          id: credential.id
        });
        setScanning(false);
        setScanStepMessage('');

        if (onScanComplete) {
          onScanComplete(hash);
        }
        return;

      } catch (err) {
        console.warn('WebAuthn sensor capture notice:', err);
        setScanning(false);
        setScanStepMessage('');

        if (err.name === 'NotAllowedError') {
          setError(
            mode === 'cross_device'
              ? 'Phone passkey sync failed or was cancelled. Note: Google Play Services blocks passkeys on "localhost" over Bluetooth. Please use "Windows Hello (PC)" or the "Optical Sensor" simulator below.'
              : 'Biometric prompt was cancelled or timed out. You can retry or switch to the Optical Sensor simulator.'
          );
        } else if (err.name === 'SecurityError') {
          setError('WebAuthn requires HTTPS or localhost. Switch to the Optical Sensor simulator.');
        } else {
          setError(`Sensor notice: ${err.message || 'Biometric hardware unavailable'}. Switch to the Optical Sensor simulator.`);
        }
        return;
      }
    }

    // MODE: Interactive Optical Sensor Simulation (Physical e-POS Hardware Simulation)
    setScanStepMessage('Capturing fingerprint on optical scanner pad...');
    setTimeout(() => {
      const generatedHash = `FP_HASH_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      setScannedData({
        hash: generatedHash,
        quality: `${Math.floor(96 + Math.random() * 4)}%`,
        timestamp: new Date().toLocaleTimeString(),
        method: 'e-POS Optical Biometric Sensor'
      });
      setScanning(false);
      setScanStepMessage('');
      if (onScanComplete) {
        onScanComplete(generatedHash);
      }
    }, 1600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="e-POS Biometric Scanner Pad" maxWidth="max-w-lg">
      <div className="space-y-4 text-center text-slate-200">
        
        {/* Header information */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-100 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {memberName ? `Biometric Verification: ${memberName}` : 'Biometric Fingerprint Match'}
          </h3>
          <p className="text-xs text-slate-400">
            Aadhaar biometric authentication against Public Distribution registry
          </p>
        </div>

        {/* 3-Way Mode Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => { setMode('simulated'); setError(null); }}
            className={`py-2 px-1 font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
              mode === 'simulated' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="text-[11px]">Optical Scanner</span>
            <span className="text-[9px] text-blue-200 font-normal">(Recommended)</span>
          </button>

          <button
            type="button"
            onClick={() => { setMode('platform'); setError(null); }}
            className={`py-2 px-1 font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
              mode === 'platform' 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="text-[11px]">Windows Hello</span>
            <span className="text-[9px] text-purple-200 font-normal">(PC Fingerprint)</span>
          </button>

          <button
            type="button"
            onClick={() => { setMode('cross_device'); setError(null); }}
            className={`py-2 px-1 font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
              mode === 'cross_device' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px]">Phone QR</span>
            <span className="text-[9px] text-indigo-200 font-normal">(Hybrid caBLE)</span>
          </button>
        </div>

        {/* Informative Guidance Banner based on Mode */}
        {mode === 'simulated' && (
          <div className="p-2.5 bg-blue-950/30 border border-blue-500/20 rounded-xl text-left text-[11px] text-blue-200 flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0 text-blue-400" />
            <span>Simulates an on-counter physical optical biometric scanner (Mantra / Startek) for instant, reliable viva demo.</span>
          </div>
        )}

        {mode === 'platform' && (
          <div className="p-2.5 bg-purple-950/30 border border-purple-500/20 rounded-xl text-left text-[11px] text-purple-200 space-y-1">
            <div className="font-semibold text-purple-300 flex items-center gap-1">
              <Laptop className="w-3.5 h-3.5" /> Direct PC Windows Hello / Touch ID:
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              Triggers your laptop's fingerprint sensor, facial recognition, or Windows PIN directly on this computer without needing to scan any QR code.
            </p>
          </div>
        )}

        {mode === 'cross_device' && (
          <div className="p-2.5 bg-amber-950/30 border border-amber-500/20 rounded-xl text-left text-[11px] text-amber-200 space-y-1">
            <div className="font-semibold text-amber-300 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Note on Phone Cross-Device QR:
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              Google Play Services on Android requires an official <strong>HTTPS domain</strong> to sync passkeys over Bluetooth. On <code className="text-amber-300 bg-amber-950 px-1 rounded">localhost</code>, Android's Google Play Services displays <em>"Something went wrong"</em> because it cannot route local loopback to Google's cloud relay.
            </p>
            <p className="text-[10px] text-amber-400 font-semibold">
              Tip: Use <strong>Windows Hello</strong> or the <strong>Optical Scanner</strong> tab for 100% successful verification!
            </p>
          </div>
        )}

        {/* Visual Scanner Pad */}
        <div className="relative w-36 h-36 mx-auto rounded-3xl bg-slate-900 border-2 border-slate-700/80 flex items-center justify-center overflow-hidden shadow-inner group">
          {/* Scanning Beam Animation */}
          {scanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-500 animate-pulse top-0 animate-[ping_2s_infinite]" />
          )}

          <Fingerprint
            className={`w-20 h-20 transition-all duration-500 ${
              scannedData
                ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-105'
                : scanning
                ? 'text-emerald-400 animate-pulse scale-110'
                : 'text-slate-600 group-hover:text-blue-400'
            }`}
          />

          {scannedData && (
            <div className="absolute bottom-2 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
              <Check className="w-3 h-3" /> MATCH APPROVED
            </div>
          )}
        </div>

        {/* Scan Status / Message */}
        {scanning && (
          <div className="text-xs font-semibold text-blue-400 animate-pulse">
            {scanStepMessage || 'Waiting for biometric sensor input...'}
          </div>
        )}

        {/* Error Alert with Quick Switch */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-left space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-400">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Sensor Notice
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">{error}</p>
            
            <button
              type="button"
              onClick={() => { 
                setMode('simulated'); 
                setError(null);
                setTimeout(() => {
                  // Auto start optical scan on fallback click
                  setScanning(true);
                  setTimeout(() => {
                    const generatedHash = `FP_HASH_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
                    setScannedData({
                      hash: generatedHash,
                      quality: '98%',
                      timestamp: new Date().toLocaleTimeString(),
                      method: 'e-POS Optical Biometric Sensor'
                    });
                    setScanning(false);
                    if (onScanComplete) onScanComplete(generatedHash);
                  }, 1500);
                }, 50);
              }}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              Verify Instantly with Optical Scanner Simulator <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scan Results */}
        {scannedData && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left space-y-2 text-xs animate-fade-in">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Biometric Authentication Verified
            </div>
            <div className="space-y-1 text-[11px] font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Template Hash:</span>
                <span className="font-bold text-emerald-300">{scannedData.hash.slice(0, 22)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Quality Score:</span>
                <span className="text-emerald-400 font-bold">{scannedData.quality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Method:</span>
                <span className="text-slate-200">{scannedData.method}</span>
              </div>
            </div>
          </div>
        )}

        {!scanning && !scannedData && !error && (
          <p className="text-xs text-slate-400">
            {mode === 'simulated' && 'Click below to capture fingerprint on the optical sensor simulator.'}
            {mode === 'platform' && 'Click below to trigger your laptop/PC Windows Hello biometric reader.'}
            {mode === 'cross_device' && 'Click below to generate cross-device QR code.'}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            disabled={scanning}
            onClick={startScan}
            className={`flex-1 py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 text-white ${
              mode === 'simulated'
                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/25'
                : mode === 'platform'
                ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/25'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25'
            }`}
          >
            {scanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Reading Sensor...
              </>
            ) : scannedData ? (
              'Rescan Biometrics'
            ) : mode === 'simulated' ? (
              <>
                <Fingerprint className="w-4 h-4" /> Scan Optical Sensor Pad
              </>
            ) : mode === 'platform' ? (
              <>
                <Laptop className="w-4 h-4" /> Trigger Windows Hello (PC)
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" /> Trigger Phone QR Passkey
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
          >
            {scannedData ? 'Done' : 'Close'}
          </button>
        </div>

      </div>
    </Modal>
  );
};

export default FingerprintScannerModal;
