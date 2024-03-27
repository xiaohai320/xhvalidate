

# xhvalidate

> 一个强大的Web表单验证库，支持复杂规则和自定义验证器

[![npm version](https://img.shields.io/npm/v/web-form-validation.svg)](https://www.npmjs.com/package/xhvalidate)

## 简介
`xhvalidate` 是一个专为Web应用程序设计的表单验证库，它整合了 `validate.js` 和 `ajv` 等优秀验证库的功能，提供了一套完整的解决方案，包括但不限于基本数据验证、JSON Schema验证以及自定义验证规则等。此外，该库还支持将验证规则导出为ZIP文件，便于在不同项目间复用和共享。

## 特性

- 支持内置的丰富验证规则，如必填、数字有效性、电子邮件格式等
- 支持JSON Schema验证，方便处理复杂数据结构
- 支持自定义验证规则，并可将自定义规则与其他内置规则无缝集成
- React友好，提供高阶组件包装，轻松集成到React项目中
- 验证规则可导出为ZIP文件，便于移植和复用

## 快速开始
### 安装

```bash
npm install xhvalidate