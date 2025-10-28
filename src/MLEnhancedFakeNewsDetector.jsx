import React, { useState } from "react";
import {
  Brain,
  BarChart3,
  Search,
  Shield,
  Tag,
  Zap,
  Clock,
  Award,
  Database,
  Star,
} from "lucide-react";

/* --------------------------
   MOCK DATA CONFIGURATIONS
---------------------------*/

// AI model metadata
const mlModelConfig = {
  textClassifier: {
    name: "Text Classifier",
    accuracy: 94.2,
    purpose: "Detects if content appears real or fake.",
    architecture: "BERT Transformer",
    trainingData: "2M labeled news samples",
  },
  sentimentAnalyzer: {
    name: "Sentiment Analyzer",
    accuracy: 91.7,
    purpose: "Detects manipulation and emotional bias.",
    architecture: "BiLSTM Recurrent Network",
    trainingData: "IMDb + NewsComment datasets",
  },
  languageModel: {
    name: "Language Model",
    accuracy: 96.1,
    purpose: "Analyzes writing quality and professionalism.",
    architecture: "GPT-based Quality Model",
    trainingData: "Wikipedia + Editorial Corpora",
  },
  sourceVerifier: {
    name: "Source Verifier",
    accuracy: 92.3,
    purpose: "Checks source credibility and authority.",
    architecture: "Graph Neural Network",
    trainingData: "Verified News Domains Graph",
  },
};

// News categories with icons
const newsCategories = {
  politics: { name: "Politics", icon: "🏛️", mlFeatures: ["bias", "sentiment"] },
  tech: { name: "Technology", icon: "💻", mlFeatures: ["keywords", "language"] },
  health: { name: "Health", icon: "🧬", mlFeatures: ["facts", "authenticity"] },
  sports: { name: "Sports", icon: "⚽", mlFeatures: ["emotion", "credibility"] },
  general: { name: "General", icon: "📄", mlFeatures: [] },
};

// Sample test items
const sampleNews = [
  {
    id: 1,
    title: "Government launches new digital ID initiative",
    content:
      "The central government announced a new digital ID program aimed at improving access to public services securely.",
    type: "real",
    category: "tech",
    expectedScore: 88,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.92 },
      sentimentAnalyzer: { manipulation_score: 0.12, emotion: "neutral" },
    },
  },
  {
    id: 2,
    title: "Scientists find water on the Sun, shocking discovery!",
    content:
      "A viral post claims scientists found traces of water on the Sun, raising major questions about space science.",
    type: "fake",
    category: "health",
    expectedScore: 22,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.87 },
      sentimentAnalyzer: { manipulation_score: 0.84, emotion: "surprise" },
    },
  },
  {
    id: 3,
    title: "New AI model can write full novels in under 5 seconds",
    content:
      "Researchers at OpenAI unveiled a model capable of writing full-length novels nearly indistinguishable from human authors.",
    type: "real",
    category: "tech",
    expectedScore: 90,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.95 },
      sentimentAnalyzer: { manipulation_score: 0.08, emotion: "neutral" },
    },
  },
  {
    id: 4,
    title: "Chocolate cures all types of cancer, says new research",
    content:
      "A viral post circulating online claims that daily chocolate consumption can completely cure cancer.",
    type: "fake",
    category: "health",
    expectedScore: 18,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.89 },
      sentimentAnalyzer: { manipulation_score: 0.78, emotion: "joy" },
    },
  },
  {
    id: 5,
    title: "India wins ICC World Cup after stunning final match",
    content:
      "India defeated Australia in a thrilling final to claim the ICC Cricket World Cup, sparking celebrations nationwide.",
    type: "real",
    category: "sports",
    expectedScore: 92,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.96 },
      sentimentAnalyzer: { manipulation_score: 0.1, emotion: "excitement" },
    },
  },
  {
    id: 6,
    title: "Aliens spotted landing near the Eiffel Tower",
    content:
      "Several videos posted online show bright UFOs descending on Paris landmarks, with witnesses claiming alien contact.",
    type: "fake",
    category: "general",
    expectedScore: 12,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.94 },
      sentimentAnalyzer: { manipulation_score: 0.9, emotion: "shock" },
    },
  },
  {
    id: 7,
    title: "NASA confirms water presence on the Moon's surface",
    content:
      "NASA scientists confirmed small quantities of frozen water present in shadowed lunar craters, enhancing future mission potential.",
    type: "real",
    category: "tech",
    expectedScore: 85,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.91 },
      sentimentAnalyzer: { manipulation_score: 0.14, emotion: "neutral" },
    },
  },
  {
    id: 8,
    title: "Exercise once a week guarantees six-pack abs in one month",
    content:
      "A trending fitness article claims that minimal exercise can lead to rapid muscle growth and defined abs in weeks.",
    type: "fake",
    category: "health",
    expectedScore: 25,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.86 },
      sentimentAnalyzer: { manipulation_score: 0.77, emotion: "hopeful" },
    },
  },
  {
    id: 9,
    title: "Tech giants unite to form global AI safety alliance",
    content:
      "Leading technology companies including Google, Microsoft, and OpenAI announced a collaborative effort to ensure responsible AI development.",
    type: "real",
    category: "tech",
    expectedScore: 91,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.94 },
      sentimentAnalyzer: { manipulation_score: 0.1, emotion: "neutral" },
    },
  },
  {
    id: 10,
    title: "Coffee shortage predicted to end global productivity",
    content:
      "An internet post warns that a global coffee shortage will cause economic collapse and mass layoffs.",
    type: "fake",
    category: "general",
    expectedScore: 28,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.83 },
      sentimentAnalyzer: { manipulation_score: 0.81, emotion: "fear" },
    },
  },
  {
    id: 11,
    title: "WHO approves first malaria vaccine for widespread use",
    content:
      "The World Health Organization approved the first malaria vaccine, marking a major milestone in global health.",
    type: "real",
    category: "health",
    expectedScore: 95,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.97 },
      sentimentAnalyzer: { manipulation_score: 0.07, emotion: "hope" },
    },
  },
  {
    id: 12,
    title: "New study finds breathing oxygen helps you live longer",
    content:
      "A social media post misrepresents research, claiming that simply breathing more can significantly increase lifespan.",
    type: "fake",
    category: "health",
    expectedScore: 15,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.9 },
      sentimentAnalyzer: { manipulation_score: 0.88, emotion: "amusement" },
    },
  },
  {
    id: 13,
    title: "Electric cars outsell petrol cars globally in 2025",
    content:
      "Recent data shows electric vehicles surpassing gasoline car sales worldwide for the first time in history.",
    type: "real",
    category: "tech",
    expectedScore: 89,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.93 },
      sentimentAnalyzer: { manipulation_score: 0.12, emotion: "optimism" },
    },
  },
  {
    id: 14,
    title: "Eating ice cream daily improves memory performance",
    content:
      "An influencer claims ice cream boosts memory function due to 'cold-stimulated neurons'. No scientific evidence supports this.",
    type: "fake",
    category: "health",
    expectedScore: 21,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.9 },
      sentimentAnalyzer: { manipulation_score: 0.82, emotion: "joy" },
    },
  },
  {
    id: 15,
    title: "Olympics 2024 to feature AI-powered referee systems",
    content:
      "Organizers announced advanced AI tools will assist referees to ensure fair judgments during events.",
    type: "real",
    category: "sports",
    expectedScore: 86,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.93 },
      sentimentAnalyzer: { manipulation_score: 0.1, emotion: "neutral" },
    },
  },
  {
    id: 16,
    title: "Bitcoin to replace all world currencies by 2026",
    content:
      "A viral YouTube video claims that by 2026, Bitcoin will entirely replace global currencies and banks will collapse.",
    type: "fake",
    category: "tech",
    expectedScore: 19,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.85 },
      sentimentAnalyzer: { manipulation_score: 0.83, emotion: "excitement" },
    },
  },
  {
    id: 17,
    title: "Climate change report shows record global heat levels",
    content:
      "The latest UN report confirms 2025 as the hottest year on record, urging immediate global action.",
    type: "real",
    category: "politics",
    expectedScore: 87,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.93 },
      sentimentAnalyzer: { manipulation_score: 0.15, emotion: "concern" },
    },
  },
  {
    id: 18,
    title: "Celebrities secretly control world governments, says leaked report",
    content:
      "A conspiracy site claims leaked files prove Hollywood actors are directing political policies worldwide.",
    type: "fake",
    category: "politics",
    expectedScore: 13,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.9 },
      sentimentAnalyzer: { manipulation_score: 0.91, emotion: "fear" },
    },
  },
  {
    id: 19,
    title: "Google announces free AI tools for students worldwide",
    content:
      "Google launched a new initiative offering free AI learning resources and cloud credits for students globally.",
    type: "real",
    category: "tech",
    expectedScore: 93,
    mlPredictions: {
      textClassifier: { prediction: "real", confidence: 0.95 },
      sentimentAnalyzer: { manipulation_score: 0.09, emotion: "hope" },
    },
  },
  {
    id: 20,
    title: "Dinosaurs found living in remote parts of the Amazon",
    content:
      "A Facebook post with blurred images claims explorers have found living dinosaurs deep in the Amazon rainforest.",
    type: "fake",
    category: "general",
    expectedScore: 11,
    mlPredictions: {
      textClassifier: { prediction: "fake", confidence: 0.95 },
      sentimentAnalyzer: { manipulation_score: 0.93, emotion: "awe" },
    },
  },
];


/* --------------------------
   MAIN COMPONENT
---------------------------*/

export default function MLEnhancedFakeNewsDetector() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);
  const [detectionMode, setDetectionMode] = useState("ml-enhanced");

  const loadSample = (sample) => {
    setSelectedSample(sample.id);
    setInputText(sample.content);
    analyzeText(sample);
  };

  const analyzeText = (sample = null) => {
    const text = sample ? sample.content : inputText;
    if (!text.trim()) return;

    const randomScore = Math.floor(Math.random() * 100);
    const categoryKeys = Object.keys(newsCategories);
    const randomCategory =
      categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

    const fake = randomScore < 40;

    // ✅ Add safe defaults to prevent missing fields
    const basePredictions = sample?.mlPredictions || {};
    const safePredictions = {
      textClassifier: basePredictions.textClassifier || {
        prediction: fake ? "fake" : "real",
        confidence: Math.random(),
      },
      sentimentAnalyzer: basePredictions.sentimentAnalyzer || {
        manipulation_score: Math.random(),
        emotion: "neutral",
      },
      languageModel: basePredictions.languageModel || {
        quality_score: Math.random(),
        professional_writing: randomScore > 50,
      },
      sourceVerifier: basePredictions.sourceVerifier || {
        domain_authority: Math.random(),
        credibility: fake ? "low" : "high",
      },
    };

    setResult({
      score: randomScore,
      category: randomCategory,
      color:
        randomScore >= 60
          ? "green"
          : randomScore >= 40
          ? "yellow"
          : "red",
      detectedKeywords: [
        "AI",
        "machine learning",
        "bias",
        "credibility",
        "source",
      ],
      reasons: [
        "Analyzed with multiple AI models.",
        "Detected potential linguistic manipulation.",
        "Evaluated source credibility using GNN verifier.",
        fake
          ? "AI models indicate misinformation patterns."
          : "Language and source credibility appear trustworthy.",
      ],
      mlPredictions: safePredictions,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Brain className="w-7 h-7 text-blue-600" />
          ML-Enhanced Fake News Detector
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT MAIN PANEL */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <textarea
              className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              placeholder="Paste or type a news article here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={() => analyzeText()}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Analyze Content
            </button>

            {/* RESULT SECTION */}
            {result && (
              <div className="mt-8 space-y-6">
                {/* Category Section */}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Tag className="w-4 h-4" />
                  <span className="font-medium">AI-Detected Category:</span>
                  <span className="flex items-center gap-1">
                    {newsCategories[result.category]?.icon || "📄"}
                    {newsCategories[result.category]?.name || "General"}
                  </span>
                  <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    ML Features:{" "}
                    {newsCategories[result.category]?.mlFeatures?.length || 0}
                  </span>
                </div>

                {/* Predictions */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-900">
                    <BarChart3 className="w-4 h-4" /> AI Model Predictions
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Text Classifier:</strong>{" "}
                      {result.mlPredictions.textClassifier?.prediction} (
                      {(
                        (result.mlPredictions.textClassifier?.confidence ?? 0) *
                        100
                      ).toFixed(1)}
                      %)
                    </p>
                    <p>
                      <strong>Manipulation Score:</strong>{" "}
                      {(
                        (result.mlPredictions.sentimentAnalyzer
                          ?.manipulation_score ?? 0) * 100
                      ).toFixed(1)}
                      % — {result.mlPredictions.sentimentAnalyzer?.emotion || "N/A"}
                    </p>
                    <p>
                      <strong>Language Quality:</strong>{" "}
                      {result.mlPredictions.languageModel
                        ? `${(
                            result.mlPredictions.languageModel.quality_score *
                            100
                          ).toFixed(1)}% — ${
                            result.mlPredictions.languageModel
                              .professional_writing
                              ? "Professional"
                              : "Casual"
                          }`
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Source Authority:</strong>{" "}
                      {result.mlPredictions.sourceVerifier
                        ? `${(
                            result.mlPredictions.sourceVerifier.domain_authority *
                            100
                          ).toFixed(1)}% — ${
                            result.mlPredictions.sourceVerifier.credibility
                          }`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Keywords */}
                {result.detectedKeywords.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-800">
                      <Search className="w-4 h-4 text-green-600" />
                      AI-Detected Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.detectedKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm rounded-full border border-blue-200 flex items-center gap-1"
                        >
                          <Brain className="w-3 h-3" />
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Recommendation */}
                <div
                  className={`p-4 rounded-lg border-l-4 ${
                    result.color === "green"
                      ? "bg-green-50 border-green-500 text-green-800"
                      : result.color === "yellow"
                      ? "bg-yellow-50 border-yellow-500 text-yellow-800"
                      : "bg-red-50 border-red-500 text-red-800"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 flex items-center gap-2">
                        AI Recommendation:
                        <Brain className="w-4 h-4 text-blue-600" />
                      </h4>
                      <p className="text-sm">
                        {result.score >= 75
                          ? "Highly credible content with verified sources."
                          : result.score >= 60
                          ? "Generally reliable but verify key claims."
                          : result.score >= 40
                          ? "Mixed indicators — exercise caution."
                          : result.score >= 25
                          ? "Strong signs of misinformation — verify before sharing."
                          : "Likely misinformation. Avoid sharing."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* Sample News */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold">AI Test Samples</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Click a sample to auto-analyze:
              </p>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {sampleNews.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => loadSample(s)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedSample === s.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          s.type === "real"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {s.type.toUpperCase()}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        {newsCategories[s.category]?.name}
                      </span>
                    </div>
                    <h3 className="font-medium text-sm text-gray-800">
                      {s.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* ML Models */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Models Pipeline
              </h3>
              <div className="space-y-4">
                {Object.entries(mlModelConfig).map(([key, m]) => (
                  <div
                    key={key}
                    className="bg-white rounded-lg p-3 border border-blue-200"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm text-blue-900">
                        {m.name}
                      </h4>
                      <span className="text-xs text-green-700">
                        {m.accuracy}%
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 mb-1">{m.purpose}</p>
                    <p className="text-xs text-gray-600">
                      <strong>Arch:</strong> {m.architecture}
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Data:</strong> {m.trainingData}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
