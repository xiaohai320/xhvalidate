import xiaohaiui from "xiaohai-elementui";
import _ from 'lodash';
import ValidateJS from 'validate.js';
import Ajv from 'ajv';

class WebFormValidator {
  constructor(customRules = {}, options = {}) {
    // 初始化Validate.js验证器
    this.validator = new ValidateJS(_.merge({ /* 默认规则 */ }, customRules), options);
    this.ajv = new Ajv();
  }

  // 基于Validate.js的基本验证方法
  validateModel(model, constraints) {
    return this.validator.validate(model, constraints);
  }

  // JSON Schema验证
  validateWithSchema(data, schema) {
    const isValid = this.ajv.validate(schema, data);
    if (!isValid) {
      throw new Error(this.ajv.errorsText());
    }
    return isValid;
  }

  // 添加默认的基础验证规则
  static getDefaultRules() {
    return {
      presence: {
        message: '不能为空',
      },
      numericality: {
        onlyInteger: false,
        greaterThan: 0,
        message: '必须是数值且大于0',
      },
      email: {
        message: '不是一个有效的电子邮件地址',
      },
      // ... 其他基础规则，如：长度、格式等
    };
  }

  // 示例：自定义验证规则
  addCustomRule(name, rule) {
    ValidateJS.validators[name] = rule;
  }

  // 示例：导出验证规则为JSON对象
  getRulesAsJSON() {
    // 获取并返回已配置的验证规则（包括自定义规则）
    return _.cloneDeep(this.validator._validatorSpec.rules);
  }

  // 其他复杂验证逻辑...
}

// 示例：使用自定义规则
WebFormValidator.addCustomRule('positiveNumber', function(value) {
  return Number(value) >= 0;
}, '必须是非负数');

// 初始化一个带有默认和自定义规则的验证器实例
const validator = new WebFormValidator(WebFormValidator.getDefaultRules());

// 使用验证器
const formData = { age: 'notANumber', email: 'invalid@email' };
const formConstraints = {
  age: { numericality: true },
  email: { presence: true, email: true },
};

const validationResult = validator.validateModel(formData, formConstraints);
if (!validationResult) {
  console.error(validator.getErrors());
}
