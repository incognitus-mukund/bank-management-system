<<<<<<< HEAD
# Bank Management System

A modern web-based Bank Management System that replicates the functionality and interface of a C console application. This project transforms a traditional command-line banking program into an interactive web application while maintaining the original terminal aesthetic.

## Overview

This application converts a C console banking program into a full-featured web application with a terminal-inspired dark theme interface. Users can perform all standard banking operations through an intuitive web interface that preserves the look and feel of the original console application.

## Features

- **💰 Deposit Money**: Add funds to your account with validation
- **💸 Withdraw Money**: Withdraw funds with insufficient balance protection
- **💳 Check Balance**: View current balance with status indicators
- **🚪 Exit System**: Clean session management
- **📊 Transaction History**: View recent banking activities
- **💾 Session Persistence**: Data saved across browser sessions
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🎨 Terminal Aesthetic**: Dark theme with console-style interface

## Original C Program Authors

- MOHAK MAJI
- MUKUND KUMAR (PL)
- MUSKAN KHATUN
- NAWEED RAZA KHAN

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Build Tool**: Vite
- **UI Components**: Shadcn/ui
- **Routing**: Wouter
- **State Management**: React Query

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bank-management-system.git
cd bank-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Usage

1. **Main Menu**: Choose from 4 banking options using number keys (1-4) or click buttons
2. **Deposit**: Enter positive amounts to add money to your account
3. **Withdraw**: Enter amounts to withdraw (validates sufficient balance)
4. **Balance Check**: View current balance and account status
5. **Transaction History**: See your recent banking activities

## Account Status Indicators

- **Empty Account**: Balance is ₹0.00
- **Low Balance**: Balance below ₹100 (shows warning)
- **Moderate Balance**: Balance between ₹100-₹1000
- **Good Balance**: Balance above ₹1000

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── lib/            # Utility functions
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express server
├── shared/                 # Shared TypeScript schemas
└── attached_assets/        # Original C source code
```

## Original C Program

The original console application (`attached_assets/proj.c`) features:
- Float-based balance tracking
- ASCII art interface design
- Menu-driven navigation
- Input validation
- Balance status checking
- Warning system for low balances

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

### Key Features Implementation

- **Session Persistence**: Uses browser localStorage to maintain state
- **Input Validation**: Prevents negative amounts and invalid operations
- **Error Handling**: User-friendly error messages and warnings
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Terminal Theme**: Custom CSS classes for authentic console appearance

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Original C program authors for the banking logic and interface design
- Shadcn/ui for the component library
- Tailwind CSS for the styling framework
- React and TypeScript communities for excellent documentation

## Demo

[Live Demo](https://your-app-name.replit.app) - Try the application online

## Screenshots

The application features a terminal-style interface with:
- ASCII art headers matching the original C program
- Dark theme with green/blue accents
- Monospace fonts for authentic console feel
- Smooth animations and transitions
- Mobile-responsive design

---

**From Console to Web**: Bringing classic C programming into the modern web era while preserving the original user experience.
=======
# bank-management-system
Web-based Bank Management System - C console application converted to modern web interface
>>>>>>> 16f7a982d264335966afa50b4c9acf25a118af51
