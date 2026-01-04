// Advanced Fingerprinting Utilities

/**
 * Generate a simple hash from a string
 */
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Canvas Fingerprinting
 */
export function getCanvasFingerprint(): { hash: string; data: string } {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return { hash: "not-supported", data: "" };
    }

    canvas.width = 280;
    canvas.height = 60;

    // Draw text with specific styling
    ctx.textBaseline = "top";
    ctx.font = '14px "Arial"';
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);

    ctx.fillStyle = "#069";
    ctx.font = "11pt Arial";
    ctx.fillText("BrowserWhisperer 🔍", 2, 15);

    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.font = "bold 18pt Arial";
    ctx.fillText("Canvas Fingerprint", 4, 35);

    // Draw some shapes
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgb(0,255,255)";
    ctx.beginPath();
    ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    const dataURL = canvas.toDataURL();
    const hash = simpleHash(dataURL);

    return { hash, data: dataURL };
  } catch (error) {
    console.error("Canvas fingerprinting error:", error);
    return { hash: "error", data: "" };
  }
}

/**
 * WebGL Fingerprinting
 */
export interface WebGLInfo {
  vendor: string;
  renderer: string;
  version: string;
  shadingLanguageVersion: string;
  maxTextureSize: number;
  maxViewportDims: string;
  extensions: string[];
  hash: string;
}

export function getWebGLFingerprint(): WebGLInfo | null {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      return null;
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const vendor = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      : gl.getParameter(gl.VENDOR);
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);

    const extensions = gl.getSupportedExtensions() || [];
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);

    const info: WebGLInfo = {
      vendor: vendor || "Unknown",
      renderer: renderer || "Unknown",
      version: gl.getParameter(gl.VERSION) || "Unknown",
      shadingLanguageVersion:
        gl.getParameter(gl.SHADING_LANGUAGE_VERSION) || "Unknown",
      maxTextureSize,
      maxViewportDims: Array.isArray(maxViewportDims)
        ? maxViewportDims.join("x")
        : String(maxViewportDims),
      extensions,
      hash: "",
    };

    // Generate hash from all WebGL info
    const webglString = `${info.vendor}|${info.renderer}|${info.version}|${extensions.join(",")}`;
    info.hash = simpleHash(webglString);

    return info;
  } catch (error) {
    console.error("WebGL fingerprinting error:", error);
    return null;
  }
}

/**
 * Audio Context Fingerprinting
 */
export function getAudioFingerprint(): Promise<{
  hash: string;
  value: number;
}> {
  return new Promise((resolve) => {
    try {
      const AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContext) {
        resolve({ hash: "not-supported", value: 0 });
        return;
      }

      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const analyser = context.createAnalyser();
      const gainNode = context.createGain();
      const scriptProcessor = context.createScriptProcessor(4096, 1, 1);

      gainNode.gain.value = 0; // Mute the sound
      oscillator.type = "triangle";
      oscillator.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(gainNode);
      gainNode.connect(context.destination);

      scriptProcessor.onaudioprocess = function (event) {
        const output = event.outputBuffer.getChannelData(0);
        let sum = 0;

        for (let i = 0; i < output.length; i++) {
          sum += Math.abs(output[i]);
        }

        const audioValue = sum;
        const hash = simpleHash(audioValue.toString());

        oscillator.stop();
        scriptProcessor.disconnect();
        gainNode.disconnect();
        analyser.disconnect();
        oscillator.disconnect();
        context.close();

        resolve({ hash, value: audioValue });
      };

      oscillator.start(0);
    } catch (error) {
      console.error("Audio fingerprinting error:", error);
      resolve({ hash: "error", value: 0 });
    }
  });
}

/**
 * Enhanced Font Detection using Canvas
 */
export function detectFontsWithCanvas(): string[] {
  const baseFonts = ["monospace", "sans-serif", "serif"];
  const testString = "mmmmmmmmmmlli";
  const testSize = "72px";

  const fontList = [
    "Arial",
    "Arial Black",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Avant Garde",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Candara",
    "Century Gothic",
    "Comic Sans MS",
    "Consolas",
    "Courier",
    "Courier New",
    "Georgia",
    "Helvetica",
    "Helvetica Neue",
    "Impact",
    "Lucida Console",
    "Lucida Grande",
    "Lucida Sans Unicode",
    "Microsoft Sans Serif",
    "Monaco",
    "Palatino",
    "Palatino Linotype",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Light",
    "Segoe UI Semibold",
    "Segoe UI Symbol",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    "Wingdings",
    "Wingdings 2",
    "Wingdings 3",
    // Add more common fonts
    "Roboto",
    "Open Sans",
    "Ubuntu",
    "Cantarell",
    "DejaVu Sans",
    "Liberation Sans",
    "Noto Sans",
    "Droid Sans",
    "Apple Color Emoji",
  ];

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return [];
  }

  canvas.width = 500;
  canvas.height = 200;

  // Measure base fonts
  const baseFontWidths: { [key: string]: number } = {};
  baseFonts.forEach((baseFont) => {
    context.font = `${testSize} ${baseFont}`;
    baseFontWidths[baseFont] = context.measureText(testString).width;
  });

  // Detect fonts
  const detectedFonts: string[] = [];

  fontList.forEach((font) => {
    let detected = false;

    for (const baseFont of baseFonts) {
      context.font = `${testSize} '${font}', ${baseFont}`;
      const width = context.measureText(testString).width;

      if (width !== baseFontWidths[baseFont]) {
        detected = true;
        break;
      }
    }

    if (detected) {
      detectedFonts.push(font);
    }
  });

  return detectedFonts;
}

/**
 * Get Media Devices Information
 */
export async function getMediaDevices(): Promise<{
  audioInputs: number;
  audioOutputs: number;
  videoInputs: number;
  devices: MediaDeviceInfo[];
}> {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return {
        audioInputs: 0,
        audioOutputs: 0,
        videoInputs: 0,
        devices: [],
      };
    }

    const devices = await navigator.mediaDevices.enumerateDevices();

    return {
      audioInputs: devices.filter((d) => d.kind === "audioinput").length,
      audioOutputs: devices.filter((d) => d.kind === "audiooutput").length,
      videoInputs: devices.filter((d) => d.kind === "videoinput").length,
      devices: devices.map(
        (d) =>
          ({
            deviceId: d.deviceId ? "available" : "blocked",
            kind: d.kind,
            label: d.label || "Permission required",
            groupId: d.groupId || "",
          }) as MediaDeviceInfo,
      ),
    };
  } catch (error) {
    console.error("Media devices error:", error);
    return {
      audioInputs: 0,
      audioOutputs: 0,
      videoInputs: 0,
      devices: [],
    };
  }
}

/**
 * Detect Ad Blockers
 */
export async function detectAdBlocker(): Promise<boolean> {
  try {
    // Try to fetch a common ad resource
    await fetch(
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
      },
    );
    return false; // If fetch succeeds, no ad blocker
  } catch (_error) {
    return true; // If fetch fails, likely ad blocker is present
  }
}

/**
 * Check Do Not Track
 */
export function getDoNotTrack(): string {
  const dnt =
    navigator.doNotTrack ||
    (window as unknown as { doNotTrack?: string }).doNotTrack ||
    (navigator as unknown as { msDoNotTrack?: string }).msDoNotTrack;

  if (dnt === "1" || dnt === "yes") {
    return "Enabled";
  } else if (dnt === "0" || dnt === "no") {
    return "Disabled";
  }
  return "Not Set";
}

/**
 * Get Screen Orientation Info
 */
export function getScreenOrientation(): string {
  if (window.screen.orientation) {
    return `${window.screen.orientation.type} (${window.screen.orientation.angle}°)`;
  }

  // Fallback for older browsers
  const orientation = window.orientation;
  if (typeof orientation !== "undefined") {
    return orientation === 0 || orientation === 180 ? "portrait" : "landscape";
  }

  return "Unknown";
}

/**
 * Get CPU Architecture hints
 */
export function getCPUArchitecture(): string {
  const gl = document.createElement("canvas").getContext("webgl");
  if (!gl) return "Unknown";

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (!debugInfo) return "Unknown";

  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;

  if (
    renderer.includes("ARM") ||
    renderer.includes("Mali") ||
    renderer.includes("Adreno")
  ) {
    return "ARM";
  } else if (renderer.includes("Apple")) {
    return "Apple Silicon";
  } else if (
    renderer.includes("Intel") ||
    renderer.includes("AMD") ||
    renderer.includes("NVIDIA")
  ) {
    return "x86_64";
  }

  return "Unknown";
}

/**
 * Check if browser is in private/incognito mode
 */
export async function isPrivateMode(): Promise<boolean> {
  try {
    // Test using FileSystem API
    if ("storage" in navigator && "estimate" in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      if (estimate.quota && estimate.quota < 120000000) {
        return true; // Likely private mode
      }
    }

    // Test using IndexedDB
    return new Promise((resolve) => {
      const idb = indexedDB.open("test");
      idb.onerror = () => resolve(true);
      idb.onsuccess = () => {
        resolve(false);
        indexedDB.deleteDatabase("test");
      };
    });
  } catch (_error) {
    return false;
  }
}

/**
 * Get Device Memory (if available)
 */
export function getDeviceMemory(): number | string {
  const memory = (navigator as unknown as { deviceMemory?: number })
    .deviceMemory;
  return memory ? `${memory} GB` : "Not available";
}

/**
 * Get Connection Information
 */
export function getConnectionInfo(): {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
} {
  const connection =
    (
      navigator as unknown as {
        connection?: {
          effectiveType?: string;
          downlink?: number;
          rtt?: number;
          saveData?: boolean;
        };
        mozConnection?: {
          effectiveType?: string;
          downlink?: number;
          rtt?: number;
          saveData?: boolean;
        };
        webkitConnection?: {
          effectiveType?: string;
          downlink?: number;
          rtt?: number;
          saveData?: boolean;
        };
      }
    ).connection ||
    (
      navigator as unknown as {
        mozConnection?: {
          effectiveType?: string;
          downlink?: number;
          rtt?: number;
          saveData?: boolean;
        };
      }
    ).mozConnection ||
    (
      navigator as unknown as {
        webkitConnection?: {
          effectiveType?: string;
          downlink?: number;
          rtt?: number;
          saveData?: boolean;
        };
      }
    ).webkitConnection;

  if (!connection) {
    return {};
  }

  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };
}

/**
 * Generate a unique browser fingerprint hash
 */
export function generateFingerprintHash(data: Record<string, unknown>): string {
  const fingerprintString = JSON.stringify(data, null, 0);
  return simpleHash(fingerprintString);
}

/**
 * Calculate uniqueness score based on various factors
 * Returns a score between 0 (very common) and 100 (very unique)
 */
export function calculateUniquenessScore(
  fingerprintData: Record<string, unknown>,
): number {
  let score = 0;

  // Canvas fingerprint (25 points)
  if (
    fingerprintData.canvas &&
    fingerprintData.canvas.hash !== "not-supported"
  ) {
    score += 25;
  }

  // WebGL (20 points)
  if (fingerprintData.webgl && fingerprintData.webgl.hash) {
    score += 20;
  }

  // Audio (15 points)
  if (fingerprintData.audio && fingerprintData.audio.hash !== "not-supported") {
    score += 15;
  }

  // Fonts (15 points) - more fonts = more unique
  if (fingerprintData.fonts && fingerprintData.fonts.length > 20) {
    score += 15;
  } else if (fingerprintData.fonts && fingerprintData.fonts.length > 10) {
    score += 10;
  } else if (fingerprintData.fonts && fingerprintData.fonts.length > 0) {
    score += 5;
  }

  // Plugins (10 points)
  if (fingerprintData.plugins && fingerprintData.plugins.length > 0) {
    score += 10;
  }

  // Screen resolution uniqueness (10 points)
  const commonResolutions = [
    "1920x1080",
    "1366x768",
    "1536x864",
    "1440x900",
    "1280x720",
  ];
  const resolution = `${fingerprintData.screen?.width}x${fingerprintData.screen?.height}`;
  if (!commonResolutions.includes(resolution)) {
    score += 10;
  } else {
    score += 3;
  }

  // Timezone (5 points) - non-UTC timezone adds uniqueness
  if (fingerprintData.timezone && fingerprintData.timezone.offset !== 0) {
    score += 5;
  }

  return Math.min(score, 100);
}

/**
 * Calculate privacy/protection score
 * Returns a score between 0 (no protection) and 100 (maximum protection)
 */
export function calculatePrivacyScore(data: Record<string, unknown>): number {
  let score = 0;

  // Ad blocker detected (20 points)
  if (data.adBlocker === true) {
    score += 20;
  }

  // Do Not Track enabled (15 points)
  if (data.doNotTrack === "Enabled") {
    score += 15;
  }

  // WebRTC disabled/blocked (20 points)
  if (!data.localIPs || data.localIPs.length === 0) {
    score += 20;
  }

  // Canvas blocked (15 points)
  if (data.canvas?.hash === "not-supported" || data.canvas?.hash === "error") {
    score += 15;
  }

  // Third-party cookies disabled (10 points)
  if (!data.cookiesEnabled) {
    score += 10;
  }

  // Private mode (15 points)
  if (data.privateMode === true) {
    score += 15;
  }

  // Geolocation blocked (5 points)
  if (!data.geolocation || data.geolocation.blocked) {
    score += 5;
  }

  return Math.min(score, 100);
}

/**
 * Get risk level based on uniqueness score
 */
export function getRiskLevel(uniquenessScore: number): {
  level: "Low" | "Medium" | "High" | "Very High";
  color: string;
  description: string;
} {
  if (uniquenessScore >= 80) {
    return {
      level: "Very High",
      color: "text-red-600",
      description:
        "Your browser fingerprint is highly unique and easily trackable",
    };
  } else if (uniquenessScore >= 60) {
    return {
      level: "High",
      color: "text-orange-600",
      description: "Your browser fingerprint is quite unique and trackable",
    };
  } else if (uniquenessScore >= 35) {
    return {
      level: "Medium",
      color: "text-yellow-600",
      description: "Your browser fingerprint has moderate uniqueness",
    };
  } else {
    return {
      level: "Low",
      color: "text-green-600",
      description: "Your browser fingerprint is relatively common",
    };
  }
}

/**
 * Get protection level based on privacy score
 */
export function getProtectionLevel(privacyScore: number): {
  level: "Poor" | "Fair" | "Good" | "Excellent";
  color: string;
  description: string;
} {
  if (privacyScore >= 75) {
    return {
      level: "Excellent",
      color: "text-green-600",
      description: "You have strong privacy protections enabled",
    };
  } else if (privacyScore >= 50) {
    return {
      level: "Good",
      color: "text-blue-600",
      description: "You have decent privacy protections",
    };
  } else if (privacyScore >= 25) {
    return {
      level: "Fair",
      color: "text-orange-600",
      description: "Your privacy protection could be improved",
    };
  } else {
    return {
      level: "Poor",
      color: "text-red-600",
      description: "Your browser has minimal privacy protection",
    };
  }
}
