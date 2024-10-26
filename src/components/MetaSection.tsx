import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';

interface MetaSectionProps {
  formData: {
    quantitativeGoal: number;
    currentSessions: number;
    currentResult: number;
    projectedMonthlySessions: number;
  };
}

const SERP_CTR = [
  { position: 1, ctr: 32.26, label: '1ª Posição' },
  { position: 2, ctr: 14.67, label: '2ª Posição' },
  { position: 3, ctr: 8.55, label: '3ª Posição' },
  { position: 4, ctr: 5.66, label: '4ª Posição' },
  { position: 5, ctr: 3.93, label: '5ª Posição' },
  { position: 6, ctr: 2.82, label: '6ª Posição' },
  { position: 7, ctr: 2.11, label: '7ª Posição' },
  { position: 8, ctr: 1.63, label: '8ª Posição' },
  { position: 9, ctr: 1.30, label: '9ª Posição' },
  { position: 10, ctr: 1.07, label: '10ª Posição' }
];

export function MetaSection({ formData }: MetaSectionProps) {
  const calculateRequiredSearchVolume = (monthlySessionsProjection: number) => {
    return Math.round((monthlySessionsProjection * 100) / SERP_CTR[0].ctr);
  };

  const requiredSearchVolume = calculateRequiredSearchVolume(formData.projectedMonthlySessions);

  const calculateMonthlySessionsByPosition = (ctrPercentage: number) => {
    return Math.round((requiredSearchVolume * ctrPercentage) / 100);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <Target className="mr-2 h-6 w-6 text-primary" />
        Análise de Meta
      </h2>

      <div className="space-y-6">
        {/* Required Search Volume Card */}
        <div className="bg-gradient-to-br from-primary-white to-secondary-light rounded-lg p-6">
          <h3 className="text-lg font-medium text-primary mb-2 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Volume de Pesquisa Necessário
          </h3>
          <p className="text-4xl font-bold text-primary">
            {requiredSearchVolume.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            pesquisas mensais para atingir o objetivo
          </p>
        </div>

        {/* SERP Positions Analysis */}
        <div className="bg-gradient-to-br from-secondary-light to-secondary-beige rounded-lg p-6">
          <h3 className="text-lg font-medium text-primary mb-6 flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            Sessões Mensais por Posição SERP
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {SERP_CTR.map(({ position, ctr, label }) => {
              const sessions = calculateMonthlySessionsByPosition(ctr);
              return (
                <div key={position} className="bg-white bg-opacity-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {label}
                      <span className="text-xs text-gray-500 ml-2">({ctr}% CTR)</span>
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {sessions.toLocaleString()} sessões
                    </span>
                  </div>
                  <div className="h-2 bg-secondary-light rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary-lime rounded-full transition-all duration-300"
                      style={{ width: `${(ctr / SERP_CTR[0].ctr) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}