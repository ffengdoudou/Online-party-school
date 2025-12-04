# 视频暂停取消 + 倍速控制脚本

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-4.19+-blue.svg)](https://www.tampermonkey.net/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.1-orange.svg)](https://github.com/yourusername/video-speed-control)

一个功能强大的 Tampermonkey 用户脚本，用于取消视频自动暂停功能并添加便捷的倍速控制面板。

## ✨ 功能特性

- 🎯 **智能倍速控制** - 支持 1x 到 6x 的倍速调节
- 🚫 **取消自动暂停** - 阻止页面切换时的视频暂停
- 🎮 **简洁控制面板** - 固定在右上角的迷你控制界面
- 🔄 **自动视频切换** - 视频播放完成后自动跳转到下一个
- 🎨 **现代化UI** - 半透明毛玻璃效果，美观实用
- 📱 **响应式设计** - 适配各种屏幕尺寸

## 🚀 快速开始

### 安装要求

- [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展（4.19+版本）
- 支持的用户脚本的浏览器（Chrome、Firefox、Edge等）

### 安装步骤

1. 安装 Tampermonkey 浏览器扩展
2. 点击下面的链接安装脚本：
   
   **[点击安装脚本](https://github.com/yourusername/video-speed-control/raw/main/cancel_video_pause.js)**

3. 或者手动复制代码到 Tampermonkey：
   - 打开 Tampermonkey 仪表板
   - 点击 "+" 创建新脚本
   - 复制本项目的 `cancel_video_pause.js` 内容
   - 保存脚本

### 使用方法

1. 访问支持的目标网站（如：`https://wsdx.zafu.edu.cn/zsdy/play*`）
2. 页面加载完成后，右上角会出现倍速控制面板
3. 点击按钮设置想要的播放速度（1x-6x）
4. 视频播放完成后会自动切换到下一个视频

## 🎯 功能详解

### 倍速控制面板

- **当前倍速显示**：红色高亮显示当前播放速度
- **快速设置按钮**：1x 到 6x 的预设倍速选项
- **实时更新**：点击按钮即时生效，无需刷新页面
- **视觉反馈**：选中按钮高亮显示，悬停有动画效果

### 自动暂停取消

- **后台播放**：即使切换标签页，视频也不会暂停
- **事件劫持**：拦截 visibilitychange 事件
- **方法覆盖**：覆盖 loop_pause 定时暂停方法

### 智能视频切换

- **播放完成检测**：自动检测视频结束事件
- **列表遍历**：智能识别视频播放列表
- **自动跳转**：播放完成后自动切换到下一个视频
- **完成提示**：所有视频播放完成后显示提示信息

## 🛠️ 技术架构

```
视频控制脚本架构
├── 初始化模块
│   ├── 页面加载检测
│   ├── 视频元素查找
│   └── 控制面板创建
├── 倍速控制模块
│   ├── 速度设置
│   ├── 界面更新
│   └── 事件监听
├── 暂停取消模块
│   ├── 事件劫持
│   └── 方法覆盖
└── 视频切换模块
    ├── 播放完成检测
    ├── 列表遍历
    └── 自动跳转
```

## 🔧 自定义配置

脚本支持以下自定义配置（通过修改代码中的常量）：

```javascript
// 支持的倍速范围
const SPEED_OPTIONS = [1, 2, 3, 4, 5, 6];

// 控制面板位置和样式
const PANEL_CONFIG = {
    top: '10px',
    right: '10px',
    width: '120px'
};
```

## 🌐 支持的网站

当前脚本主要针对以下域名：
- `https://wsdx.zafu.edu.cn/zsdy/play*`

可以通过修改 `@match` 元数据来扩展支持更多网站。

## 📝 开发指南

### 本地开发

1. 克隆或下载项目文件
2. 在 Tampermonkey 中创建新脚本
3. 复制代码并保存
4. 刷新目标页面测试功能

### 调试方法

- 打开浏览器开发者工具（F12）
- 查看控制台日志了解脚本运行状态
- 使用 `console.log` 输出调试信息

### 扩展功能

可以扩展的功能包括：
- 更多倍速选项（如 0.5x、0.75x等）
- 自定义倍速输入
- 快捷键支持
- 设置保存功能

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交 Issue

- 描述遇到的问题或功能需求
- 提供重现步骤和浏览器信息
- 附上相关截图或日志

### 提交 Pull Request

1. Fork 本项目
2. 创建功能分支
3. 提交代码变更
4. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Tampermonkey](https://www.tampermonkey.net/) - 强大的用户脚本管理器
- 所有贡献者和用户