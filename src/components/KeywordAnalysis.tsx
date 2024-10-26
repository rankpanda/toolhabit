import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface Keyword {
  keyword: string;
  volume: number;
  relevance: number;
  funnel: string;
  intent: string;
  status: string;
  confirmed: boolean;
}

export function KeywordAnalysis() {
  const [keywords, setKeywords] = useState<Keyword[]>([
    {
      keyword: 'plantas artificiais',
      volume: 2400,
      relevance: 8,
      funnel: 'MOFU',
      intent: 'Commercial',
      status: 'avaliação',
      confirmed: false
    }
  ]);

  const handleConfirmChange = (index: number) => {
    setKeywords(prevKeywords => 
      prevKeywords.map((kw, idx) => 
        idx === index ? { ...kw, confirmed: !kw.confirmed } : kw
      )
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Keyword Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-900">Total Keywords</h3>
          <p className="text-3xl font-bold text-green-600">24</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900">Avg. Relevance</h3>
          <p className="text-3xl font-bold text-blue-600">7.2</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-purple-900">Analyzed</h3>
          <p className="text-3xl font-bold text-purple-600">65%</p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keyword
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Relevance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Funnel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Intent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confirmed
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {keywords.map((kw, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {kw.keyword}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {kw.volume}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    kw.relevance >= 7 ? 'bg-green-100 text-green-800' :
                    kw.relevance >= 4 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {kw.relevance}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {kw.funnel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {kw.intent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {kw.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <input
                    type="checkbox"
                    checked={kw.confirmed}
                    onChange={() => handleConfirmChange(idx)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}