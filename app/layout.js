import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nova",
  description: "Professional image editing",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ]
  }
};

const novaTheme = {
  baseTheme: "dark",
  variables: {
    // Main colors matching your gradient scheme
    colorPrimary: "#3b82f6", // blue-500
    colorPrimaryLight: "#60a5fa", // blue-400  
    colorDanger: "#ef4444", // red-500
    colorSuccess: "#10b981", // emerald-500
    colorWarning: "#f59e0b", // amber-500
    
    // Background colors - solid backgrounds
    colorBackground: "#020617", // slate-950
    colorInputBackground: "#0f172a", // slate-900
    colorInputText: "#f8fafc", // slate-50
    
    // Text colors
    colorText: "#f8fafc", // slate-50
    colorTextSecondary: "rgba(248, 250, 252, 0.8)", // slate-50 with opacity
    colorTextOnPrimaryBackground: "#0f172a", // slate-900
    
    // Border and divider colors
    colorNeutral: "rgba(248, 250, 252, 0.1)", // subtle white border
    
    // Spacing
    spacingUnit: "1rem",
    borderRadius: "0.75rem", // matches your rounded-xl
    
    // Fonts
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.875rem",
    fontWeight: {
      normal: "400",
      medium: "500", 
      semibold: "600",
      bold: "700"
    }
  },
  elements: {
    // Main container styling
    rootBox: {
      backgroundColor: "#020617",
      border: "1px solid rgba(248, 250, 252, 0.1)",
      borderRadius: "1rem",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1)",
    },
    
    // Card styling
    card: {
      backgroundColor: "#0f172a",
      border: "1px solid rgba(248, 250, 252, 0.1)",
      borderRadius: "0.75rem",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    },
    
    // Header styling
    headerTitle: {
      background: "linear-gradient(135deg, #60a5fa, #a855f7, #06b6d4)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      fontSize: "1.875rem",
      fontWeight: "800",
      letterSpacing: "-0.025em"
    },
    
    headerSubtitle: {
      color: "rgba(248, 250, 252, 0.8)",
      fontSize: "0.875rem"
    },
    
    // Form field styling
    formFieldInput: {
      backgroundColor: "#1e293b",
      border: "1px solid rgba(248, 250, 252, 0.2)",
      borderRadius: "0.5rem",
      color: "#f8fafc",
      fontSize: "0.875rem",
      transition: "all 0.2s ease",
      "&:focus": {
        borderColor: "#60a5fa",
        boxShadow: "0 0 0 3px rgba(96, 165, 250, 0.1)",
        outline: "none"
      },
      "&:hover": {
        borderColor: "rgba(96, 165, 250, 0.4)"
      }
    },
    
    formFieldLabel: {
      color: "rgba(248, 250, 252, 0.9)",
      fontSize: "0.875rem",
      fontWeight: "500"
    },
    
    // Button styling with gradient
    formButtonPrimary: {
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
      border: "none",
      borderRadius: "0.5rem",
      color: "#ffffff",
      fontSize: "0.875rem",
      fontWeight: "600",
      padding: "0.75rem 1.5rem",
      transition: "all 0.2s ease",
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
      },
      "&:active": {
        transform: "scale(0.98)"
      }
    },
    
    // Social connection buttons
    socialButtonsBlockButton: {
      backgroundColor: "#1e293b",
      border: "1px solid rgba(248, 250, 252, 0.2)", 
      borderRadius: "0.5rem",
      color: "#f8fafc",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "#334155",
        borderColor: "rgba(96, 165, 250, 0.4)",
        transform: "translateY(-1px)"
      }
    },
    
    // Footer links
    footerActionLink: {
      color: "#60a5fa",
      textDecoration: "none",
      fontSize: "0.875rem",
      "&:hover": {
        color: "#93c5fd",
        textDecoration: "underline"
      }
    },
    
    // Divider
    dividerLine: {
      backgroundColor: "rgba(248, 250, 252, 0.1)"
    },
    
    dividerText: {
      color: "rgba(248, 250, 252, 0.6)",
      fontSize: "0.75rem"
    },
    
    // Error messages
    formFieldError: {
      color: "#fca5a5",
      fontSize: "0.75rem"
    },
    
    // Loading state
    spinner: {
      color: "#60a5fa"
    },
    
    // Modal backdrop
    modalBackdrop: {
      backgroundColor: "rgba(2, 6, 23, 0.8)",
      backdropFilter: "blur(8px)"
    },
    
    // User menu styling
    userButtonPopoverCard: {
      backgroundColor: "#0f172a",
      border: "1px solid rgba(248, 250, 252, 0.1)",
      borderRadius: "0.75rem",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    },
    
    userButtonPopoverActionButton: {
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#1e293b",
        color: "#ffffff"
      }
    },
    
    userButtonPopoverActionButtonText: {
      color: "#ffffff"
    },
    
    userButtonPopoverActionButtonIcon: {
      color: "#ffffff"
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={novaTheme}
          >
          <ConvexClientProvider>
            <main className="bg-slate-950 min-h-screen text-white overflow-x-hidden">
              <Toaster richColors />
              {children}
            </main>
          </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
