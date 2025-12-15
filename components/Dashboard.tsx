import React from 'react';
import { Activity, AlertTriangle, Camera, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const devices = [
    { id: 1, name: '东门摄像头 A01', type: 'Camera', status: 'online', thumbnail: 'https://picsum.photos/400/250?random=10' },
    { id: 2, name: '车间摄像头 B02', type: 'Camera', status: 'warning', thumbnail: 'https://picsum.photos/400/250?random=11' },
    { id: 3, name: '巡检机器狗 R01', type: 'Robot Dog', status: 'online', thumbnail: 'https://picsum.photos/400/250?random=12' },
    { id: 4, name: '仓库摄像头 C03', type: 'Camera', status: 'online', thumbnail: 'https://picsum.photos/400/250?random=13' },
  ];

  const alerts = [
    { id: 1, time: '10:42:01', rule: '未佩戴安全帽', location: '车间 B区', level: 'high' },
    { id: 2, time: '10:35:12', rule: '人员离岗', location: '中控室', level: 'medium' },
    { id: 3, time: '09:15:00', rule: '吸烟检测', location: '仓库门口', level: 'high' },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium">接入设备总数</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">24</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><Camera size={24}/></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium">运行中任务</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">8</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-green-600"><Activity size={24}/></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium">今日告警</p>
                <h3 className="text-2xl font-bold text-red-600 mt-1">12</h3>
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-red-600"><AlertTriangle size={24}/></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium">系统状态</p>
                <h3 className="text-xl font-bold text-green-600 mt-1">运行正常</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-green-600"><CheckCircle size={24}/></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Stream Grid (2/3 width) */}
        <div className="xl:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-blue-600"/>
                实时监控画面
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {devices.map(device => (
                    <div key={device.id} className="relative bg-black rounded-lg overflow-hidden group aspect-video">
                        <img src={device.thumbnail} alt={device.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Overlay UI */}
                        <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start bg-gradient-to-b from-black/70 to-transparent">
                            <span className="text-white text-sm font-medium flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                                {device.name}
                            </span>
                            <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                                {device.type}
                            </span>
                        </div>
                        
                        {/* Simulation of AI Bounding Box */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-green-500 w-24 h-32 rounded opacity-50"></div>
                        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-20 bg-green-500 text-black text-[10px] px-1 font-bold">
                            Normal (98%)
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Alert Feed (1/3 width) */}
        <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-500"/>
                实时告警事件
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {alerts.map(alert => (
                        <div key={alert.id} className="p-4 hover:bg-red-50 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-gray-800">{alert.rule}</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                    alert.level === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {alert.level === 'high' ? '严重' : '一般'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>{alert.location}</span>
                                <span>{alert.time}</span>
                            </div>
                        </div>
                    ))}
                    {/* Filler content */}
                    {[1,2,3,4].map(i => (
                         <div key={`old-${i}`} className="p-4 hover:bg-gray-50 transition-colors opacity-60">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-gray-700">安全帽检测通过</span>
                                <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
                                    正常
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>车间入口 C1</span>
                                <span>08:{45 - i}:00</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
