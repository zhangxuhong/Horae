import React from 'react';
import { Mail, MessageSquare, Globe, Plus, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';

const NotificationManagement: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">通知管理</h1>
        <p className="text-gray-500">配置系统告警的触达方式，包括邮件服务器、短信网关及第三方 Webhook 集成。</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Email Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Mail size={20} /></div>
                    <div>
                        <h3 className="font-bold text-gray-800">邮件通知</h3>
                        <p className="text-xs text-gray-500">SMTP 服务器配置</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle size={14} /> 已启用
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer ml-2">
                      <input type="checkbox" checked className="sr-only peer" readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">SMTP 服务器</label>
                        <input type="text" value="smtp.enterprise.com" readOnly className="mt-1 w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">端口</label>
                        <input type="text" value="465" readOnly className="mt-1 w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700" />
                    </div>
                    <div className="col-span-2">
                         <label className="text-xs font-semibold text-gray-500 uppercase">发件人邮箱</label>
                        <input type="text" value="alert@aiot-monitor.com" readOnly className="mt-1 w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700" />
                    </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">默认接收人列表</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-all">
                            <span className="text-sm text-gray-700">admin@company.com</span>
                            <button className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-all">
                            <span className="text-sm text-gray-700">security_chief@company.com</span>
                            <button className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                        <button className="w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                            <Plus size={16} /> 添加接收人
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Webhook Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Globe size={20} /></div>
                    <div>
                        <h3 className="font-bold text-gray-800">Webhook 集成</h3>
                        <p className="text-xs text-gray-500">推送到第三方系统 (钉钉/飞书/企业微信)</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle size={14} /> 已启用
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer ml-2">
                      <input type="checkbox" checked className="sr-only peer" readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-800 text-sm">企业微信机器人</h4>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded uppercase font-bold">Active</span>
                        </div>
                        <p className="text-xs text-gray-500 break-all font-mono">https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=693axxx...</p>
                        <div className="flex justify-end gap-2 mt-2">
                            <button className="text-xs text-blue-600 hover:underline">测试连接</button>
                            <button className="text-xs text-gray-600 hover:underline">编辑</button>
                        </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-2 opacity-60">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-800 text-sm">钉钉群机器人</h4>
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] rounded uppercase font-bold">Inactive</span>
                        </div>
                        <p className="text-xs text-gray-500 break-all font-mono">https://oapi.dingtalk.com/robot/send?access_token=xxxx...</p>
                        <div className="flex justify-end gap-2 mt-2">
                             <button className="text-xs text-gray-600 hover:underline">启用</button>
                            <button className="text-xs text-gray-600 hover:underline">编辑</button>
                        </div>
                    </div>
                </div>
                <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} /> 新增 Webhook
                </button>
            </div>
        </div>

        {/* SMS Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden xl:col-span-2">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><MessageSquare size={20} /></div>
                    <div>
                        <h3 className="font-bold text-gray-800">短信通知</h3>
                        <p className="text-xs text-gray-500">短信网关及模板配置</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-medium flex items-center gap-1">
                        <XCircle size={14} /> 未启用
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer ml-2">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
            <div className="p-6 text-center text-gray-400 py-12">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                <p>短信服务当前未激活</p>
                <button className="mt-4 px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">立即配置</button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default NotificationManagement;