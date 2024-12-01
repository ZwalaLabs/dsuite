"use client";

import Hero from "@/components/ui/Hero";
import ProductDemo from "@/components/ui/ProductDemo";
import FeatureSection from "@/components/ui/FeatureSection";
import Navbar from "@/components/ui/navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Navbar />
          <main className="pt-12">
            <Hero />
            <ProductDemo />
            <FeatureSection />
          </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
