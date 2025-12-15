import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Video, Upload, AlertCircle, Save, BookOpen, Clock, Trash2, Eye, FileJson, Copy, Check, X, FileText, Code, PlayCircle, Edit2 } from 'lucide-react';
import { generateRuleDescription } from '../services/geminiService';
import { Rule } from '../types';

const INITIAL_RULES: Rule[] = [
    {
        id: 'R01',
        name: '安全帽佩戴检测',
        description: 'Check for hard hat presence on all personnel.',
        originalIntent: '检测所有进入施工区域的人员是否佩戴了安全帽，如果没有佩戴，立即报警。',
        standardDefinition: JSON.stringify({
            rule_metadata: { name: "Safety Helmet Detection", category: "safety", severity: "high" },
            visual_detection: { target_objects: ["person"], required_attributes: ["wearing helmet"], negative_constraints: ["none"] },
            trigger_logic: { condition_description: "IF Person detected AND NOT wearing Helmet THEN trigger", temporal_threshold_seconds: 1 },
            response_action: { alert_message: "Warning: Personnel detected without safety helmet", suggested_actions: ["Broadcast Warning"] }
        }, null, 2),
        severity: 'high',
        triggerType: 'image',
        examples: ['https://picsum.photos/400/300?random=20'],
        createdAt: '2025-11-10'
    },
    {
        id: 'R02',
        name: '禁区人员入侵',
        description: 'Identify any human figures detected within the marked red zone.',
        originalIntent: '监控红色警戒区域，如果有人员闯入，或者是动物闯入，需要区分。主要检测人。',
        standardDefinition: JSON.stringify({
            rule_metadata: { name: "Restricted Zone Intrusion", category: "security", severity: "critical" },
            visual_detection: { target_objects: ["person"], required_attributes: ["inside restricted zone"], negative_constraints: ["animal", "machinery"] },
            trigger_logic: { condition_description: "IF Person detected inside Zone A THEN trigger", temporal_threshold_seconds: 0 },
            response_action: { alert_message: "Critical: Unauthorized person in restricted zone", suggested_actions: ["Notify Security", "Lockdown"] }
        }, null, 2),
        severity: 'critical',
        triggerType: 'video',
        examples: ['https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'], // Sample video
        createdAt: '2025-11-12'
    },
    {
        id: 'R03',
        name: '明火烟雾识别',
        description: 'Detect visual signatures of fire or smoke plumes.',
        originalIntent: '识别任何可见的明火或者大量烟雾，防止火灾。',
        standardDefinition: JSON.stringify({
            rule_metadata: { name: "Fire and Smoke Detection", category: "safety", severity: "critical" },
            visual_detection: { target_objects: ["fire", "smoke"], required_attributes: ["orange flickering light", "grey/white cloud"], negative_constraints: ["none"] },
            trigger_logic: { condition_description: "IF Fire OR Smoke detected THEN trigger", temporal_threshold_seconds: 3 },
            response_action: { alert_message: "Emergency: Fire detected", suggested_actions: ["Trigger Fire Alarm", "Call 119"] }
        }, null, 2),
        severity: 'critical',
        triggerType: 'image',
        examples: ['https://picsum.photos/400/300?random=21'],
        createdAt: '2025-11-15'
    }
];

const RuleEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'library'>('create');
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  
  // Create Tab State
  const [intent, setIntent] = useState('');
  const [generatedRule, setGeneratedRule] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);

  // Library Tab State
  const [viewRule, setViewRule] = useState<Rule | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setSelectedVideo(null);
      setVideoName(null);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setSelectedVideo(file);
          setVideoName(file.name);
          setSelectedImage(null);
          setImagePreview(null);
      }
  };

  const handleGenerate = async () => {
    if (!intent && !imagePreview && !selectedVideo) return;
    
    setIsGenerating(true);
    let base64Data = undefined;
    let mimeType = undefined;

    if (imagePreview && selectedImage) {
        base64Data = imagePreview.split(',')[1];
        mimeType = selectedImage.type;
    }

    // Call service
    const resultJSONString = await generateRuleDescription(intent, base64Data, mimeType);
    
    // Format JSON for display
    try {
        const parsed = JSON.parse(resultJSONString);
        setGeneratedRule(JSON.stringify(parsed, null, 2));
    } catch (e) {
        setGeneratedRule(resultJSONString); // Fallback if not valid JSON
    }
    
    setIsGenerating(false);
  };

  const handleSaveRule = () => {
    if (!generatedRule) return;

    try {
        const parsedJSON = JSON.parse(generatedRule);
        
        // Extract details from parsed JSON safely
        const ruleName = parsedJSON.rule_metadata?.name || "New Generated Rule";
        const ruleSeverity = parsedJSON.rule_metadata?.severity || "medium";
        const ruleDesc = parsedJSON.rule_metadata?.description || parsedJSON.trigger_logic?.condition_description || "No description";

        const newRule: Rule = {
            id: `R${Math.floor(1000 + Math.random() * 9000)}`, // Simple random ID
            name: ruleName,
            description: ruleDesc,
            originalIntent: intent,
            standardDefinition: generatedRule,
            severity: ruleSeverity,
            triggerType: selectedVideo ? 'video' : 'image',
            examples: imagePreview ? [imagePreview] : [], // Note: In a real app, this would be a persistent URL
            createdAt: new Date().toLocaleDateString()
        };

        setRules([newRule, ...rules]);
        setActiveTab('library');
        
        // Reset form
        setIntent('');
        setGeneratedRule('');
        setSelectedImage(null);
        setImagePreview(null);
        setSelectedVideo(null);
        setVideoName(null);

    } catch (error) {
        console.error("Failed to parse rule JSON for saving:", error);
        alert("无法保存：生成的规则格式无效。");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      
      {/* Header Tabs */}
      <div className="bg-white border-b border-gray-200 px-8 pt-6 pb-0 shadow-sm z-10">
         <div className="flex items-center justify-between mb-4">
             <div>
                <h1 className="text-2xl font-bold text-gray-800">规则引擎</h1>
                <p className="text-gray-500 text-sm mt-1">利用多模态大模型定义复杂的监管业务逻辑</p>
             </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                 <BookOpen size={18} />
                 查看使用文档
             </button>
         </div>
         <div className="flex space-x-8">
            <button 
                onClick={() => setActiveTab('create')}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'create' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                <Sparkles size={16} />
                智能定义
            </button>
            <button 
                onClick={() => setActiveTab('library')}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'library' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                <BookOpen size={16} />
                规则库 ({rules.length})
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'create' ? (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
             {/* Left: Configuration */}
             <div className="space-y-6">
               
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                     <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</span>
                     <h3 className="font-semibold text-lg text-gray-800">监管意图 (自然语言)</h3>
                  </div>
                  <textarea
                     className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
                     placeholder="例如：检测工人是否佩戴安全帽，或者是否有未经授权的人员进入禁区..."
                     value={intent}
                     onChange={(e) => setIntent(e.target.value)}
                  />
               </div>
     
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                     <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</span>
                     <h3 className="font-semibold text-lg text-gray-800">示例数据 (图片/视频)</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     {/* Image Upload */}
                     <div 
                        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden ${imagePreview ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                     >
                         <input 
                             type="file" 
                             accept="image/*" 
                             className="absolute inset-0 opacity-0 cursor-pointer z-10"
                             onChange={handleImageChange}
                         />
                         {imagePreview ? (
                             <img src={imagePreview} alt="Preview" className="w-full h-32 object-contain" />
                         ) : (
                             <>
                                <ImageIcon className="text-gray-400 mb-2" size={32} />
                                <span className="text-sm text-gray-500 font-medium">上传正例图片</span>
                             </>
                         )}
                     </div>
                     
                     {/* Video Upload */}
                     <div 
                        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden ${videoName ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                     >
                         <input 
                            type="file"
                            accept="video/*"
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            onChange={handleVideoChange}
                         />
                         {videoName ? (
                             <div className="flex flex-col items-center">
                                 <Video className="text-blue-500 mb-2" size={32} />
                                 <span className="text-sm text-blue-700 font-medium break-all px-2">{videoName}</span>
                             </div>
                         ) : (
                            <>
                                <Video className="text-gray-400 mb-2" size={32} />
                                <span className="text-sm text-gray-500 font-medium">上传视频片段</span>
                            </>
                         )}
                     </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                     <AlertCircle size={12} />
                     上传包含违规行为的图像或视频片段，帮助大模型更精准地提取特征。
                  </p>
               </div>
     
               <button 
                 onClick={handleGenerate}
                 disabled={isGenerating || (!intent && !imagePreview && !selectedVideo)}
                 className={`w-full py-3.5 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-all ${
                     isGenerating || (!intent && !imagePreview && !selectedVideo) 
                        ? 'bg-blue-300 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:scale-[1.01]'
                 }`}
               >
                 {isGenerating ? (
                     <>
                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                         正在分析多模态数据...
                     </>
                 ) : (
                     <>
                         <Sparkles size={20} />
                         生成形式化规则 (JSON)
                     </>
                 )}
               </button>
     
             </div>
     
             {/* Right: Output & Preview */}
             <div className="flex flex-col h-full">
                 <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
                     <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                         <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                             <FileJson size={20} className="text-purple-600"/>
                             规则定义预览
                         </h3>
                         <div className="flex items-center gap-2">
                             <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Edit2 size={12} /> 可编辑
                             </span>
                             <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200 font-medium">
                                 Gemini 2.5 Flash
                             </span>
                         </div>
                     </div>
                     
                     <div className="flex-1 bg-[#1e1e1e] font-mono text-sm relative group flex flex-col">
                         {generatedRule ? (
                             <>
                                <textarea
                                    className="flex-1 w-full h-full bg-transparent text-gray-300 p-6 outline-none resize-none leading-relaxed custom-scrollbar font-mono"
                                    value={generatedRule}
                                    onChange={(e) => setGeneratedRule(e.target.value)}
                                    spellCheck={false}
                                />
                                <button 
                                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    onClick={() => navigator.clipboard.writeText(generatedRule)}
                                    title="复制 JSON"
                                >
                                    <Copy size={16} />
                                </button>
                             </>
                         ) : (
                             <div className="absolute inset-0 flex items-center justify-center text-gray-600 flex-col">
                                 <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                    <Sparkles className="text-gray-600 opacity-50" size={32} />
                                 </div>
                                 <p className="text-gray-500 font-medium">等待生成规则...</p>
                                 <p className="text-gray-600 text-xs mt-2">在左侧输入意图并上传数据</p>
                             </div>
                         )}
                     </div>
     
                     <div className="p-6 border-t border-gray-100 bg-white">
                         <div className="flex justify-end gap-3">
                             <button className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                                 重置
                             </button>
                             <button 
                                onClick={handleSaveRule}
                                disabled={!generatedRule}
                                className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                                    generatedRule 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                             >
                                 <Save size={18} />
                                 保存到规则库
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
           </div>
        ) : (
            /* Rule Library Tab */
            <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {rules.map(rule => (
                    <div key={rule.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                    rule.triggerType === 'image' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100' : 'bg-pink-50 text-pink-600 group-hover:bg-pink-100'
                                }`}>
                                    {rule.triggerType === 'image' ? <ImageIcon size={24} /> : <Video size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{rule.name}</h3>
                                    <span className="text-xs text-gray-400 font-mono">ID: {rule.id}</span>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                                rule.severity === 'critical' ? 'bg-red-100 text-red-700' : 
                                rule.severity === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                                {rule.severity}
                            </span>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-600 font-mono leading-relaxed h-20 overflow-hidden relative">
                            {rule.description}
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-50 to-transparent"></div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                             <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Clock size={14} />
                                <span>Created: {rule.createdAt}</span>
                             </div>
                             <div className="flex gap-2">
                                <button 
                                    onClick={() => setViewRule(rule)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1" 
                                    title="查看详情"
                                >
                                    <Eye size={18} />
                                    <span className="text-xs font-medium">详情</span>
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="删除规则">
                                    <Trash2 size={18} />
                                </button>
                             </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rule Detail Modal */}
            {viewRule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
                             <div className="flex items-center gap-3">
                                 <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                     <BookOpen size={20} />
                                 </div>
                                 <div>
                                     <h3 className="text-xl font-bold text-gray-800">{viewRule.name}</h3>
                                     <p className="text-sm text-gray-500 font-mono">ID: {viewRule.id} • {viewRule.createdAt}</p>
                                 </div>
                             </div>
                             <button onClick={() => setViewRule(null)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                 <X size={24} />
                             </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                            {/* Left: Original Definition */}
                            <div className="flex-1 p-0 border-r border-gray-200 overflow-y-auto bg-white flex flex-col">
                                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                    <h4 className="text-sm font-bold text-gray-600 uppercase flex items-center gap-2">
                                        <FileText size={16} className="text-blue-500" />
                                        用户原始定义 (Human)
                                    </h4>
                                </div>
                                
                                <div className="p-6 space-y-8">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">监管意图 (Natural Language)</span>
                                        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-gray-800 leading-relaxed text-sm">
                                            {viewRule.originalIntent || viewRule.description}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">
                                            示例数据 ({viewRule.triggerType === 'video' ? 'Video Reference' : 'Image Reference'})
                                        </span>
                                        
                                        {viewRule.triggerType === 'video' ? (
                                            <div className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-black">
                                                 {viewRule.examples.length > 0 ? (
                                                    <video 
                                                        src={viewRule.examples[0]} 
                                                        controls 
                                                        className="w-full aspect-video" 
                                                        poster="https://picsum.photos/800/450?blur=10"
                                                    />
                                                 ) : (
                                                    <div className="aspect-video flex flex-col items-center justify-center text-gray-500">
                                                        <Video size={48} className="mb-2 opacity-50"/>
                                                        <p>无视频示例</p>
                                                    </div>
                                                 )}
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-3">
                                                {viewRule.examples.length > 0 ? (
                                                    viewRule.examples.map((img, idx) => (
                                                        <div key={idx} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                                                            <img src={img} alt="Example" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                            <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">Example {idx+1}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="col-span-2 py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200 text-gray-400 text-sm">
                                                        无示例图片
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Standard Definition */}
                            <div className="flex-1 p-0 bg-[#1e1e1e] overflow-hidden flex flex-col">
                                <div className="px-6 py-3 border-b border-gray-700 flex justify-between items-center bg-[#252526] shrink-0">
                                    <h4 className="text-sm font-bold text-gray-300 uppercase flex items-center gap-2">
                                        <Code size={16} className="text-green-400"/>
                                        系统标准定义 (JSON)
                                    </h4>
                                    <button 
                                        onClick={() => viewRule.standardDefinition && navigator.clipboard.writeText(viewRule.standardDefinition)}
                                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 transition-colors"
                                    >
                                        <Copy size={12} /> Copy
                                    </button>
                                </div>
                                <div className="flex-1 overflow-auto p-6 custom-scrollbar">
                                    <pre className="text-sm font-mono text-green-400 leading-relaxed whitespace-pre-wrap">
{viewRule.standardDefinition || `{
  "error": "No standard definition available for this rule.",
  "legacy_description": "${viewRule.description}"
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 shrink-0">
                            <button onClick={() => setViewRule(null)} className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors">
                                关闭
                            </button>
                            <button className="px-5 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center gap-2">
                                <Edit2 size={16} />
                                编辑规则
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </>
        )}
      </div>
    </div>
  );
};

export default RuleEngine;