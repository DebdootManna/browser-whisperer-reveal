# Browser Fingerprint Test

<div align="center">

![Browser Fingerprint Test](https://img.shields.io/badge/Privacy-First-green)
![Client Side](https://img.shields.io/badge/Client%20Side-100%25-blue)
![No Tracking](https://img.shields.io/badge/Tracking-None-red)

A comprehensive, privacy-focused browser fingerprinting test tool inspired by [EFF's Cover Your Tracks](https://coveryourtracks.eff.org/), [BrowserScan.net](https://www.browserscan.net/), and [BrowserLeaks.com](https://browserleaks.com/).

[Live Demo](#) | [Features](#features) | [Getting Started](#getting-started)

</div>

---

## 🎯 Overview

**Browser Fingerprint Test** is a modern, comprehensive web application that reveals the identifiable information your browser shares with websites. Unlike simple fingerprinting tools, this provides in-depth analysis with scoring, recommendations, and multiple testing modes.

### What Makes This Different?

- 🎨 **Modern UI/UX** - Beautiful, responsive interface with dark mode support
- 📊 **Uniqueness Score** - See how unique your browser fingerprint is (0-100)
- 🛡️ **Privacy Score** - Get rated on your privacy protection level
- 🔍 **15+ Advanced Tests** - Canvas, WebGL, Audio, Fonts, WebRTC, and more
- 💡 **Smart Recommendations** - Get personalized privacy improvement suggestions
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🌙 **Dark Mode** - Easy on the eyes
- 💯 **100% Client-Side** - All tests run in your browser, zero data collection

---

## ✨ Features

### Advanced Fingerprinting Tests

#### 🎨 Canvas Fingerprinting
- Detects unique graphics rendering characteristics
- Generates visual hash of canvas output
- Shows how hardware/drivers affect rendering

#### 🖥️ WebGL Fingerprinting
- Identifies GPU vendor and renderer
- Lists WebGL extensions
- Reveals graphics capabilities and limits

#### 🔊 Audio Context Fingerprinting
- Tests audio processing uniqueness
- Generates audio fingerprint hash
- Detects audio API differences

#### 🔤 Font Detection
- Scans for 40+ common fonts using canvas
- Identifies system-specific fonts
- Shows which fonts make you unique

#### 🌐 WebRTC Leak Detection
- Tests for local IP address leaks
- Checks if VPN is properly hiding IPs
- Identifies WebRTC vulnerabilities

#### 📡 Network & Connection
- IP address and geolocation lookup
- ISP information
- Connection speed and type detection

### Comprehensive Analysis

#### 📊 Uniqueness Score (0-100)
Calculates how unique your browser is based on:
- Canvas fingerprint uniqueness
- WebGL configuration
- Audio processing signature
- Installed fonts
- Screen resolution
- Timezone and language settings

**Score Interpretation:**
- 0-35: Low uniqueness (common fingerprint)
- 35-60: Medium uniqueness
- 60-80: High uniqueness (easily trackable)
- 80-100: Very high uniqueness (highly identifiable)

#### 🛡️ Privacy Protection Score (0-100)
Rates your privacy protections based on:
- Ad blocker detection
- Do Not Track status
- WebRTC leak protection
- Private/Incognito mode
- Canvas fingerprinting blocking
- Cookie settings

**Protection Level:**
- 0-25: Poor protection
- 25-50: Fair protection
- 50-75: Good protection
- 75-100: Excellent protection

### Detailed Information Collected

#### Browser & System
- Browser name, version, and engine
- Operating system and version
- CPU architecture
- Platform information
- User agent string

#### Hardware Details
- Screen resolution and available space
- Color depth and pixel ratio
- Device pixel ratio
- Hardware concurrency (CPU cores)
- Device memory (if available)
- Touch support and max touch points

#### Media & Devices
- Audio input/output devices
- Video input devices
- Media device enumeration
- Permissions status

#### Privacy & Security
- Battery status (if available)
- Cookies enabled/disabled
- Local/Session storage availability
- Do Not Track setting
- Ad blocker detection
- Private browsing mode detection
- Geolocation permissions

#### Features & Capabilities
- WebGL support and version
- Canvas API support
- Audio API support
- Touch support
- PDF viewer status
- Installed browser plugins

### User Interface

#### 🏠 Landing Page
- Overview of browser fingerprinting
- Feature highlights
- Privacy guarantees
- Quick test start

#### 🧪 Test Results Page
- Interactive loading progress
- Real-time test execution
- Comprehensive score displays with circular progress
- Four detailed tabs:
  - **Fingerprints**: Canvas, WebGL, Audio, Fonts
  - **Browser & OS**: Browser info, OS details, IP & location
  - **Hardware**: Screen, media devices, battery, plugins
  - **Privacy & Security**: Privacy features, WebRTC leaks, storage, connection

#### 📋 Classic Mode
- Legacy detailed view
- Expandable sections
- All information in accordion format
- Suitable for technical users

### Export & Share

- 📥 **Export Results** - Download fingerprint data as JSON
- 🔗 **Share Results** - Share your scores (no personal data shared)
- 🔄 **Retest** - Easy one-click retest functionality

---

## 🚀 Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Radix UI** - Unstyled, accessible component primitives
- **React Router** - Client-side routing
- **Lucide Icons** - Consistent, beautiful icons
- **WebRTC API** - Local IP detection
- **Canvas API** - Graphics fingerprinting
- **WebGL API** - GPU fingerprinting
- **Web Audio API** - Audio fingerprinting
- **Battery API** - Battery status
- **MediaDevices API** - Device enumeration

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/DebdootManna/browser-whisperer-reveal.git

# Navigate to project directory
cd browser-whisperer-reveal

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
browser-whisperer-reveal/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── FingerprintCard.tsx
│   │   ├── InfoRow.tsx
│   │   └── InfoTooltip.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useDeviceFingerprint.tsx
│   │   └── useAdvancedFingerprint.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── TestResults.tsx # Test results page
│   │   ├── Index.tsx       # Classic mode
│   │   └── NotFound.tsx
│   ├── utils/              # Utility functions
│   │   └── fingerprinting.ts
│   ├── lib/                # Library code
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
└── package.json
```

---

## 🔒 Privacy & Security

### Our Commitment

✅ **100% Client-Side** - All tests run in your browser. Nothing is sent to our servers.

✅ **Zero Data Collection** - We don't store, log, or transmit any of your fingerprint data.

✅ **No Tracking** - No analytics, no cookies, no third-party trackers.

✅ **Open Source** - Code is transparent and available for review.

✅ **No Account Required** - Use the tool anonymously, no sign-up needed.

### What Data Leaves Your Browser?

Only two types of requests are made:

1. **IP Geolocation** (Optional) - A single request to `ipapi.co` to show your public IP and location. This is a standard service that websites use. You can block this if desired.

2. **Ad Blocker Detection** (Optional) - Attempts to load a known ad URL to detect ad blockers. This request is typically blocked by ad blockers themselves.

**No fingerprint data is ever transmitted.**

---

## 🎓 Educational Purpose

This tool is designed to educate users about:

- How browser fingerprinting works
- What information browsers expose
- Privacy implications of fingerprinting
- How to protect against tracking
- Effectiveness of privacy tools

### Learn More About Privacy

- [EFF - Cover Your Tracks](https://coveryourtracks.eff.org/)
- [EFF - Privacy Issues](https://www.eff.org/issues/privacy)
- [Tor Browser](https://www.torproject.org/)
- [Privacy Badger](https://privacybadger.org/)
- [uBlock Origin](https://ublockorigin.com/)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs** - Open an issue describing the bug
2. **Suggest Features** - Share ideas for new tests or improvements
3. **Submit PRs** - Fix bugs or add new features
4. **Improve Documentation** - Help make the docs better
5. **Spread the Word** - Share the tool with others

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📊 Comparison with Other Tools

| Feature | Browser Fingerprint Test | EFF Cover Your Tracks | BrowserLeaks |
|---------|-------------------------|----------------------|--------------|
| Canvas Fingerprinting | ✅ | ✅ | ✅ |
| WebGL Fingerprinting | ✅ | ✅ | ✅ |
| Audio Fingerprinting | ✅ | ✅ | ✅ |
| Font Detection | ✅ | ✅ | ✅ |
| WebRTC Leak Test | ✅ | ❌ | ✅ |
| Uniqueness Score | ✅ | ✅ | ❌ |
| Privacy Score | ✅ | ❌ | ❌ |
| Modern UI | ✅ | ❌ | ❌ |
| Dark Mode | ✅ | ❌ | ❌ |
| Export Results | ✅ | ❌ | ❌ |
| Mobile Friendly | ✅ | ⚠️ | ⚠️ |
| Open Source | ✅ | ✅ | ❌ |

---

## 🐛 Known Issues

- Battery API is deprecated in most browsers for privacy reasons
- Some browsers block WebRTC IP detection by default
- Font detection may not work in all browsers
- Private mode detection is not 100% accurate

---

## 🗺️ Roadmap

- [ ] Add more fingerprinting tests (CSS, JavaScript capabilities)
- [ ] Implement historical comparison (track changes over time)
- [ ] Add browser extension for continuous monitoring
- [ ] Support for testing with different user agents
- [ ] Database of common fingerprints for comparison
- [ ] Multi-language support
- [ ] PDF report generation
- [ ] Browser hardening checklist
- [ ] Automated privacy score improvement suggestions

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Debdoot Manna**

- GitHub: [@DebdootManna](https://github.com/DebdootManna)
- Project: [browser-whisperer-reveal](https://github.com/DebdootManna/browser-whisperer-reveal)

---

## 🙏 Acknowledgments

Inspired by and thanks to:

- [Electronic Frontier Foundation (EFF)](https://www.eff.org/) - For Cover Your Tracks
- [BrowserScan.net](https://www.browserscan.net/) - For comprehensive testing ideas
- [BrowserLeaks.com](https://browserleaks.com/) - For detailed leak tests
- [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs) - For fingerprinting techniques
- [shadcn/ui](https://ui.shadcn.com/) - For beautiful UI components

---

## ⚠️ Disclaimer

This tool is for **educational purposes** to help users understand digital fingerprinting and improve their privacy. It should not be used for:

- Tracking users without consent
- Bypassing privacy protections
- Any malicious or unethical purposes

**Always respect user privacy and comply with applicable laws and regulations.**

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/DebdootManna/browser-whisperer-reveal/issues) page
2. Open a new issue with details
3. Star ⭐ the project if you find it useful!

---

<div align="center">

Made with ❤️ for privacy and education

**[⬆ Back to Top](#browser-fingerprint-test)**

</div>