import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ModelManagement from './components/ModelManagement';
import RuleEngine from './components/RuleEngine';
import Dashboard from './components/Dashboard';
import DeviceManagement from './components/DeviceManagement';
import TaskManagement from './components/TaskManagement';
import NotificationManagement from './components/NotificationManagement';

const App: React.FC = () => {
  // Simple state-based router
  const [activeView, setActiveView] = useState('models'); // Default to models based on prompt image focus

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'models':
        return <ModelManagement />;
      case 'rules':
        return <RuleEngine />;
      case 'devices':
        return <DeviceManagement />;
      case 'tasks':
        return <TaskManagement />;
      case 'notifications':
        return <NotificationManagement />;
      default:
        // Fallback for views not yet implemented fully
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gray-600">模块开发中</h2>
            <p>该功能模块 "{activeView}" 即将上线</p>
            <button 
                onClick={() => setActiveView('models')}
                className="mt-6 text-blue-600 hover:underline"
            >
                返回模型管理
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col ml-64 h-full relative">
        {/* Top Header / Breadcrumb - Shared across views */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 shrink-0">
            <div className="flex items-center text-sm breadcrumbs text-gray-500">
                <span className="hover:text-blue-600 cursor-pointer">AIoT 平台</span>
                <span className="mx-2">/</span>
                <span className="font-medium text-gray-800 capitalize">
                    {activeView === 'dashboard' ? '首页' : 
                     activeView === 'models' ? '模型训练' :
                     activeView === 'rules' ? '规则引擎' : 
                     activeView === 'devices' ? '设备管理' :
                     activeView === 'tasks' ? '任务管理' :
                     activeView === 'notifications' ? '通知管理' : activeView}
                </span>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                        IoT
                    </div>
                    <span className="text-sm font-medium text-gray-700">管理员</span>
                </div>
            </div>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-hidden relative">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;