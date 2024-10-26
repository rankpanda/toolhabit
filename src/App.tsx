import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ContextForm } from './components/ContextForm';
import { SemrushData } from './components/SemrushData';
import { KeywordAnalysis } from './components/KeywordAnalysis';
import { MetaSection } from './components/MetaSection';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ContextForm />} />
          <Route path="/meta" element={<MetaSection formData={{
            quantitativeGoal: 100000,
            currentSessions: 40469,
            currentResult: 70000,
            projectedMonthlySessions: 4818
          }} />} />
          <Route path="/semrush" element={<SemrushData />} />
          <Route path="/keywords" element={<KeywordAnalysis />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;