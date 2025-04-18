
import { useState, useEffect } from 'react';

interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
  loc: string;
  timezone: string;
}

interface BatteryInfo {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

export const useDeviceFingerprint = () => {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [ipLoading, setIpLoading] = useState<boolean>(true);
  const [ipError, setIpError] = useState<string | null>(null);
  const [localIPs, setLocalIPs] = useState<string[]>([]);
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo | null>(null);
  const [batterySupported, setBatterySupported] = useState<boolean>(true);
  const [installedFonts, setInstalledFonts] = useState<string[]>([]);
  
  // Browser info
  const userAgent = navigator.userAgent;
  const browserInfo = {
    userAgent,
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages,
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints,
    vendor: navigator.vendor,
    online: navigator.onLine,
    pdfViewerEnabled: navigator.pdfViewerEnabled,
  };

  // Browser and OS detection
  const getBrowserInfo = () => {
    let browserName = "Unknown";
    let browserVersion = "Unknown";
    let engineName = "Unknown";
    
    // Chrome
    if (userAgent.indexOf("Chrome") !== -1 && userAgent.indexOf("Edg") === -1 && userAgent.indexOf("OPR") === -1) {
      browserName = "Chrome";
      const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
      if (match) browserVersion = match[1];
      engineName = "Blink";
    } 
    // Firefox
    else if (userAgent.indexOf("Firefox") !== -1) {
      browserName = "Firefox";
      const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
      if (match) browserVersion = match[1];
      engineName = "Gecko";
    } 
    // Safari
    else if (userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1) {
      browserName = "Safari";
      const match = userAgent.match(/Version\/(\d+\.\d+)/);
      if (match) browserVersion = match[1];
      engineName = "WebKit";
    } 
    // Edge
    else if (userAgent.indexOf("Edg") !== -1) {
      browserName = "Edge";
      const match = userAgent.match(/Edg\/(\d+\.\d+)/);
      if (match) browserVersion = match[1];
      engineName = "Blink";
    }
    // Opera
    else if (userAgent.indexOf("OPR") !== -1) {
      browserName = "Opera";
      const match = userAgent.match(/OPR\/(\d+\.\d+)/);
      if (match) browserVersion = match[1];
      engineName = "Blink";
    }
    
    return { browserName, browserVersion, engineName };
  };

  const getOSInfo = () => {
    let osName = "Unknown";
    let osVersion = "Unknown";
    let architecture = "Unknown";
    
    if (userAgent.indexOf("Win") !== -1) {
      osName = "Windows";
      if (userAgent.indexOf("Windows NT 10.0") !== -1) osVersion = "10";
      else if (userAgent.indexOf("Windows NT 6.3") !== -1) osVersion = "8.1";
      else if (userAgent.indexOf("Windows NT 6.2") !== -1) osVersion = "8";
      else if (userAgent.indexOf("Windows NT 6.1") !== -1) osVersion = "7";
    } else if (userAgent.indexOf("Mac") !== -1) {
      osName = "macOS";
      const match = userAgent.match(/Mac OS X (\d+[._]\d+)/);
      if (match) osVersion = match[1].replace("_", ".");
    } else if (userAgent.indexOf("Android") !== -1) {
      osName = "Android";
      const match = userAgent.match(/Android (\d+\.\d+)/);
      if (match) osVersion = match[1];
    } else if (userAgent.indexOf("Linux") !== -1) {
      osName = "Linux";
    } else if (userAgent.indexOf("iOS") !== -1 || userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) {
      osName = "iOS";
      const match = userAgent.match(/OS (\d+_\d+)/);
      if (match) osVersion = match[1].replace("_", ".");
    }
    
    // Try to determine architecture
    if (userAgent.indexOf("x64") !== -1 || userAgent.indexOf("WOW64") !== -1 || userAgent.indexOf("x86_64") !== -1) {
      architecture = "x64";
    } else if (userAgent.indexOf("x86") !== -1 || userAgent.indexOf("i686") !== -1) {
      architecture = "x86";
    } else if (userAgent.indexOf("ARM") !== -1 || userAgent.indexOf("arm") !== -1) {
      architecture = "ARM";
    }
    
    return { osName, osVersion, architecture };
  };

  // Screen info
  const screenInfo = {
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
    devicePixelRatio: window.devicePixelRatio,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  };

  // Storage support
  const storageInfo = {
    cookiesEnabled: navigator.cookieEnabled,
    localStorageAvailable: (() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    })(),
    sessionStorageAvailable: (() => {
      try {
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    })(),
  };

  // Time and location
  const timeInfo = {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    currentTime: new Date().toString(),
  };

  // Plugin detection
  const getPlugins = () => {
    if (!navigator.plugins) return [];
    return Array.from(navigator.plugins).map(plugin => ({
      name: plugin.name,
      description: plugin.description,
      filename: plugin.filename,
    }));
  };

  // Feature detection
  const featureInfo = {
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    webGLSupport: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    })(),
    canvasSupport: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
      } catch (e) {
        return false;
      }
    })(),
    audioSupport: (() => {
      try {
        return !!(window.AudioContext || window.webkitAudioContext);
      } catch (e) {
        return false;
      }
    })(),
  };

  // Fetch IP info
  useEffect(() => {
    const fetchIpInfo = async () => {
      setIpLoading(true);
      try {
        const response = await fetch('https://ipinfo.io/json?token=15fcf5dae1f3a7');
        if (!response.ok) throw new Error('Failed to fetch IP info');
        const data = await response.json();
        setIpInfo(data);
        setIpError(null);
      } catch (error) {
        console.error('Error fetching IP info:', error);
        setIpError('Failed to fetch IP information');
      } finally {
        setIpLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  // Battery API
  useEffect(() => {
    const getBatteryInfo = async () => {
      if (!('getBattery' in navigator)) {
        setBatterySupported(false);
        return;
      }

      try {
        const battery = await (navigator as any).getBattery();
        
        const updateBatteryInfo = () => {
          setBatteryInfo({
            level: battery.level * 100,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
          });
        };

        updateBatteryInfo();

        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);
        battery.addEventListener('chargingtimechange', updateBatteryInfo);
        battery.addEventListener('dischargingtimechange', updateBatteryInfo);

        return () => {
          battery.removeEventListener('levelchange', updateBatteryInfo);
          battery.removeEventListener('chargingchange', updateBatteryInfo);
          battery.removeEventListener('chargingtimechange', updateBatteryInfo);
          battery.removeEventListener('dischargingtimechange', updateBatteryInfo);
        };
      } catch (error) {
        console.error('Battery API error:', error);
        setBatterySupported(false);
      }
    };

    getBatteryInfo();
  }, []);

  // WebRTC local IP detection
  useEffect(() => {
    const getLocalIPs = () => {
      const RTCPeerConnection = window.RTCPeerConnection || (window as any).webkitRTCPeerConnection || (window as any).mozRTCPeerConnection;
      
      if (!RTCPeerConnection) {
        return;
      }
      
      const pc = new RTCPeerConnection({
        iceServers: [],
      });
      
      pc.createDataChannel('');
      pc.createOffer().then(offer => pc.setLocalDescription(offer));
      
      pc.onicecandidate = (e) => {
        if (!e.candidate) return;
        
        const candidateStr = e.candidate.candidate;
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
        const match = ipRegex.exec(candidateStr);
        
        if (match && match[1] !== '0.0.0.0') {
          const ip = match[1];
          if (!localIPs.includes(ip)) {
            setLocalIPs(prev => [...prev, ip]);
          }
        }
      };
    };
    
    getLocalIPs();
  }, [localIPs]);

  // Font detection
  useEffect(() => {
    const detectFonts = async () => {
      if (!document.fonts || !document.fonts.check) {
        return;
      }
      
      const fontList = [
        'Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia',
        'Comic Sans MS', 'Impact', 'Tahoma', 'Trebuchet MS', 'Webdings',
        'Calibri', 'Helvetica', 'Segoe UI', 'Roboto', 'Open Sans'
      ];
      
      const detectedFonts = [];
      
      for (const font of fontList) {
        if (await document.fonts.check(`12px "${font}"`)) {
          detectedFonts.push(font);
        }
      }
      
      setInstalledFonts(detectedFonts);
    };
    
    detectFonts();
  }, []);

  return {
    ipInfo,
    ipLoading,
    ipError,
    browserInfo,
    ...getBrowserInfo(),
    ...getOSInfo(),
    screenInfo,
    storageInfo,
    timeInfo,
    plugins: getPlugins(),
    featureInfo,
    localIPs,
    batteryInfo,
    batterySupported,
    installedFonts,
  };
};
