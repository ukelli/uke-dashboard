/**
 * 根据具体的业务制定所有的查询条件
 */

import { GetDefaultDateInfo } from "basic-helper";

const demoGetFormFromRemote = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        value1: '哈哈',
        value2: '呵呵',
        value3: '嘻嘻',
      });
    }, 1000);
  });
};

const Conditions = {
  demo: {
    type: 'input',
    title: '测试输入',
    defaultValue: '123'
  },
  selectDemo: {
    type: 'select',
    ref: 'Select',
    title: '下拉选择',
    desc: '下拉选择的描述',
    values: {
      val1: '下拉选择类型1',
      val2: '下拉选择类型2',
      val3: '下拉选择类型3',
      val4: '下拉选择类型4',
    }
  },
  datetimeRange: () => {
    const dateRange = GetDefaultDateInfo(0, 0);
    return {
      type: 'datetimeRange',
      refs: ['startData', 'endDate'],
      // needTime: false,
      range: dateRange
    };
  },
  asyncCon: async () => {
    const values = await demoGetFormFromRemote();
    return {
      type: 'select',
      ref: 'Select',
      title: '下拉选择',
      desc: '下拉选择的描述',
      values
    };
  }
};

export default Conditions;