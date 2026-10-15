import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION_BASE = `You are the official AI Portfolio Assistant & Technical Advisor for Abraham Pose Senteu.
Your goal is to answer questions from recruiters, prospective clients, hiring managers, and design collaborators accurately, professionally, and warmly.

ABRAHAM POSE SENTEU'S PROFILE:
- Full Name: Abraham Pose Senteu
- Phone: +254 113 243 615
- Email: sentepose@gmail.com
- Location: Kenya (Nairobi, Mombasa, Ngong, Kajiado)
- Education: Bachelor of Science in Computer Science from Pwani University (Graduated October 2025). KCSE from Koilel High School (Grade B+, 2019).
- Fellowships & Certifications:
  * Equity Leaders Program (ELP) Scholar (Equity Group Foundation, 2020 - Present)
  * Software Engineering Certification (Power Learn Project, 2024)
  * Virtual Assistant (AI & Automation) (ALX Africa, 2024)
  * Ajira Digital Program (Data Analysis, SEO & Digital Marketing)
- Banking Operations Experience (April 2020 - January 2025 at Equity Bank Kenya Limited):
  * Supported operations across 6 branches: Ngong, OTC, Kimathi, Mtwapa, Nyali, and Kajiado.
  * Recognized as the Best Equitel Onboarding Officer across the Coastal Region.
  * Onboarded up to 1,000 customers monthly onto digital banking platforms.
  * Consistently sold an average of 60 Equitel SIMs/day.
  * Processed up to 600 transactions daily with exceptional accuracy and zero compliance breaches.
  * Extensive expertise in KYC, AML, FATCA, CRS compliance and CBK regulations.
- AI Data Annotation & Model Evaluation (2024 - Present):
  * Freelance specialist for TELUS Digital, iMerit, OneForma, Alignerr, AfterQuery, Fleet AI, and Uber AI.
  * Earned over USD 7,000+ in international AI model evaluation and prompt ranking.
  * Evaluated LLM responses for factual accuracy, consistency, instruction following, and RLHF alignment.
- Selected Projects:
  1. Smart Study Assistant (UI/UX & Full-Stack AI/EdTech): Adaptive learning schedules, retention telemetry, MERN + AI API.
  2. University Registration & Enrollment System (UI/UX & Academic Systems): Zero-clash timetable matrix, student clearance, PostgreSQL/Node/React.
  3. Househelp Smart Management System (UI/UX & Service Platform): Trusted domestic workforce verification, KYC-inspired onboarding.
  4. Equitel Digital Banking Onboarding Workflow & Brand Collateral (Branding & UX): 6-branch operational migration protocol.
  5. Banking Operations & KYC Compliance Manual (Print & Editorial): 120-page master operations manual with Swiss typography and color-coded tabs.
  6. Omnichannel Banking UI Component Library (Design Systems): 65+ tokens, tabular figures, <150ms interaction budget.

GUIDELINES FOR RESPONDING:
- Maintain an articulate, grounded, and courteous tone.
- When asked about scheduling an interview or contacting Abraham, encourage using the interactive Contact Form on the page or emailing sentepose@gmail.com / calling +254 113 243 615.
- When Google Search is enabled, incorporate real-time data where relevant (e.g., verifying current East African banking guidelines, CBK policies, or Kenyan tech industry trends), while clearly citing sources.
- Format responses cleanly with readable paragraphs and bullet points where helpful.`;

// Multi-turn chat endpoint with role selection and search grounding
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, roleMode, useSearchGrounding } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Role-specific model selection and configuration
    // Mode 'technical': gemini-4-argon (complex reasoning, UX architecture audits)
    // Mode 'fast': gemini-3.1-flash-lite (fast response)
    // Mode 'general': gemini-3.8-flash (with optional search grounding)
    let selectedModel = 'gemini-3.8-flash';
    let roleSystemInstruction = SYSTEM_INSTRUCTION_BASE;

    if (roleMode === 'technical') {
      selectedModel = 'gemini-4-argon';
      roleSystemInstruction += `\nROLE FOCUS: You are functioning as the Senior Design System & Technical Architecture Advisor. Focus on architectural choices, database ACID guarantees, WCAG accessibility, and software design patterns.`;
    } else if (roleMode === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
      roleSystemInstruction += `\nROLE FOCUS: Provide concise, rapid-fire executive summaries and bullet points.`;
    } else {
      selectedModel = 'gemini-3.8-flash';
      roleSystemInstruction += `\nROLE FOCUS: You are functioning as Abraham's general portfolio representative, answering questions about his skills, experience, and projects.`;
    }

    // Tools setup: search grounding enabled when requested
    const tools: Array<{ googleSearch?: Record<string, never> }> = [];
    if (useSearchGrounding) {
      tools.push({ googleSearch: {} });
    }

    // Map conversation history
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    let response;
    let actualModelUsed = selectedModel;

    try {
      response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config: {
          systemInstruction: roleSystemInstruction,
          ...(tools.length > 0 ? { tools } : {}),
        },
      });
    } catch (modelError: unknown) {
      // If gemini-4-argon encounters a paid model error or unconfigured key, seamlessly fall back to gemini-3.8-flash
      const errorMessage = modelError instanceof Error ? modelError.message : String(modelError);
      console.warn(`Model ${selectedModel} failed (${errorMessage}), falling back to gemini-3.8-flash`);
      
      actualModelUsed = 'gemini-3.8-flash';
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: roleSystemInstruction,
          ...(tools.length > 0 ? { tools } : {}),
        },
      });
    }

    const text = response.text || 'I could not generate a response. Please try again.';

    // Extract search grounding metadata if available
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;

    const searchQueries: string[] = groundingMetadata?.webSearchQueries || [];
    const searchChunks = groundingMetadata?.groundingChunks || [];
    const sources = searchChunks
      .map((chunk: { web?: { title?: string; uri?: string } }) => ({
        title: chunk.web?.title || 'Web Reference',
        uri: chunk.web?.uri || '',
      }))
      .filter((s: { uri: string }) => Boolean(s.uri));

    return res.json({
      text,
      modelUsed: actualModelUsed,
      searchQueries,
      sources,
    });
  } catch (error: unknown) {
    console.error('Chat API Error:', error);
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ error: msg });
  }
});

// Mount Vite or serve static
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
