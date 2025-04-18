
import React from 'react';
import { useDeviceFingerprint } from '@/hooks/useDeviceFingerprint';
import FingerprintCard from '@/components/FingerprintCard';
import InfoRow from '@/components/InfoRow';
import { 
  Globe, 
  Monitor, 
  Clock, 
  Cpu, 
  Layers, 
  BatteryCharging, 
  Network, 
  PlugZap, 
  Languages, 
  HardDrive
} from 'lucide-react';

const Index = () => {
  const fingerprint = useDeviceFingerprint();

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Device Fingerprint Viewer</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what information your browser reveals to websites you visit
          </p>
        </header>

        <div className="grid gap-4">
          {/* IP and Geolocation */}
          <FingerprintCard title="IP Address & Geolocation" icon={<Globe />} defaultOpen={true}>
            {fingerprint.ipLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-pulse-subtle">Loading IP information...</div>
              </div>
            ) : fingerprint.ipError ? (
              <div className="text-destructive text-center py-4">{fingerprint.ipError}</div>
            ) : fingerprint.ipInfo && (
              <>
                <InfoRow 
                  label="IP Address" 
                  value={fingerprint.ipInfo.ip} 
                  tooltip="Your public IP address identifies your connection to the internet"
                />
                <InfoRow 
                  label="Location" 
                  value={`${fingerprint.ipInfo.city}, ${fingerprint.ipInfo.region}, ${fingerprint.ipInfo.country}`} 
                  tooltip="Your approximate geographical location based on your IP address"
                />
                <InfoRow 
                  label="Coordinates" 
                  value={fingerprint.ipInfo.loc} 
                  tooltip="Approximate latitude and longitude coordinates derived from your IP address"
                />
                <InfoRow 
                  label="ISP/Organization" 
                  value={fingerprint.ipInfo.org} 
                  tooltip="The Internet Service Provider or organization that owns your IP address"
                />
              </>
            )}
          </FingerprintCard>

          {/* Browser Information */}
          <FingerprintCard title="Browser Information" icon={<Monitor />}>
            <InfoRow 
              label="Browser" 
              value={`${fingerprint.browserName} ${fingerprint.browserVersion}`} 
              tooltip="The web browser you're currently using and its version number"
            />
            <InfoRow 
              label="Rendering Engine" 
              value={fingerprint.engineName} 
              tooltip="The browser engine that renders web content (e.g., Blink, Gecko, WebKit)"
            />
            <InfoRow 
              label="User Agent" 
              value={fingerprint.browserInfo.userAgent} 
              tooltip="The complete user-agent string sent with each HTTP request to identify your browser"
            />
            <InfoRow 
              label="Vendor" 
              value={fingerprint.browserInfo.vendor} 
              tooltip="The company that created your browser"
            />
            <InfoRow 
              label="Hardware Concurrency" 
              value={fingerprint.browserInfo.hardwareConcurrency} 
              tooltip="The number of logical processor cores available to your browser"
            />
          </FingerprintCard>

          {/* Operating System & Platform */}
          <FingerprintCard title="Operating System & Platform" icon={<Cpu />}>
            <InfoRow 
              label="Operating System" 
              value={`${fingerprint.osName} ${fingerprint.osVersion}`} 
              tooltip="Your device's operating system and version"
            />
            <InfoRow 
              label="Platform" 
              value={fingerprint.browserInfo.platform} 
              tooltip="The platform your browser is running on"
            />
            <InfoRow 
              label="Architecture" 
              value={fingerprint.architecture} 
              tooltip="The CPU architecture of your device (x86, x64, ARM, etc.)"
            />
            <InfoRow 
              label="Device Online" 
              value={fingerprint.browserInfo.online ? "Yes" : "No"} 
              tooltip="Whether your device currently has internet connectivity"
            />
          </FingerprintCard>

          {/* Screen Information */}
          <FingerprintCard title="Screen Information" icon={<Layers />}>
            <InfoRow 
              label="Screen Resolution" 
              value={`${fingerprint.screenInfo.width} × ${fingerprint.screenInfo.height}`} 
              tooltip="The total resolution of your screen in pixels"
            />
            <InfoRow 
              label="Available Screen" 
              value={`${fingerprint.screenInfo.availWidth} × ${fingerprint.screenInfo.availHeight}`} 
              tooltip="The available screen space, excluding taskbars and other system UI"
            />
            <InfoRow 
              label="Window Size" 
              value={`${fingerprint.screenInfo.windowWidth} × ${fingerprint.screenInfo.windowHeight}`} 
              tooltip="The size of your browser window in pixels"
            />
            <InfoRow 
              label="Pixel Ratio" 
              value={fingerprint.screenInfo.devicePixelRatio} 
              tooltip="The ratio between physical pixels and logical pixels (affects display sharpness)"
            />
            <InfoRow 
              label="Color Depth" 
              value={`${fingerprint.screenInfo.colorDepth} bit`} 
              tooltip="The number of bits used to represent the color of a single pixel"
            />
          </FingerprintCard>
          
          {/* Languages & Timezone */}
          <FingerprintCard title="Languages & Timezone" icon={<Languages />}>
            <InfoRow 
              label="Primary Language" 
              value={fingerprint.browserInfo.language} 
              tooltip="The primary language set in your browser"
            />
            <InfoRow 
              label="Accepted Languages" 
              value={fingerprint.browserInfo.languages ? fingerprint.browserInfo.languages.join(', ') : 'Not available'} 
              tooltip="The list of languages your browser accepts, in order of preference"
            />
            <InfoRow 
              label="Timezone" 
              value={fingerprint.timeInfo.timezone} 
              tooltip="Your local timezone name"
            />
            <InfoRow 
              label="Timezone Offset" 
              value={`UTC${fingerprint.timeInfo.timezoneOffset > 0 ? '-' : '+'}${Math.abs(fingerprint.timeInfo.timezoneOffset / 60)}`} 
              tooltip="The difference between your local time and UTC in hours"
            />
            <InfoRow 
              label="Current Time" 
              value={fingerprint.timeInfo.currentTime} 
              tooltip="Your current local time as reported by your browser"
            />
          </FingerprintCard>

          {/* Browser Features */}
          <FingerprintCard title="Browser Features" icon={<HardDrive />}>
            <InfoRow 
              label="Cookies Enabled" 
              value={fingerprint.storageInfo.cookiesEnabled ? "Yes" : "No"} 
              tooltip="Whether your browser allows websites to store cookies"
            />
            <InfoRow 
              label="Local Storage" 
              value={fingerprint.storageInfo.localStorageAvailable ? "Available" : "Not Available"} 
              tooltip="Whether websites can store persistent data in your browser's local storage"
            />
            <InfoRow 
              label="Session Storage" 
              value={fingerprint.storageInfo.sessionStorageAvailable ? "Available" : "Not Available"} 
              tooltip="Whether websites can store temporary data in your browser's session storage"
            />
            <InfoRow 
              label="Touch Support" 
              value={fingerprint.featureInfo.touchSupport ? "Yes" : "No"} 
              tooltip="Whether your device supports touch input"
            />
            <InfoRow 
              label="WebGL Support" 
              value={fingerprint.featureInfo.webGLSupport ? "Yes" : "No"} 
              tooltip="Whether your browser supports WebGL for 3D graphics"
            />
            <InfoRow 
              label="Canvas Support" 
              value={fingerprint.featureInfo.canvasSupport ? "Yes" : "No"} 
              tooltip="Whether your browser supports the HTML5 Canvas API for drawing"
            />
            <InfoRow 
              label="Audio API Support" 
              value={fingerprint.featureInfo.audioSupport ? "Yes" : "No"} 
              tooltip="Whether your browser supports the Web Audio API"
            />
            <InfoRow 
              label="Do Not Track" 
              value={fingerprint.browserInfo.doNotTrack === "1" ? "Enabled" : "Disabled"} 
              tooltip="Whether you've enabled the 'Do Not Track' request in your browser settings"
            />
          </FingerprintCard>

          {/* WebRTC Local IP */}
          <FingerprintCard title="WebRTC Local IP Detection" icon={<Network />}>
            {fingerprint.localIPs.length > 0 ? (
              <InfoRow 
                label="Local IP Addresses" 
                value={fingerprint.localIPs.join(', ')} 
                tooltip="Internal network IP addresses potentially exposed by WebRTC"
              />
            ) : (
              <div className="text-muted-foreground py-2">No local IP addresses detected via WebRTC</div>
            )}
            <div className="mt-2 text-xs text-muted-foreground">
              WebRTC can potentially expose your local network IP addresses to websites, even when using a VPN.
            </div>
          </FingerprintCard>

          {/* Battery Status */}
          <FingerprintCard title="Battery Status" icon={<BatteryCharging />}>
            {fingerprint.batterySupported ? (
              fingerprint.batteryInfo ? (
                <>
                  <InfoRow 
                    label="Battery Level" 
                    value={`${Math.round(fingerprint.batteryInfo.level)}%`} 
                    tooltip="Current battery charge level as a percentage"
                  />
                  <InfoRow 
                    label="Charging Status" 
                    value={fingerprint.batteryInfo.charging ? "Charging" : "Not Charging"} 
                    tooltip="Whether your device is currently charging"
                  />
                  {fingerprint.batteryInfo.charging && fingerprint.batteryInfo.chargingTime !== Infinity && (
                    <InfoRow 
                      label="Time Until Charged" 
                      value={`${Math.round(fingerprint.batteryInfo.chargingTime / 60)} minutes`} 
                      tooltip="Estimated time until battery is fully charged"
                    />
                  )}
                  {!fingerprint.batteryInfo.charging && fingerprint.batteryInfo.dischargingTime !== Infinity && (
                    <InfoRow 
                      label="Time Until Empty" 
                      value={`${Math.round(fingerprint.batteryInfo.dischargingTime / 60)} minutes`} 
                      tooltip="Estimated time until battery is fully discharged"
                    />
                  )}
                </>
              ) : (
                <div className="animate-pulse-subtle py-2">Loading battery information...</div>
              )
            ) : (
              <div className="text-muted-foreground py-2">Battery API not supported in this browser</div>
            )}
          </FingerprintCard>

          {/* Plugins & Fonts */}
          <FingerprintCard title="Plugins & Fonts" icon={<PlugZap />}>
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Detected Fonts</h4>
              {fingerprint.installedFonts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {fingerprint.installedFonts.map((font) => (
                    <div key={font} className="text-sm py-1 px-2 bg-secondary/30 rounded">
                      {font}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">No fonts detected</div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Browser Plugins</h4>
              {fingerprint.plugins.length > 0 ? (
                <div className="space-y-2">
                  {fingerprint.plugins.map((plugin, index) => (
                    <div key={index} className="text-sm py-1 px-2 bg-secondary/30 rounded">
                      {plugin.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">No plugins detected or not accessible</div>
              )}
            </div>
          </FingerprintCard>
        </div>

        <footer className="mt-10 mb-6 text-center text-sm text-muted-foreground">
          <p>This app runs completely in your browser. No data is collected or sent to any server.</p>
          <p className="mt-1">
            Made with privacy in mind. Learn more about browser fingerprinting to protect your online privacy.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
