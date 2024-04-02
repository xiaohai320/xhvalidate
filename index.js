// 导入所需依赖库
import xiaohaiui from "xiaohai-elementui";
import _ from 'lodash';
import ValidateJS from 'validate.js';
import Ajv from 'ajv';

// 定义Web表单验证器类
class WebFormValidator {
  constructor(customRules = {}, options = {}) {
    // 初始化Validate.js验证器，并合并自定义规则与默认规则
    this.validator = new ValidateJS(_.merge(WebFormValidator.getDefaultRules(), customRules), options);
    
    // 初始化Ajv JSON Schema验证器
    this.ajv = new Ajv({ allErrors: true }); // 可以设置为保留所有验证错误

    // 添加自定义验证规则到Validate.js全局验证器（如果有的话）
    Object.entries(customRules).forEach(([name, rule]) => {
      if (typeof rule === 'function') {
        ValidateJS.validators[name] = rule;
      }
    });
  }

  // 基于Validate.js验证数据模型
  validateModel(model, constraints) {
    const result = this.validator.validate(model, constraints);
    return result === undefined || result === true;
  }

  // 获取验证失败信息
  getErrors() {
    return this.validator.format();
  }

  // 使用JSON Schema验证数据
  validateWithSchema(data, schema) {
    const isValid = this.ajv.validate(schema, data);
    if (!isValid) {
      throw new Error(`JSON Schema validation failed: ${this.ajv.errorsText()}`);
    }
    return isValid;
  }

  // 获取默认的基础验证规则
  static getDefaultRules() {
    return {
      presence: {
        message: '该字段不能为空',
      },
      numericality: {
        onlyInteger: false,
        greaterThan: 0,
        message: '必须是一个大于0的数字',
      },
      email: {
        message: '请输入有效的电子邮件地址',
      },
      // 添加更多默认规则...
    };
  }

  // 添加自定义验证规则
  addCustomRule(name, validatorFn, defaultMessage) {
    ValidateJS.validators[name] = {
      validate: validatorFn,
      message: defaultMessage || `不满足${name}规则`,
    };
  }

  // 将当前使用的验证规则导出为JSON对象
  getRulesAsJSON() {
    // 由于Validate.js内部结构可能不直接暴露所有规则详情，
    // 这里假设可以通过某种方式获取到实际规则集（实际上并不直接支持此操作）
    // 这部分需要根据Validate.js的实际API调整或简化为只返回自定义规则
    // return _.cloneDeep(this.validator._validatorSpec.rules);
    return this.customRules;
  }

  // 其他复杂验证逻辑的实现...
}

// 示例：添加自定义验证规则
WebFormValidator.addCustomRule('positiveNumber', value => Number(value) >= 0, '必须是非负数');

// 创建一个包含默认和自定义规则的验证器实例
const validator = new WebFormValidator(WebFormValidator.getDefaultRules());

// 准备待验证的数据
const formData = { age: 'notANumber', email: 'invalid@email' };

// 设置表单字段的约束条件
const formConstraints = {
  age: { numericality: true },
  email: { presence: true, email: true },
};

// 执行验证
const validationResult = validator.validateModel(formData, formConstraints);

if (!validationResult) {
  console.error('表单验证失败:', validator.getErrors());
}
