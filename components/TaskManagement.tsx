import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Plus, 
  MoreHorizontal, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  BrainCircuit,
  Eye,
  Bell,
  X,
  FileText,
  Image as ImageIcon,
  ArrowLeft,
  Calendar,
  Filter,
  Download,
  Search
} from 'lucide-react';
import { Task, TaskResultEvent } from '../types';

// Mock Data
const MOCK_TASKS: Task[] = [
  {
    id: 'T-1001',
    name: '车间安全帽检测任务',
    deviceIds: ['1', '4'],
    modelId: '1', // Safety Helmet Model
    ruleIds: ['R01'],
    notificationMethods: ['sms', 'email'],
    status: 'running',
  },
  {
    id: 'T-1002',
    name: '仓库防火火焰检测',
    deviceIds: ['3'],
    modelId: '4', // Fire Model
    ruleIds: ['R03'],
    notificationMethods: ['webhook'],
    status: 'running',
  },
  {
    id: 'T-1003',
    name: '夜间睡岗行为监控',
    deviceIds: ['2', '3'],
    modelId: '3', // Sleeping Model
    ruleIds: ['R05'],
    notificationMethods: ['email'],
    status: 'paused',
  }
];

const MOCK_RESULTS: TaskResultEvent[] = [
    {
        id: 'EVT-001',
        timestamp: '2025-11-21 10:42:01',
        ruleName: '未佩戴安全帽',
        confidence: 0.92,
        imageUrl: 'https://picsum.photos/600/400?random=101',
        description: '检测到人员未佩戴符合标准的安全帽'
    },
    {
        id: 'EVT-002',
        timestamp: '2025-11-21 10:45:15',
        ruleName: '未佩戴安全帽',
        confidence: 0.88,
        imageUrl: 'https://picsum.photos/600/400?random=102',
        description: '检测到人员未佩戴符合标准的安全帽'
    },
    {
        id: 'EVT-003',
        timestamp: '2025-11-21 11:12:30',
        ruleName: '禁区入侵',
        confidence: 0.95,
        imageUrl: 'https://picsum.photos/600/400?random=103',
        description: '非授权人员进入危险区域'
    },
    {
        id: 'EVT-004',
        timestamp: '2025-11-21 11:15:00',
        ruleName: '禁区入侵',
        confidence: 0.91,
        imageUrl: 'https://picsum.photos/600/400?random=104',
        description: '非授权人员进入危险区域'
    },
    {
        id: 'EVT-005',
        timestamp: '2025-11-21 12:30:45',
        ruleName: '未佩戴安全帽',
        confidence: 0.89,
        imageUrl: 'https://picsum.photos/600/400?random=105',
        description: '检测到人员未佩戴符合标准的安全帽'
    }
];

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const toggleStatus = (taskId: string) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, status: t.status === 'running' ? 'paused' : 'running' };
      }
      return t;
    }));
  };

  const handleViewResults = (task: Task) => {
      setSelectedTask(task);
      setViewMode('detail');
  };

  const handleBackToList = () => {
      setSelectedTask(null);
      setViewMode('list');
  };

  // --- DETAIL VIEW RENDERER ---
  if (viewMode === 'detail' && selectedTask) {
      return (
        <div className="flex flex-col h-full bg-gray-50 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Detail Page Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleBackToList}
                        className="p-2 -ml-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-gray-800">{selectedTask.name}</h1>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                selectedTask.status === 'running' 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                            }`}>
                                {selectedTask.status === 'running' ? '运行中' : '已暂停'}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span className="font-mono">ID: {selectedTask.id}</span>
                            <span className="flex items-center gap-1"><BrainCircuit size={12}/> {selectedTask.modelId === '1' ? '安全帽模型' : '通用检测模型'}</span>
                            <span className="flex items-center gap-1"><Eye size={12}/> {selectedTask.deviceIds.length} 设备监控中</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                     <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors bg-white">
                        <Download size={16} />
                        导出报告
                     </button>
                </div>
            </div>

            {/* Filters & Content */}
            <div className="flex-1 overflow-y-auto p-6">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-500">今日检测总数</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">1,248</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-500">预警事件</p>
                        <p className="text-2xl font-bold text-red-600 mt-1">{MOCK_RESULTS.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-500">平均置信度</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">94.2%</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-500">最近告警</p>
                        <p className="text-lg font-bold text-gray-800 mt-1 truncate">10分钟前</p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="搜索预警类型..." 
                                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 bg-white">
                                <Calendar size={16} />
                                <span>今日</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 bg-white">
                                <Filter size={16} />
                                <span>置信度 &gt; 80%</span>
                            </button>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        共找到 {MOCK_RESULTS.length} 条记录
                    </div>
                </div>

                {/* Event Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {MOCK_RESULTS.map((event) => (
                        <div key={event.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                <img 
                                    src={event.imageUrl} 
                                    alt="Event" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                                <div className="absolute top-3 left-3 flex gap-2">
                                     <span className="bg-red-600 text-white text-xs px-2 py-1 rounded shadow-sm font-semibold flex items-center gap-1">
                                        <AlertCircle size={12} /> {event.ruleName}
                                     </span>
                                </div>
                                <div className="absolute top-3 right-3">
                                     <span className="bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-mono">
                                        {event.confidence * 100}%
                                     </span>
                                </div>
                                {/* Hover Action */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                     <button className="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:bg-blue-50 transition-colors" title="查看图片">
                                        <ImageIcon size={20} />
                                     </button>
                                     <button className="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:bg-blue-50 transition-colors" title="查看录像回放">
                                        <Play size={20} />
                                     </button>
                                </div>
                            </div>
                            
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                                        <Clock size={14} />
                                        {event.timestamp}
                                    </div>
                                    <span className="text-xs text-gray-400">ID: {event.id}</span>
                                </div>
                                <p className="text-gray-800 font-medium text-sm mb-3 line-clamp-2">
                                    {event.description}
                                </p>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                        车间摄像头 A01
                                    </div>
                                    <button className="text-blue-600 text-sm hover:underline font-medium">详情 &gt;</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
  }

  // --- LIST VIEW RENDERER ---
  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      
      {/* Header Actions */}
      <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between">
         <div>
            <h1 className="text-xl font-bold text-gray-800">监管任务配置</h1>
            <p className="text-sm text-gray-500 mt-1">管理AI监察任务的运行状态、关联设备及报警策略</p>
         </div>
         <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors"
        >
            <Plus size={18} />
            新建监管任务
         </button>
      </div>

      {/* Task List Table */}
      <div className="p-6 overflow-y-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-medium">
                <th className="px-6 py-4">任务名称 / ID</th>
                <th className="px-6 py-4">关联模型</th>
                <th className="px-6 py-4">监管设备</th>
                <th className="px-6 py-4">通知方式</th>
                <th className="px-6 py-4">运行状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{task.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{task.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BrainCircuit size={16} className="text-blue-500"/>
                        {task.modelId === '1' ? '安全帽模型 v1.0' : 
                         task.modelId === '3' ? '睡岗模型 v1.0' : 
                         task.modelId === '4' ? '火焰模型 v1.0' : '通用检测模型'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Eye size={16} className="text-blue-500"/>
                        <span>{task.deviceIds.length} 台设备</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-1.5">
                        {task.notificationMethods.includes('email') && (
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">邮件</span>
                        )}
                        {task.notificationMethods.includes('sms') && (
                            <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-xs font-medium">短信</span>
                        )}
                        {task.notificationMethods.includes('webhook') && (
                            <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-xs font-medium">Webhook</span>
                        )}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        {task.status === 'running' ? (
                            <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold border border-green-100">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                运行中
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs font-bold border border-gray-200">
                                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                已暂停
                            </div>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <button 
                            onClick={() => handleViewResults(task)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium border border-transparent hover:border-blue-100"
                            title="查看运行结果"
                        >
                            <FileText size={16} /> 
                            <span>结果</span>
                        </button>
                        <div className="w-px h-4 bg-gray-300 mx-1"></div>
                        <button 
                            onClick={() => toggleStatus(task.id)}
                            className={`p-2 rounded-lg transition-colors ${
                                task.status === 'running' 
                                ? 'text-red-500 hover:bg-red-50' 
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={task.status === 'running' ? '暂停任务' : '启动任务'}
                        >
                            {task.status === 'running' ? <Pause size={18} /> : <Play size={18} />}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Creation Modal */}
      {showCreateModal && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-800">新建监管任务</h3>
                      <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                          <X size={20} />
                      </button>
                  </div>
                  <div className="p-6 space-y-6">
                      <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">任务名称</label>
                          <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="输入任务名称..." />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">选择AI模型</label>
                              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                  <option>安全帽识别模型 v1.0</option>
                                  <option>反光衣识别模型 v1.0</option>
                                  <option>火焰识别模型 v1.0</option>
                              </select>
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">关联规则</label>
                              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                  <option>R01 - 安全生产规范</option>
                                  <option>R02 - 禁区入侵检测</option>
                              </select>
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">选择设备</label>
                          <div className="border border-gray-300 rounded-lg p-3 h-32 overflow-y-auto space-y-2">
                              <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                  <input type="checkbox" className="rounded text-blue-600" />
                                  <span className="text-sm text-gray-700">东门摄像头 A01</span>
                                  <span className="text-xs bg-green-100 text-green-700 px-1.5 rounded ml-auto">在线</span>
                              </label>
                              <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                  <input type="checkbox" className="rounded text-blue-600" />
                                  <span className="text-sm text-gray-700">车间机器狗 R01</span>
                                  <span className="text-xs bg-green-100 text-green-700 px-1.5 rounded ml-auto">在线</span>
                              </label>
                              <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                  <input type="checkbox" className="rounded text-blue-600" />
                                  <span className="text-sm text-gray-700">仓库摄像头 C03</span>
                                  <span className="text-xs bg-orange-100 text-orange-700 px-1.5 rounded ml-auto">异常</span>
                              </label>
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">通知方式</label>
                          <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="checkbox" checked className="rounded text-blue-600" />
                                  <span className="text-sm text-gray-600">系统弹窗</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="checkbox" className="rounded text-blue-600" />
                                  <span className="text-sm text-gray-600">邮件通知</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="checkbox" className="rounded text-blue-600" />
                                  <span className="text-sm text-gray-600">短信通知</span>
                              </label>
                          </div>
                      </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">取消</button>
                      <button onClick={() => setShowCreateModal(false)} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">创建任务</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default TaskManagement;