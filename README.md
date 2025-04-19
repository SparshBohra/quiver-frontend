# Quiver - Pinterest for AI Prompts

Quiver is a beautiful, scrollable prompt discovery platform that lets users browse, copy, save, and share prompts across text, image, and video models — all without execution (for now).

![Quiver](https://i.imgur.com/UltfHhb.png)

## Features

- 🌟 Browse prompts across text, image, and video AI models
- 📋 One-click copy for easy prompt reuse
- 🏷️ Filter prompts by categories and tags
- 🌗 Dark/Light mode support 
- 🧩 Masonry grid layout for visually pleasing discovery
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/quiver.git
cd quiver
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- ⚡ [Next.js](https://nextjs.org/) - React framework
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🔍 [TypeScript](https://www.typescriptlang.org/) - Type checking

## Project Structure

```
quiver/
├── src/
│   ├── app/                # Next.js app router
│   ├── components/
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── prompts/        # Prompt-related components 
│   │   └── ui/             # UI components
│   └── data/               # Mock data
├── public/                 # Static assets
└── ...
```

## Roadmap

- 🚀 Authentication
- 💾 Allow users to save prompts to collections
- 📤 Enable prompt submission 
- 🧠 AI execution
- 🌐 User profiles and leaderboards

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Pinterest's discovery UX
- Created to make AI prompting more accessible and community-driven
