import React from 'react';
import { useAdvancedFingerprint } from '@/hooks/useAdvancedFingerprint';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Download,
  Share2,
  Globe,
  Monitor,
  Cpu,
  Palette,
  Volume2,
  Type,
  Plug,
  Network,
  BatteryCharging,
  Smartphone,
  Lock,
  Unlock,
  RefreshCw,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InfoRow from '@/components/InfoRow';

const TestResults = () => {
  const fingerprint = useAdvancedFingerprint();
  const navigate = useNavigate();

  // Export fingerprint data as JSON
  const exportData = () => {
    const dataStr = JSON.stringify(fingerprint.fingerprintData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `browser-fingerprint-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Share results
  const shareResults = async () => {
    const shareText = `My Browser Fingerprint Analysis:\n\nUniqueness Score: ${fingerprint.uniquenessScore}/100\nPrivacy Score: ${fingerprint.privacyScore}/100\nFingerprint ID: ${fingerprint.fingerprintHash}\n\nTest your browser at: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Browser Fingerprint Results',
          text: shareText,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };

  if (fingerprint.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Testing Your Browser</CardTitle>
            <CardDescription>Running comprehensive fingerprint analysis...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{fingerprint.currentTest}</span>
                <span className="font-medium">{fingerprint.progress}%</span>
              </div>
              <Progress value={fingerprint.progress} className="h-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              {[
                { icon: Monitor, label: 'Browser Info', done: fingerprint.progress > 10 },
                { icon: Globe, label: 'IP Detection', done: fingerprint.progress > 30 },
                { icon: Palette, label: 'Canvas Test', done: fingerprint.progress > 40 },
                { icon: Cpu, label: 'WebGL Test', done: fingerprint.progress > 50 },
                { icon: Volume2, label: 'Audio Test', done: fingerprint.progress > 60 },
                { icon: Type, label: 'Font Detection', done: fingerprint.progress > 70 },
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${item.done ? 'bg-primary/10 border-primary/50' : 'bg-muted/30'}`}>
                  <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.done ? 'text-primary' : 'text-muted-foreground'}`} />
                  <p className="text-xs font-medium">{item.label}</p>
                  {item.done && <CheckCircle2 className="w-4 h-4 mx-auto mt-1 text-green-600" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    if (score >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <TrendingUp className="w-5 h-5" />;
    if (score >= 50) return <Minus className="w-5 h-5" />;
    return <TrendingDown className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={shareResults}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retest
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Your Browser Fingerprint Analysis
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              See how unique your browser is and how well you're protected from tracking
            </p>
          </div>
        </header>

        {/* Score Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Uniqueness Score */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-6 h-6 text-primary" />
                  <CardTitle>Uniqueness Score</CardTitle>
                </div>
                <Badge variant={fingerprint.uniquenessScore >= 60 ? 'destructive' : 'secondary'}>
                  {fingerprint.riskLevel?.level}
                </Badge>
              </div>
              <CardDescription>How unique and trackable your browser is</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted-foreground/20"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - fingerprint.uniquenessScore / 100)}`}
                      className={getScoreColor(100 - fingerprint.uniquenessScore)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getScoreColor(100 - fingerprint.uniquenessScore)}`}>
                      {fingerprint.uniquenessScore}
                    </span>
                    <span className="text-sm text-muted-foreground">out of 100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className={`w-4 h-4 ${fingerprint.riskLevel?.color}`} />
                  <span className={fingerprint.riskLevel?.color}>{fingerprint.riskLevel?.description}</span>
                </div>
                {fingerprint.uniquenessScore >= 60 && (
                  <p className="text-xs text-muted-foreground">
                    Your browser has a highly unique fingerprint. Consider using privacy extensions or Tor Browser.
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fingerprint ID:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{fingerprint.fingerprintHash}</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Score */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <CardTitle>Privacy Protection Score</CardTitle>
                </div>
                <Badge variant={fingerprint.privacyScore >= 50 ? 'default' : 'destructive'}>
                  {fingerprint.protectionLevel?.level}
                </Badge>
              </div>
              <CardDescription>How well your browser protects your privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted-foreground/20"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - fingerprint.privacyScore / 100)}`}
                      className={getScoreColor(fingerprint.privacyScore)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getScoreColor(fingerprint.privacyScore)}`}>
                      {fingerprint.privacyScore}
                    </span>
                    <span className="text-sm text-muted-foreground">out of 100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {fingerprint.privacyScore >= 50 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span className={fingerprint.protectionLevel?.color}>{fingerprint.protectionLevel?.description}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ad Blocker:</span>
                  <Badge variant={fingerprint.adBlocker ? 'default' : 'secondary'}>
                    {fingerprint.adBlocker ? 'Detected' : 'Not Detected'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Do Not Track:</span>
                  <Badge variant={fingerprint.doNotTrack === 'Enabled' ? 'default' : 'secondary'}>
                    {fingerprint.doNotTrack}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Private Mode:</span>
                  <Badge variant={fingerprint.privateMode ? 'default' : 'secondary'}>
                    {fingerprint.privateMode ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <Tabs defaultValue="fingerprints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="fingerprints">Fingerprints</TabsTrigger>
            <TabsTrigger value="browser">Browser & OS</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>

          {/* Fingerprints Tab */}
          <TabsContent value="fingerprints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Canvas Fingerprint
                </CardTitle>
                <CardDescription>Unique identifier based on how your browser renders graphics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Canvas Hash:</span>
                  <code className="text-xs bg-muted px-3 py-1 rounded font-mono">{fingerprint.canvasFingerprint?.hash}</code>
                </div>
                {fingerprint.canvasFingerprint?.data && (
                  <div className="border rounded-lg overflow-hidden">
                    <img src={fingerprint.canvasFingerprint.data} alt="Canvas fingerprint" className="w-full" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Canvas fingerprinting exploits tiny differences in how browsers render graphics based on hardware and drivers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  WebGL Fingerprint
                </CardTitle>
                <CardDescription>Graphics card and driver information exposed by WebGL</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {fingerprint.webglFingerprint ? (
                  <>
                    <InfoRow label="WebGL Hash" value={fingerprint.webglFingerprint.hash} />
                    <InfoRow label="Vendor" value={fingerprint.webglFingerprint.vendor} />
                    <InfoRow label="Renderer" value={fingerprint.webglFingerprint.renderer} />
                    <InfoRow label="Version" value={fingerprint.webglFingerprint.version} />
                    <InfoRow label="Shading Language" value={fingerprint.webglFingerprint.shadingLanguageVersion} />
                    <InfoRow label="Max Texture Size" value={fingerprint.webglFingerprint.maxTextureSize.toString()} />
                    <Separator />
                    <div>
                      <p className="text-sm font-medium mb-2">Extensions ({fingerprint.webglFingerprint.extensions.length}):</p>
                      <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto text-xs">
                        {fingerprint.webglFingerprint.extensions.map((ext, idx) => (
                          <div key={idx} className="bg-muted px-2 py-1 rounded">{ext}</div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">WebGL not supported</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Audio Fingerprint
                </CardTitle>
                <CardDescription>Unique audio processing characteristics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {fingerprint.audioFingerprint && fingerprint.audioFingerprint.hash !== 'not-supported' ? (
                  <>
                    <InfoRow label="Audio Hash" value={fingerprint.audioFingerprint.hash} />
                    <InfoRow label="Audio Value" value={fingerprint.audioFingerprint.value.toFixed(6)} />
                    <p className="text-xs text-muted-foreground">
                      Audio context fingerprinting detects tiny differences in how audio is processed.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Audio fingerprinting not supported</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Installed Fonts
                </CardTitle>
                <CardDescription>{fingerprint.fonts.length} fonts detected</CardDescription>
              </CardHeader>
              <CardContent>
                {fingerprint.fonts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                    {fingerprint.fonts.map((font, idx) => (
                      <div key={idx} className="text-sm py-1 px-2 bg-secondary/30 rounded truncate" title={font}>
                        {font}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No fonts detected</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Browser & OS Tab */}
          <TabsContent value="browser" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Browser Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Browser" value={`${fingerprint.browserName} ${fingerprint.browserVersion}`} />
                <InfoRow label="Engine" value={fingerprint.engineName} />
                <InfoRow label="User Agent" value={fingerprint.browserInfo?.userAgent || ''} />
                <InfoRow label="Vendor" value={fingerprint.browserInfo?.vendor || ''} />
                <InfoRow label="Platform" value={fingerprint.browserInfo?.platform || ''} />
                <InfoRow label="Language" value={fingerprint.browserInfo?.language || ''} />
                <InfoRow label="Languages" value={fingerprint.browserInfo?.languages?.join(', ') || ''} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Operating System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="OS" value={`${fingerprint.osName} ${fingerprint.osVersion}`} />
                <InfoRow label="Architecture" value={fingerprint.architecture} />
                <InfoRow label="Device Memory" value={fingerprint.deviceMemory?.toString() || 'Not available'} />
                <InfoRow label="Hardware Concurrency" value={fingerprint.browserInfo?.hardwareConcurrency?.toString() || '0'} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  IP & Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {fingerprint.ipInfo ? (
                  <>
                    <InfoRow label="IP Address" value={fingerprint.ipInfo.ip} />
                    <InfoRow label="Location" value={`${fingerprint.ipInfo.city}, ${fingerprint.ipInfo.region}, ${fingerprint.ipInfo.country}`} />
                    <InfoRow label="Coordinates" value={fingerprint.ipInfo.loc} />
                    <InfoRow label="ISP" value={fingerprint.ipInfo.org} />
                    <InfoRow label="Timezone" value={fingerprint.timeInfo.timezone} />
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Loading IP information...</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hardware Tab */}
          <TabsContent value="hardware" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Screen & Display
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Screen Resolution" value={`${fingerprint.screenInfo?.width} × ${fingerprint.screenInfo?.height}`} />
                <InfoRow label="Available Screen" value={`${fingerprint.screenInfo?.availWidth} × ${fingerprint.screenInfo?.availHeight}`} />
                <InfoRow label="Window Size" value={`${fingerprint.screenInfo?.windowWidth} × ${fingerprint.screenInfo?.windowHeight}`} />
                <InfoRow label="Pixel Ratio" value={fingerprint.screenInfo?.devicePixelRatio?.toString() || '1'} />
                <InfoRow label="Color Depth" value={`${fingerprint.screenInfo?.colorDepth} bit`} />
                <InfoRow label="Orientation" value={fingerprint.screenInfo?.orientation || 'Unknown'} />
                <InfoRow label="Touch Support" value={fingerprint.featureInfo.touchSupport ? 'Yes' : 'No'} />
                <InfoRow label="Max Touch Points" value={fingerprint.browserInfo?.maxTouchPoints?.toString() || '0'} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Media Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {fingerprint.mediaDevices ? (
                  <>
                    <InfoRow label="Audio Inputs" value={fingerprint.mediaDevices.audioInputs.toString()} />
                    <InfoRow label="Audio Outputs" value={fingerprint.mediaDevices.audioOutputs.toString()} />
                    <InfoRow label="Video Inputs" value={fingerprint.mediaDevices.videoInputs.toString()} />
                    {fingerprint.mediaDevices.devices.length > 0 && (
                      <div className="pt-2">
                        <p className="text-sm font-medium mb-2">Detected Devices:</p>
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                          {fingerprint.mediaDevices.devices.map((device, idx) => (
                            <div key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                              {device.kind}: {device.label || 'Permission required'}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Media devices information not available</p>
                )}
              </CardContent>
            </Card>

            {fingerprint.batterySupported && fingerprint.batteryInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BatteryCharging className="w-5 h-5" />
                    Battery Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InfoRow label="Battery Level" value={`${Math.round(fingerprint.batteryInfo.level)}%`} />
                  <InfoRow label="Charging" value={fingerprint.batteryInfo.charging ? 'Yes' : 'No'} />
                  {fingerprint.batteryInfo.charging && fingerprint.batteryInfo.chargingTime !== Infinity && (
                    <InfoRow label="Time Until Charged" value={`${Math.round(fingerprint.batteryInfo.chargingTime / 60)} min`} />
                  )}
                  {!fingerprint.batteryInfo.charging && fingerprint.batteryInfo.dischargingTime !== Infinity && (
                    <InfoRow label="Time Until Empty" value={`${Math.round(fingerprint.batteryInfo.dischargingTime / 60)} min`} />
                  )}
                </CardContent>
              </Card>
            )}

            {fingerprint.plugins.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plug className="w-5 h-5" />
                    Browser Plugins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {fingerprint.plugins.map((plugin, idx) => (
                      <div key={idx} className="text-sm py-1 px-2 bg-secondary/30 rounded">
                        {plugin.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Privacy & Security Tab */}
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ad Blocker Detected</span>
                  {fingerprint.adBlocker ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Do Not Track</span>
                  <Badge variant={fingerprint.doNotTrack === 'Enabled' ? 'default' : 'secondary'}>
                    {fingerprint.doNotTrack}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Private/Incognito Mode</span>
                  {fingerprint.privateMode ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cookies Enabled</span>
                  {fingerprint.browserInfo?.cookiesEnabled ? (
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <XCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  WebRTC Local IPs
                </CardTitle>
                <CardDescription>
                  WebRTC can potentially leak your local IP addresses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {fingerprint.localIPs.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-orange-900 dark:text-orange-100">WebRTC Leak Detected</p>
                        <p className="text-orange-700 dark:text-orange-300 mt-1">
                          Local IP addresses exposed: {fingerprint.localIPs.join(', ')}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Consider using a browser extension to block WebRTC or disable it in your browser settings.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-900 dark:text-green-100">No WebRTC Leak Detected</p>
                      <p className="text-green-700 dark:text-green-300 mt-1">
                        Your local IP addresses are not exposed via WebRTC
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Storage & Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Local Storage" value={fingerprint.storageInfo.localStorageAvailable ? 'Available' : 'Blocked'} />
                <InfoRow label="Session Storage" value={fingerprint.storageInfo.sessionStorageAvailable ? 'Available' : 'Blocked'} />
                <InfoRow label="WebGL Support" value={fingerprint.featureInfo.webGLSupport ? 'Yes' : 'No'} />
                <InfoRow label="Canvas Support" value={fingerprint.featureInfo.canvasSupport ? 'Yes' : 'No'} />
                <InfoRow label="Audio API Support" value={fingerprint.featureInfo.audioSupport ? 'Yes' : 'No'} />
              </CardContent>
            </Card>

            {fingerprint.connectionInfo && Object.keys(fingerprint.connectionInfo).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Connection Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {fingerprint.connectionInfo.effectiveType && (
                    <InfoRow label="Connection Type" value={fingerprint.connectionInfo.effectiveType} />
                  )}
                  {fingerprint.connectionInfo.downlink && (
                    <InfoRow label="Downlink Speed" value={`${fingerprint.connectionInfo.downlink} Mbps`} />
                  )}
                  {fingerprint.connectionInfo.rtt && (
                    <InfoRow label="Round Trip Time" value={`${fingerprint.connectionInfo.rtt} ms`} />
                  )}
                  {typeof fingerprint.connectionInfo.saveData !== 'undefined' && (
                    <InfoRow label="Data Saver" value={fingerprint.connectionInfo.saveData ? 'Enabled' : 'Disabled'} />
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Recommendations */}
        <Card className="mt-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Privacy Recommendations
            </CardTitle>
            <CardDescription>Improve your privacy and reduce browser fingerprinting</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {fingerprint.uniquenessScore >= 60 && (
                <li className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Your fingerprint is highly unique</p>
                    <p className="text-sm text-muted-foreground">
                      Consider using privacy-focused browsers like Tor Browser or Brave with strict fingerprint protection
                    </p>
                  </div>
                </li>
              )}
              {!fingerprint.adBlocker && (
                <li className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Install an ad blocker</p>
                    <p className="text-sm text-muted-foreground">
                      Use uBlock Origin or Privacy Badger to block trackers and ads
                    </p>
                  </div>
                </li>
              )}
              {fingerprint.localIPs.length > 0 && (
                <li className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">WebRTC is leaking your local IP</p>
                    <p className="text-sm text-muted-foreground">
                      Install a WebRTC blocker extension or disable WebRTC in your browser
                    </p>
                  </div>
                </li>
              )}
              {fingerprint.doNotTrack !== 'Enabled' && (
                <li className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Enable Do Not Track</p>
                    <p className="text-sm text-muted-foreground">
                      Turn on Do Not Track in your browser settings to signal websites not to track you
                    </p>
                  </div>
                </li>
              )}
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Use a VPN</p>
                  <p className="text-sm text-muted-foreground">
                    A VPN can hide your IP address and location from websites
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Clear cookies regularly</p>
                  <p className="text-sm text-muted-foreground">
                    Regularly clear your browser cookies and site data to prevent long-term tracking
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-10 mb-6 text-center text-sm text-muted-foreground">
          <p>All tests run completely in your browser. No data is collected or transmitted to any server.</p>
          <p className="mt-2">
            Learn more about protecting your privacy at{' '}
            <a href="https://www.eff.org/issues/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              EFF.org
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TestResults;
