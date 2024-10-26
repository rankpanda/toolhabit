import React, { useState } from 'react';
import { Trash2, RefreshCw, Loader2, Rocket } from 'lucide-react';
import { ImportedData } from './types';
import { HistoryEntry } from '../../services/historyService';
import { toast } from '../ui/Toast';
import { webhookService } from '../../services/webhookService';

interface ImportHistoryProps {
  imports: HistoryEntry[];
  onClearHistory: () => void;
  onCreateProject: (data: ImportedData) => void;
  onDeleteEntry: (id: string) => void;
}

interface StatsCardProps {
  label: string;
  value: string | number;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, color }) => (
  <div className={`${color} rounded-lg p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-md`}>
    <p className="text-sm font-medium opacity-75">{label}</p>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

function calculateStats(keywords: ImportedData['keywords']) {
  return {
    totalVolume: keywords.reduce((sum, kw) => sum + kw.volume, 0),
    avgDifficulty: Number((keywords.reduce((sum, kw) => sum + kw.difficulty, 0) / keywords.length).toFixed(1)),
    keywordCount: keywords.length
  };
}

export function ImportHistory({ 
  imports, 
  onClearHistory, 
  onCreateProject,
  onDeleteEntry 
}: ImportHistoryProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [projectNameInput, setProjectNameInput] = useState('');
  const [selectedImport, setSelectedImport] = useState<ImportedData | null>(null);
  const [convertedProjects, setConvertedProjects] = useState<Set<string>>(new Set());

  const handleCreateProject = async (importData: ImportedData) => {
    setSelectedImport(importData);
    setProjectNameInput('');
  };

  const handleRetriggerWebhook = async (importData: ImportedData) => {
    setIsProcessing(true);
    toast.info('Sending data to webhook...');

    try {
      await webhookService.sendKeywordData(importData.keywords);
      toast.success('Data sent successfully');
    } catch (error) {
      toast.error('Failed to send data');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmProject = async () => {
    if (!projectNameInput.trim() || !selectedImport) {
      toast.error('Please enter a project name');
      return;
    }

    setIsProcessing(true);
    toast.info('Processing project data...');

    try {
      const projectId = crypto.randomUUID();
      const newProject = {
        id: projectId,
        name: projectNameInput,
        createdAt: new Date().toISOString(),
        data: selectedImport
      };

      // Get existing projects or initialize empty array
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      existingProjects.push(newProject);
      
      // Save updated projects list
      localStorage.setItem('projects', JSON.stringify(existingProjects));
      localStorage.setItem('currentProjectId', projectId);

      await onCreateProject(selectedImport);
      setSelectedImport(null);
      setProjectNameInput('');
      setConvertedProjects(prev => new Set(prev).add(selectedImport.timestamp));
      
      toast.success('Project created successfully');
    } catch (error) {
      toast.error('Failed to create project');
    } finally {
      setIsProcessing(false);
    }
  };

  if (imports.length === 0) return null;

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Import History</h3>
        <button
          onClick={onClearHistory}
          className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear History
        </button>
      </div>

      {/* Project Name Modal */}
      {selectedImport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
            <input
              type="text"
              value={projectNameInput}
              onChange={(e) => setProjectNameInput(e.target.value)}
              placeholder="Enter project name"
              className="w-full px-3 py-2 border rounded-md mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedImport(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmProject}
                disabled={isProcessing}
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {imports.map((import_) => {
          const stats = calculateStats(import_.keywords);
          const isConverted = convertedProjects.has(import_.timestamp);

          return (
            <div key={import_.id} className="border rounded-lg p-4 hover:border-indigo-200 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{import_.filename}</p>
                    <span className="text-sm text-gray-500">•</span>
                    <p className="text-sm text-gray-500">
                      {formatDate(import_.createdAt)}
                    </p>
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <StatsCard 
                      label="Keywords" 
                      value={stats.keywordCount.toLocaleString()} 
                      color="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800"
                    />
                    <StatsCard 
                      label="Total Volume" 
                      value={stats.totalVolume.toLocaleString()} 
                      color="bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-800"
                    />
                    <StatsCard 
                      label="Avg. KD" 
                      value={stats.avgDifficulty} 
                      color="bg-gradient-to-br from-purple-50 to-purple-100 text-purple-800"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => onDeleteEntry(import_.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {isConverted ? (
                    <>
                      <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
                        Project Created
                      </span>
                      <button
                        onClick={() => handleRetriggerWebhook(import_)}
                        disabled={isProcessing}
                        className="p-2 text-indigo-600 hover:text-indigo-700 transition-colors disabled:opacity-50"
                        title="Re-send to webhook"
                      >
                        <Rocket className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleCreateProject(import_)}
                      disabled={isProcessing}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Convert to Project
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}