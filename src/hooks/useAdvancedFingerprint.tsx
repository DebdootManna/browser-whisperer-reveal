import { useState, useEffect } from "react";
import {
  getCanvasFingerprint,
  getWebGLFingerprint,
  getAudioFingerprint,
  detectFontsWithCanvas,
  getMediaDevices,
  detectAdBlocker,
  getDoNotTrack,
  getScreenOrientation,
  getCPUArchitecture,
  isPrivateMode,
  getDeviceMemory,
  getConnectionInfo,
  generateFingerprintHash,
  calculateUniquenessScore,
  calculatePrivacyScore,
  getRiskLevel,
  getProtectionLevel,
  WebGLInfo,
} from "@/utils/fingerprinting";

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

interface MediaDevicesInfo {
  audioInputs: number;
  audioOutputs: number;
  videoInputs: number;
  devices: MediaDeviceInfo[];
}

interface CanvasInfo {
  hash: string;
  data: string;
}

interface AudioInfo {
  hash: string;
  value: number;
}

interface FingerprintData {
  // Basic info
  userAgent: string;
  browserName: string;
  browserVersion: string;
  engineName: string;
  osName: string;
  osVersion: string;
  architecture: string;

  // Screen info
  screenWidth: number;
  screenHeight: number;
  screenAvailWidth: number;
  screenAvailHeight: number;
  screenColorDepth: number;
  screenPixelDepth: number;
  devicePixelRatio: number;
  screenOrientation: string;

  // Advanced fingerprints
  canvasHash: string;
  webglHash: string;
  audioHash: string;

  // Features
  fonts: string[];
  plugins: any[];
  timezone: string;
  timezoneOffset: number;
  language: string;
  languages: string[];

  // Privacy indicators
  doNotTrack: string;
  adBlocker: boolean;
  cookiesEnabled: boolean;
  privateMode: boolean;

  // Hardware
  hardwareConcurrency: number;
  deviceMemory: string | number;
  touchSupport: boolean;

  // Connection
  connectionInfo: any;

  // Scores
  uniquenessScore: number;
  privacyScore: number;
  fingerprintHash: string;
}

export const useAdvancedFingerprint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState("");

  // IP and location
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [ipLoading, setIpLoading] = useState(true);
  const [ipError, setIpError] = useState<string | null>(null);

  // Basic browser info
  const [browserInfo, setBrowserInfo] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [browserName, setBrowserName] = useState("");
  const [browserVersion, setBrowserVersion] = useState("");
  const [engineName, setEngineName] = useState("");

  // OS info
  const [osName, setOsName] = useState("");
  const [osVersion, setOsVersion] = useState("");
  const [architecture, setArchitecture] = useState("");

  // Screen info
  const [screenInfo, setScreenInfo] = useState<Record<string, unknown> | null>(
    null,
  );

  // Advanced fingerprints
  const [canvasFingerprint, setCanvasFingerprint] = useState<CanvasInfo | null>(
    null,
  );
  const [webglFingerprint, setWebglFingerprint] = useState<WebGLInfo | null>(
    null,
  );
  const [audioFingerprint, setAudioFingerprint] = useState<AudioInfo | null>(
    null,
  );

  // Features
  const [fonts, setFonts] = useState<string[]>([]);
  const [plugins, setPlugins] = useState<
    Array<{ name: string; description: string; filename: string }>
  >([]);
  const [mediaDevices, setMediaDevices] = useState<MediaDevicesInfo | null>(
    null,
  );

  // Privacy features
  const [doNotTrack, setDoNotTrack] = useState("");
  const [adBlocker, setAdBlocker] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);

  // Battery
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo | null>(null);
  const [batterySupported, setBatterySupported] = useState(true);

  // WebRTC
  const [localIPs, setLocalIPs] = useState<string[]>([]);

  // Scores
  const [uniquenessScore, setUniquenessScore] = useState(0);
  const [privacyScore, setPrivacyScore] = useState(0);
  const [fingerprintHash, setFingerprintHash] = useState("");
  const [riskLevel, setRiskLevel] = useState<{
    level: string;
    color: string;
    description: string;
  } | null>(null);
  const [protectionLevel, setProtectionLevel] = useState<{
    level: string;
    color: string;
    description: string;
  } | null>(null);

  // Complete fingerprint data
  const [fingerprintData, setFingerprintData] = useState<
    Partial<FingerprintData>
  >({});

  // Detect browser and OS
  const detectBrowserAndOS = () => {
    setCurrentTest("Detecting browser and OS...");
    const userAgent = navigator.userAgent;

    // Browser detection
    let detectedBrowser = "Unknown";
    let detectedVersion = "Unknown";
    let detectedEngine = "Unknown";

    if (
      userAgent.indexOf("Chrome") !== -1 &&
      userAgent.indexOf("Edg") === -1 &&
      userAgent.indexOf("OPR") === -1
    ) {
      detectedBrowser = "Chrome";
      const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
      if (match) detectedVersion = match[1];
      detectedEngine = "Blink";
    } else if (userAgent.indexOf("Firefox") !== -1) {
      detectedBrowser = "Firefox";
      const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
      if (match) detectedVersion = match[1];
      detectedEngine = "Gecko";
    } else if (
      userAgent.indexOf("Safari") !== -1 &&
      userAgent.indexOf("Chrome") === -1
    ) {
      detectedBrowser = "Safari";
      const match = userAgent.match(/Version\/(\d+\.\d+)/);
      if (match) detectedVersion = match[1];
      detectedEngine = "WebKit";
    } else if (userAgent.indexOf("Edg") !== -1) {
      detectedBrowser = "Edge";
      const match = userAgent.match(/Edg\/(\d+\.\d+)/);
      if (match) detectedVersion = match[1];
      detectedEngine = "Blink";
    } else if (userAgent.indexOf("OPR") !== -1) {
      detectedBrowser = "Opera";
      const match = userAgent.match(/OPR\/(\d+\.\d+)/);
      if (match) detectedVersion = match[1];
      detectedEngine = "Blink";
    }

    // OS detection
    let detectedOS = "Unknown";
    let detectedOSVersion = "Unknown";
    let detectedArch = "Unknown";

    if (userAgent.indexOf("Win") !== -1) {
      detectedOS = "Windows";
      if (userAgent.indexOf("Windows NT 10.0") !== -1)
        detectedOSVersion = "10/11";
      else if (userAgent.indexOf("Windows NT 6.3") !== -1)
        detectedOSVersion = "8.1";
      else if (userAgent.indexOf("Windows NT 6.2") !== -1)
        detectedOSVersion = "8";
      else if (userAgent.indexOf("Windows NT 6.1") !== -1)
        detectedOSVersion = "7";
    } else if (userAgent.indexOf("Mac") !== -1) {
      detectedOS = "macOS";
      const match = userAgent.match(/Mac OS X (\d+[._]\d+)/);
      if (match) detectedOSVersion = match[1].replace("_", ".");
    } else if (userAgent.indexOf("Android") !== -1) {
      detectedOS = "Android";
      const match = userAgent.match(/Android (\d+\.\d+)/);
      if (match) detectedOSVersion = match[1];
    } else if (userAgent.indexOf("Linux") !== -1) {
      detectedOS = "Linux";
    } else if (
      userAgent.indexOf("iOS") !== -1 ||
      userAgent.indexOf("iPhone") !== -1 ||
      userAgent.indexOf("iPad") !== -1
    ) {
      detectedOS = "iOS";
      const match = userAgent.match(/OS (\d+_\d+)/);
      if (match) detectedOSVersion = match[1].replace("_", ".");
    }

    detectedArch = getCPUArchitecture();

    setBrowserName(detectedBrowser);
    setBrowserVersion(detectedVersion);
    setEngineName(detectedEngine);
    setOsName(detectedOS);
    setOsVersion(detectedOSVersion);
    setArchitecture(detectedArch);

    const info = {
      userAgent,
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages || [],
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      vendor: navigator.vendor,
      online: navigator.onLine,
      pdfViewerEnabled: (navigator as any).pdfViewerEnabled,
    };

    setBrowserInfo(info);
    setProgress(10);
  };

  // Collect screen information
  const collectScreenInfo = () => {
    setCurrentTest("Collecting screen information...");
    const info = {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      devicePixelRatio: window.devicePixelRatio,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      orientation: getScreenOrientation(),
    };
    setScreenInfo(info);
    setProgress(20);
  };

  // Fetch IP information
  const fetchIPInfo = async () => {
    setCurrentTest("Fetching IP information...");
    setIpLoading(true);
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) throw new Error("Failed to fetch IP info");
      const data = await response.json();

      setIpInfo({
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        org: data.org,
        loc: `${data.latitude},${data.longitude}`,
        timezone: data.timezone,
      });
      setIpError(null);
    } catch (error) {
      console.error("Error fetching IP info:", error);
      setIpError("Failed to fetch IP information");
    } finally {
      setIpLoading(false);
      setProgress(30);
    }
  };

  // Canvas fingerprinting
  const testCanvasFingerprint = () => {
    setCurrentTest("Testing canvas fingerprint...");
    const canvas = getCanvasFingerprint();
    setCanvasFingerprint(canvas);
    setProgress(40);
  };

  // WebGL fingerprinting
  const testWebGLFingerprint = () => {
    setCurrentTest("Testing WebGL fingerprint...");
    const webgl = getWebGLFingerprint();
    setWebglFingerprint(webgl);
    setProgress(50);
  };

  // Audio fingerprinting
  const testAudioFingerprint = async () => {
    setCurrentTest("Testing audio fingerprint...");
    const audio = await getAudioFingerprint();
    setAudioFingerprint(audio);
    setProgress(60);
  };

  // Font detection
  const detectFonts = () => {
    setCurrentTest("Detecting installed fonts...");
    const detectedFonts = detectFontsWithCanvas();
    setFonts(detectedFonts);
    setProgress(70);
  };

  // Get plugins
  const getPlugins = () => {
    setCurrentTest("Detecting plugins...");
    if (!navigator.plugins) {
      setPlugins([]);
      return;
    }
    const pluginList = Array.from(navigator.plugins).map((plugin) => ({
      name: plugin.name,
      description: plugin.description,
      filename: plugin.filename,
    }));
    setPlugins(pluginList);
    setProgress(75);
  };

  // Media devices
  const testMediaDevices = async () => {
    setCurrentTest("Enumerating media devices...");
    const devices = await getMediaDevices();
    setMediaDevices(devices);
    setProgress(80);
  };

  // Privacy features
  const testPrivacyFeatures = async () => {
    setCurrentTest("Testing privacy features...");
    const dnt = getDoNotTrack();
    const adBlock = await detectAdBlocker();
    const privateBrowsing = await isPrivateMode();

    setDoNotTrack(dnt);
    setAdBlocker(adBlock);
    setPrivateMode(privateBrowsing);
    setProgress(85);
  };

  // Battery API
  const testBattery = async () => {
    setCurrentTest("Checking battery status...");
    if (!("getBattery" in navigator)) {
      setBatterySupported(false);
      setProgress(90);
      return;
    }

    try {
      const battery = await (
        navigator as {
          getBattery: () => Promise<{
            level: number;
            charging: boolean;
            chargingTime: number;
            dischargingTime: number;
            addEventListener: (event: string, handler: () => void) => void;
            removeEventListener: (event: string, handler: () => void) => void;
          }>;
        }
      ).getBattery();

      const updateBatteryInfo = () => {
        setBatteryInfo({
          level: battery.level * 100,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        });
      };

      updateBatteryInfo();

      battery.addEventListener("levelchange", updateBatteryInfo);
      battery.addEventListener("chargingchange", updateBatteryInfo);
    } catch (error) {
      console.error("Battery API error:", error);
      setBatterySupported(false);
    }
    setProgress(90);
  };

  // WebRTC local IP detection
  const testWebRTC = async () => {
    setCurrentTest("Testing WebRTC...");
    try {
      const RTCPeerConnection =
        window.RTCPeerConnection ||
        (
          window as unknown as {
            webkitRTCPeerConnection: typeof RTCPeerConnection;
          }
        ).webkitRTCPeerConnection ||
        (
          window as unknown as {
            mozRTCPeerConnection: typeof RTCPeerConnection;
          }
        ).mozRTCPeerConnection;

      if (!RTCPeerConnection) {
        setProgress(95);
        return;
      }

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      pc.createDataChannel("");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const ips: string[] = [];

      pc.onicecandidate = (e) => {
        if (!e.candidate) return;

        const candidateStr = e.candidate.candidate;
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
        const match = ipRegex.exec(candidateStr);

        if (match && match[1] !== "0.0.0.0" && !ips.includes(match[1])) {
          ips.push(match[1]);
          setLocalIPs([...ips]);
        }
      };

      setTimeout(() => {
        pc.close();
      }, 3000);
    } catch (error) {
      console.error("WebRTC error:", error);
    }
    setProgress(95);
  };

  // Calculate scores
  const calculateScores = () => {
    setCurrentTest("Calculating scores...");

    const data: Partial<FingerprintData> = {
      userAgent: browserInfo?.userAgent || "",
      browserName,
      browserVersion,
      engineName,
      osName,
      osVersion,
      architecture,
      screenWidth: screenInfo?.width || 0,
      screenHeight: screenInfo?.height || 0,
      screenAvailWidth: screenInfo?.availWidth || 0,
      screenAvailHeight: screenInfo?.availHeight || 0,
      screenColorDepth: screenInfo?.colorDepth || 0,
      screenPixelDepth: screenInfo?.pixelDepth || 0,
      devicePixelRatio: screenInfo?.devicePixelRatio || 1,
      screenOrientation: screenInfo?.orientation || "",
      canvasHash: canvasFingerprint?.hash || "",
      webglHash: webglFingerprint?.hash || "",
      audioHash: audioFingerprint?.hash || "",
      fonts,
      plugins,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      language: navigator.language,
      languages: Array.from(navigator.languages || []),
      doNotTrack,
      adBlocker,
      cookiesEnabled: navigator.cookieEnabled,
      privateMode,
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: getDeviceMemory(),
      touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      connectionInfo: getConnectionInfo(),
    };

    setFingerprintData(data);

    const hash = generateFingerprintHash(data);
    setFingerprintHash(hash);

    const uniqueness = calculateUniquenessScore({
      canvas: canvasFingerprint as unknown,
      webgl: webglFingerprint as unknown,
      audio: audioFingerprint as unknown,
      fonts: fonts as unknown,
      plugins: plugins as unknown,
      screen: screenInfo as unknown,
      timezone: { offset: new Date().getTimezoneOffset() } as unknown,
    } as Record<string, unknown>);
    setUniquenessScore(uniqueness);

    const privacy = calculatePrivacyScore({
      adBlocker: adBlocker as unknown,
      doNotTrack: doNotTrack as unknown,
      localIPs: localIPs as unknown,
      canvas: canvasFingerprint as unknown,
      cookiesEnabled: navigator.cookieEnabled as unknown,
      privateMode: privateMode as unknown,
    } as Record<string, unknown>);
    setPrivacyScore(privacy);

    const risk = getRiskLevel(uniqueness);
    setRiskLevel(risk);

    const protection = getProtectionLevel(privacy);
    setProtectionLevel(protection);

    setProgress(100);
    setCurrentTest("Complete!");
    setIsLoading(false);
  };

  // Run all tests
  useEffect(() => {
    const runTests = async () => {
      detectBrowserAndOS();
      await new Promise((resolve) => setTimeout(resolve, 200));

      collectScreenInfo();
      await new Promise((resolve) => setTimeout(resolve, 200));

      await fetchIPInfo();
      await new Promise((resolve) => setTimeout(resolve, 200));

      testCanvasFingerprint();
      await new Promise((resolve) => setTimeout(resolve, 200));

      testWebGLFingerprint();
      await new Promise((resolve) => setTimeout(resolve, 200));

      await testAudioFingerprint();
      await new Promise((resolve) => setTimeout(resolve, 200));

      detectFonts();
      await new Promise((resolve) => setTimeout(resolve, 200));

      getPlugins();
      await new Promise((resolve) => setTimeout(resolve, 200));

      await testMediaDevices();
      await new Promise((resolve) => setTimeout(resolve, 200));

      await testPrivacyFeatures();
      await new Promise((resolve) => setTimeout(resolve, 200));

      await testBattery();
      await new Promise((resolve) => setTimeout(resolve, 200));

      await testWebRTC();
      await new Promise((resolve) => setTimeout(resolve, 500));

      calculateScores();
    };

    runTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // Loading state
    isLoading,
    progress,
    currentTest,

    // IP info
    ipInfo,
    ipLoading,
    ipError,

    // Browser info
    browserInfo,
    browserName,
    browserVersion,
    engineName,

    // OS info
    osName,
    osVersion,
    architecture,

    // Screen info
    screenInfo,

    // Advanced fingerprints
    canvasFingerprint,
    webglFingerprint,
    audioFingerprint,

    // Features
    fonts,
    plugins,
    mediaDevices,

    // Privacy
    doNotTrack,
    adBlocker,
    privateMode,

    // Battery
    batteryInfo,
    batterySupported,

    // WebRTC
    localIPs,

    // Scores
    uniquenessScore,
    privacyScore,
    fingerprintHash,
    riskLevel,
    protectionLevel,

    // Complete data
    fingerprintData,

    // Helper data
    timeInfo: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      currentTime: new Date().toString(),
    },
    storageInfo: {
      cookiesEnabled: navigator.cookieEnabled,
      localStorageAvailable: (() => {
        try {
          localStorage.setItem("test", "test");
          localStorage.removeItem("test");
          return true;
        } catch (e) {
          return false;
        }
      })(),
      sessionStorageAvailable: (() => {
        try {
          sessionStorage.setItem("test", "test");
          sessionStorage.removeItem("test");
          return true;
        } catch (e) {
          return false;
        }
      })(),
    },
    featureInfo: {
      touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      webGLSupport: webglFingerprint !== null,
      canvasSupport: canvasFingerprint !== null,
      audioSupport:
        audioFingerprint !== null && audioFingerprint.hash !== "not-supported",
    },
    deviceMemory: getDeviceMemory(),
    connectionInfo: getConnectionInfo(),
  };
};
