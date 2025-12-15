import React, { useState } from 'react';
import { 
  Camera, 
  Cpu, 
  Wifi, 
  WifiOff, 
  Plus, 
  MoreVertical, 
  MapPin, 
  Activity,
  Search,
  Filter
} from 'lucide-react';
import { Device } from '../types';

const MOCK_DEVICES: Device[] = [
  { id: '1', name: '东门高清摄像头 A01', type: 'Camera', status: 'online', location: '厂区东门', streamUrl: 'rtsp://...' },
  { id: '2', name: '车间巡检机器狗 R01', type: 'Robot Dog', status: 'online', location: '装配车间 B区', streamUrl: 'rtsp://...' },
  { id: '3', name: '仓库广角摄像头 C03', type: 'Camera', status: 'warning', location: '成品仓库', streamUrl: 'rtsp://...' },
  { id: '4', name: '周界红外传感器 S01', type: 'Sensor', status: 'online', location: '北墙围栏', streamUrl: '' },
  { id: '5', name: '无人机巡逻队 D01', type: 'Drone', status: 'offline', location: '停机坪', streamUrl: '' },
];

const DeviceManagement: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const getIcon = (type: string) => {
    switch(type) {
      case 'Robot Dog': return <Cpu size={20} />;
      case 'Drone': return <Activity size={20} />;
      case 'Sensor': return <Activity size={20} />;
      default: return <Camera size={20} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Controls */}
      <div className="bg-white border-b border-gray-200 p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索设备名称/ID/IP..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
            />
          </div>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-gray-50">
             <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${filter === 'all' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
             >
                全部
             </button>
             <button 
                onClick={() => setFilter('online')}
                className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${filter === 'online' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
             >
                在线
             </button>
             <button 
                onClick={() => setFilter('offline')}
                className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${filter === 'offline' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
             >
                离线
             </button>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">
          <Plus size={18} />
          接入新设备
        </button>
      </div>

      {/* Device List */}
      <div className="p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_DEVICES.map(device => (
            <div key={device.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    device.status === 'online' ? 'bg-blue-50 text-blue-600' : 
                    device.status === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {getIcon(device.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{device.name}</h3>
                    <p className="text-xs text-gray-500 font-mono">ID: {device.id}002938</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 ${
                    device.status === 'online' ? 'bg-green-100 text-green-700' :
                    device.status === 'warning' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                }`}>
                    {device.status === 'online' ? <Wifi size={12}/> : <WifiOff size={12}/>}
                    {device.status === 'online' ? '在线' : device.status === 'warning' ? '异常' : '离线'}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                   <span className="text-gray-500 flex items-center gap-2">
                     <MapPin size={14} /> 位置
                   </span>
                   <span className="text-gray-700 font-medium">{device.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <span className="text-gray-500 flex items-center gap-2">
                     <Filter size={14} /> 类型
                   </span>
                   <span className="text-gray-700 font-medium">{device.type}</span>
                </div>
                 <div className="flex items-center justify-between text-sm">
                   <span className="text-gray-500 flex items-center gap-2">
                     <Activity size={14} /> 信号强度
                   </span>
                   <div className="flex gap-0.5">
                       <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
                       <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
                       <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
                       <div className="w-1 h-3 bg-gray-200 rounded-sm"></div>
                   </div>
                </div>
              </div>

              <div className="mt-auto flex gap-3">
                 <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                    配置参数
                 </button>
                 <button className="flex-1 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 font-medium hover:bg-blue-100 transition-colors">
                    查看视频流
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;