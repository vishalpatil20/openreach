import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        design: resolve(__dirname, 'design.html'),
        app: resolve(__dirname, 'app.html'),
        insightsTracker: resolve(__dirname, 'insights-tracker.html'),
        deleteLater: resolve(__dirname, 'delete-later.html'),
        howItWorks: resolve(__dirname, 'how-it-works.html'),
        chatgptAds: resolve(__dirname, 'chatgpt-ads.html'),
        chatgptAdsAgency: resolve(__dirname, 'chatgpt-ads-agency.html'),
        aiAdvertising: resolve(__dirname, 'ai-advertising.html'),
        platform: resolve(__dirname, 'platform.html'),
        about: resolve(__dirname, 'about.html'),
        insights: resolve(__dirname, 'insights.html'),
        insightsHowToAdvertise: resolve(__dirname, 'insights/how-to-advertise-on-chatgpt.html'),
        insightsVsGoogle: resolve(__dirname, 'insights/chatgpt-ads-vs-google-ads.html'),
        insightsCost: resolve(__dirname, 'insights/how-much-do-chatgpt-ads-cost.html'),
        contact: resolve(__dirname, 'contact.html'),
        industries: resolve(__dirname, 'industries/index.html'),
        industriesDental: resolve(__dirname, 'industries/dental.html'),
        industriesAutomotive: resolve(__dirname, 'industries/automotive.html'),
        industriesMedSpa: resolve(__dirname, 'industries/med-spa.html'),
        industriesHvac: resolve(__dirname, 'industries/hvac.html')
      },
    },
  },
});
