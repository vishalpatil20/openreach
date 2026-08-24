import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        design: resolve(__dirname, 'design.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        deleteLater: resolve(__dirname, 'delete-later.html'),
        howItWorks: resolve(__dirname, 'how-it-works.html'),
        chatgptAds: resolve(__dirname, 'chatgpt-ads.html'),
        opportunity: resolve(__dirname, 'opportunity.html'),
        about: resolve(__dirname, 'about.html'),
        insights: resolve(__dirname, 'insights.html'),
        contact: resolve(__dirname, 'contact.html'),
        industries: resolve(__dirname, 'industries/index.html'),
        industriesDental: resolve(__dirname, 'industries/dental.html'),
        industriesHomeServices: resolve(__dirname, 'industries/home-services.html'),
        industriesAutomotive: resolve(__dirname, 'industries/automotive.html'),
        industriesMedSpa: resolve(__dirname, 'industries/med-spa.html'),
        industriesHvac: resolve(__dirname, 'industries/hvac.html'),
        industriesRoofing: resolve(__dirname, 'industries/roofing.html'),
        industriesRemodeling: resolve(__dirname, 'industries/remodeling.html')
      },
    },
  },
});
