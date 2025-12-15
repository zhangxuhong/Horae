import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  LayoutGrid, 
  Eye, 
  Pencil, 
  Download, 
  Trash2, 
  X,
  Server,
  Cloud
} from 'lucide-react';
import { AIModel } from '../types';

const MOCK_MODELS: AIModel[] = [
  {
    id: '1',
    name: '安全帽模型',
    version: 'v1.0.1',
    framework: 'ONNX',
    type: 'Safety',
    description: '识别安全帽的模型',
    updatedAt: '2025/11/15',
    status: 'active',
    thumbnailUrl: 'https://picsum.photos/400/300?random=1',
    tags: ['ID: 1001', '版本: 1.0.1', '2025/11/15']
  },
  {
    id: '2',
    name: '反光衣模型',
    version: 'v1.0.0',
    framework: 'PyTorch',
    type: 'Safety',
    description: '识别反光衣的模型',
    updatedAt: '2025/11/14',
    status: 'active',
    thumbnailUrl: 'https://picsum.photos/400/300?random=2',
    tags: ['ID: 1002', '版本: 1.0.0', '2025/11/14']
  },
  {
    id: '3',
    name: '睡岗模型',
    version: 'v1.0.0',
    framework: 'PyTorch',
    type: 'Behavior',
    description: '识别在岗位睡觉的模型',
    updatedAt: '2025/11/12',
    status: 'active',
    thumbnailUrl: 'https://picsum.photos/400/300?random=3',
    tags: ['ID: 1003', '版本: 1.0.0', '2025/11/12']
  },
  {
    id: '4',
    name: '火焰模型',
    version: 'v1.0.0',
    framework: 'PyTorch',
    type: 'Hazard',
    description: '识别火焰的模型',
    updatedAt: '2025/11/10',
    status: 'active',
    thumbnailUrl: 'https://picsum.photos/400/300?random=4',
    tags: ['ID: 1004', '版本: 1.0.0', '2025/11/10']
  },
  {
    id: '5',
    name: 'GPT-4o Vision',
    version: 'latest',
    framework: 'OpenAI',
    type: 'General',
    description: '云端多模态大模型',
    updatedAt: '2025/11/20',
    status: 'active',
    thumbnailUrl: 'https://picsum.photos/400/300?random=99',
    tags: ['ID: 9001', 'Cloud', 'OpenAI'],
    apiConfig: {
      endpoint: 'https://api.openai.com/v1',
      modelName: 'gpt-4o'
    }
  },
];

const ModelManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModelType, setNewModelType] = useState<'local' | 'cloud'>('local');

  const tabs = [
    { id: 'manage', label: '模型管理' },
    { id: 'inference', label: '模型推理' },
    { id: 'export', label: '模型导出' },
    { id: 'deploy', label: '模型部署' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Top Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 pt-2">
        <div className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex-1 overflow-y-auto">
        
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2 w-full max-w-md">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">模型名称</label>
              <input
                type="text"
                placeholder="请输入模型名称"
                className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                  重置
                </button>
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  查询
                </button>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">模型列表</h2>
          <div className="flex items-center gap-3">
            <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={16} />
              新增模型
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <LayoutGrid size={16} />
              切换视图
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
          {MOCK_MODELS.map((model) => (
            <div key={model.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
              {/* Image Area */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={model.thumbnailUrl} 
                  alt={model.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded shadow-sm text-white ${model.framework === 'OpenAI' ? 'bg-purple-600' : 'bg-blue-500'}`}>
                    {model.framework}
                  </span>
                  <span className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
                    {model.version}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-blue-600 cursor-pointer hover:underline">
                    {model.name}
                  </h3>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-2 mb-3">
                   {model.tags.map((tag, idx) => {
                     let bgClass = "bg-gray-100 text-gray-600";
                     if (idx === 0) bgClass = "bg-blue-500 text-white"; 
                     if (idx === 1 && model.framework !== 'OpenAI') bgClass = "bg-green-500 text-white";
                     if (model.framework === 'OpenAI' && tag === 'OpenAI') bgClass = "bg-purple-500 text-white";
                     return (
                      <span key={idx} className={`text-[10px] px-2 py-0.5 rounded ${bgClass}`}>
                        {tag}
                      </span>
                     );
                   })}
                </div>

                <p className="text-gray-500 text-xs mb-4 flex-1 line-clamp-2">
                  {model.description}
                </p>

                {/* Actions Footer */}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-2">
                   <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-full transition-colors" title="查看详情">
                      <Eye size={16} />
                   </button>
                   <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-full transition-colors" title="编辑">
                      <Pencil size={16} />
                   </button>
                   <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-full transition-colors" title="下载">
                      <Download size={16} />
                   </button>
                   <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-full transition-colors" title="删除">
                      <Trash2 size={16} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Model Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800">新增 AI 模型</h3>
                    <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6">
                    {/* Type Selector */}
                    <div className="flex gap-4 mb-6">
                        <button 
                            onClick={() => setNewModelType('local')}
                            className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${newModelType === 'local' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300 text-gray-600'}`}
                        >
                            <Server size={24} />
                            <span className="font-semibold">本地部署模型</span>
                            <span className="text-xs text-gray-500">上传 ONNX / PyTorch 权重文件</span>
                        </button>
                        <button 
                            onClick={() => setNewModelType('cloud')}
                            className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${newModelType === 'cloud' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300 text-gray-600'}`}
                        >
                            <Cloud size={24} />
                            <span className="font-semibold">云端大模型服务</span>
                            <span className="text-xs text-gray-500">OpenAI API 兼容接口</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">模型名称</label>
                            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="例如：Site Safety Monitor V2" />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">功能描述</label>
                            <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none" placeholder="描述模型的主要功能和应用场景..." />
                        </div>

                        {newModelType === 'local' ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">框架类型</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none">
                                            <option>PyTorch</option>
                                            <option>TensorFlow</option>
                                            <option>ONNX</option>
                                            <option>TensorRT</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">版本号</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none" placeholder="v1.0.0" />
                                    </div>
                                </div>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center text-gray-500">
                                    <span className="text-sm">拖拽模型权重文件到此处，或点击上传</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">API Endpoint (Base URL)</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none font-mono text-sm" placeholder="https://api.openai.com/v1" defaultValue="https://api.openai.com/v1" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">API Key</label>
                                        <input type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none font-mono text-sm" placeholder="sk-..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Model ID</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none font-mono text-sm" placeholder="gpt-4-turbo" />
                                    </div>
                                </div>
                                <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs flex items-start gap-2">
                                    <span className="font-bold">提示:</span>
                                    支持所有兼容 OpenAI Chat Completions API 规范的服务，包括 OpenAI, Azure OpenAI, LocalAI, vLLM 等。
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">取消</button>
                    <button onClick={() => setShowAddModal(false)} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        {newModelType === 'local' ? '开始上传' : '验证并保存'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ModelManagement;