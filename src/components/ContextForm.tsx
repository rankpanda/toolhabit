import React, { useState } from 'react';
import { MetaSection } from './MetaSection';
import { Settings, Store, Euro } from 'lucide-react';

interface ContextData {
  language: string;
  businessContext: string;
  brandName: string;
  quantitativeGoal: number;
  currentResult: number;
  conversionRate: number;
  averageOrderValue: number;
  currentSessions: number;
  newUsers: number;
  requiredSearchVolume: number;
  projectedMonthlySessions: number;
}

const LANGUAGES = [
  { value: 'pt-PT', label: 'Português (Portugal)' },
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (United States)' },
  { value: 'en-GB', label: 'English (United Kingdom)' },
  { value: 'es-ES', label: 'Spanish (Spain)' }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export function ContextForm() {
  const [showAISettings, setShowAISettings] = useState(false);
  const [formData, setFormData] = useState<ContextData>({
    language: 'pt-PT',
    businessContext: '',
    brandName: '',
    quantitativeGoal: 100000,
    currentResult: 70000,
    conversionRate: 2,
    averageOrderValue: 125,
    currentSessions: 40469,
    newUsers: 37000,
    requiredSearchVolume: 15055,
    projectedMonthlySessions: 4818
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Rate') || name.includes('Goal') || name.includes('Result') || 
              name.includes('Value') || name.includes('Sessions') || name.includes('Users') || 
              name.includes('Volume')
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowAISettings(!showAISettings)}
          className="absolute -top-12 right-0 p-2 text-secondary-gray hover:text-primary transition-colors rounded-full hover:bg-secondary-lime/10"
          title="Definições IA"
        >
          <Settings className="h-5 w-5" />
        </button>

        {showAISettings && (
          <div className="absolute right-0 top-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Definições IA</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  defaultValue="openai"
                >
                  <option value="openai">OpenAI</option>
                  <option value="groq">Groq</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Store className="h-6 w-6 text-primary mr-2" />
            Contexto do Projeto
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Language and Brand Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Idioma</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nome da Marca</label>
                <input
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Introduza o nome da marca"
                />
              </div>
            </div>

            {/* Business Context */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Contexto do Negócio</label>
              <textarea
                name="businessContext"
                value={formData.businessContext}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Descreva o contexto do seu negócio..."
              />
            </div>

            {/* Financial Metrics */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Métricas Financeiras</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Objetivo Quantitativo</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Euro className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="quantitativeGoal"
                      value={formData.quantitativeGoal}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-12 rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">EUR</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Resultado Atual</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Euro className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="currentResult"
                      value={formData.currentResult}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-12 rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">EUR</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Taxa de Conversão</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="conversionRate"
                      value={formData.conversionRate}
                      onChange={handleChange}
                      className="block w-full pr-12 rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Valor Médio de Compra</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Euro className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="averageOrderValue"
                      value={formData.averageOrderValue}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-12 rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">EUR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Traffic Metrics */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Métricas de Tráfego</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sessões Mensais Atuais</label>
                  <input
                    type="number"
                    name="currentSessions"
                    value={formData.currentSessions}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Novos Utilizadores</label>
                  <input
                    type="number"
                    name="newUsers"
                    value={formData.newUsers}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Guardar Contexto
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <MetaSection formData={formData} />
    </>
  );
}