import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BrainCircuit, 
  ShieldAlert, 
  Settings, 
  Bell, 
  Users, 
  Database,
  ScanEye,
  Box
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: '首页', icon: LayoutDashboard }, // Home
    { id: 'streams', label: '流媒体', icon: Video }, // Streaming
    { id: 'devices', label: '设备管理', icon: Box }, // Device Mgmt
    { id: 'models', label: '模型管理', icon: BrainCircuit }, // Model Mgmt (The main requested view)
    { id: 'rules', label: '规则引擎', icon: ShieldAlert }, // Rule Engine
    { id: 'tasks', label: '任务管理', icon: ScanEye }, // Task Mgmt
    { id: 'data', label: '数据标注', icon: Database }, // Data Labeling
    { id: 'users', label: '用户管理', icon: Users }, // User Mgmt
    { id: 'notifications', label: '通知管理', icon: Bell }, // Notification
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="h-16 flex items-center justify-center border-b border-gray-100">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <BrainCircuit size={28} />
            <span>AIoT Control</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">
          <Settings className="mr-3 h-5 w-5 text-gray-400" />
          系统设置
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
