const mongoose = require('mongoose');

const ExperimentModel = mongoose.model('Experiment');
const TemplateModel = mongoose.model('Template');
const CachePromptModel = mongoose.model('CachePrompt');

const { runPrompt } = require('./runPrompt');

async function saveCache(template, initPrompt, prompt, output) {
  let expired = new Date();
  if (template.retentionSettings.cacheTimeoutUnit === 'months') {
    expired.setMonth(expired.getMonth() + template.retentionSettings.cacheTimeoutValue);
  }
  else if (template.retentionSettings.cacheTimeoutUnit === 'weeks') {
    expired.setDate(expired.getDate() + 7 * template.retentionSettings.cacheTimeoutValue);
  }
  else if (template.retentionSettings.cacheTimeoutUnit === 'days') {
    expired.setDate(expired.getDate() + template.retentionSettings.cacheTimeoutValue);
  }
  else if (template.retentionSettings.cacheTimeoutUnit === 'hours') {
    expired.setHours(expired.getHours() + template.retentionSettings.cacheTimeoutValue);
  }
  else if (template.retentionSettings.cacheTimeoutUnit === 'minutes') {
    expired.setMinutes(expired.getMinutes() + template.retentionSettings.cacheTimeoutValue);
  }
  else if (template.retentionSettings.cacheTimeoutUnit === 'seconds') {
    expired.setSeconds(expired.getSeconds() + template.retentionSettings.cacheTimeoutValue);
  }

  const request = {
    template: template._id,
    cacheConditions: template.retentionSettings.cacheConditions,
    initPrompt: initPrompt,
    input: prompt,
    output: output,
    expired: expired
  };

  const response = await new CachePromptModel(request).save();

  return response;
}

async function loadCache(template) {
  const dateNow = new Date();
  const query = {
    // Example greater than condition
    template: template._id,
    expired: { $gt: dateNow },
    // Add more conditions as needed
  };
  const cached = await CachePromptModel.findOne(query).exec();
  return cached;
}

async function postData(prompt) {
    try {
        const response = await runPrompt(prompt);
        if (!response. data) {
          console.error('Error posting data:');
          return null;
        }
        return response; // Assuming the API returns some data
    } catch (error) {
        console.error('Error posting data:', error);
        throw error; // Re-throw the error for handling elsewhere if needed
    }
}

function checkEachCriteria(compareItem, conditionOperator, conditionValue) {
  let res = false;
  if (conditionOperator === 'EQ' && compareItem == conditionValue) {
    res = true;
  }
  if (conditionOperator === 'NEQ' && compareItem != conditionValue) {
    res = true;
  }
  if (conditionOperator === 'LT' && compareItem < conditionValue) {
    res = true;
  }
  if (conditionOperator === 'LTE' && compareItem <= conditionValue) {
    res = true;
  }
  if (conditionOperator === 'GT' && compareItem > conditionValue) {
    res = true;
  }
  if (conditionOperator === 'GTE' && compareItem >= conditionValue) {
    res = true;
  }
  if (conditionOperator === 'IN' && compareItem.indexOf(conditionValue) > -1) {
    res = true;
  }
  if (conditionOperator === 'NOTIN' && compareItem.indexOf(conditionValue) == -1) {
    res = true;
  }
  return res;
}

function checkCriteria(ruleLogic, rules, initPrompt, template) {
  const { promptEnhancers = [], ...other } = template;
  let results = (ruleLogic === 'All');
  for (let rule of rules) {
    let compareItem, conditionOperator, conditionValue, res;

    conditionOperator = rule.conditionOperator;
    conditionValue = rule.conditionValue;

    if (rule.conditionType === 'initPrompt' ||
    rule.conditionType === 'initial_prompt' ||
    rule.conditionType === 'init_prompt') {
      compareItem = initPrompt;
    }
    else if (rule.conditionType === 'key') {
      for (let enhancer of promptEnhancers) {
        if (enhancer.key.toLowerCase() === rule.conditionItem.toLowerCase()) {
          compareItem = enhancer.value;
        }
      }
    }

    if (compareItem && conditionOperator && conditionValue) {
      res = checkEachCriteria(compareItem, conditionOperator, conditionValue);
    }
    else {
      res = true;
    }

    results = (ruleLogic === 'All') ? results && res : results || res;
  }

  if (rules.length == 0) {
    results = true;
  }

  return results;
}

async function processExperiment(experiment, chatHistory) {
    let results = [];
    const { templates = [], initPrompt, style, ruleLogic, rules, ...other } = experiment;

    for (let i in templates) {
      const template = await TemplateModel.findById(templates[i].templateCode).exec();
      let request = {};
      let result = null;
      const {
        promptEnhancers = [],
        promptOutput,
        chatgptSettings = [],
        retentionSettings = {}
      } = template;
      if (!template) {
        break;
      }

      // Check criteria
      let skipPrompt = !checkCriteria(ruleLogic, rules, initPrompt, template);

      // Assume that the keys are in expression of {{}}
      // Replace variables with values
      let messages = [], msg = {};

      // initial prompt or chat history
      if (style === 'Stand-alone') {
        // initial prompt as a system message
        msg = { role: 'system', content: initPrompt };
        messages.push(msg);
      }
      else {// conversational style
        if (!chatHistory) {
          break;
        }
        messages = [...messages, ...chatHistory[0]];
      }
      
      // current prompt as a user message
      let prompt;
      if (skipPrompt) {
        prompt = '';
      }
      else {
        prompt = promptOutput;
        for (let k in promptEnhancers) {
          const pattern = '{{' + promptEnhancers[k].key + '}}';
          prompt = prompt.replaceAll(pattern, promptEnhancers[k].value);
        }
      }
      msg = { role: 'user', content: prompt };
      messages.push(msg);

      // ChatGPT settings
      let Chatgpt_settings = {};
      for (let k in chatgptSettings) {
        let key;
        if (chatgptSettings[k].setting === 'language_model') {
          key = 'model';
        }
        else if (chatgptSettings[k].setting === 'stop_sequences') {
          key = 'stop';
        }
        else {
          key = chatgptSettings[k].setting;
        }
        const val = chatgptSettings[k].value;
        if (chatgptSettings[k].valueType === 'integer') {
          Chatgpt_settings[key] = parseInt(val);
        }
        else if (chatgptSettings[k].valueType === 'float') {
          Chatgpt_settings[key] = parseFloat(val);
        }
        else {
          Chatgpt_settings[key] = val;
        }
      }
      request = {messages, Chatgpt_settings};

      let cached = null;
      // Criteria
      if (!skipPrompt) {
        if (style === 'Stand-alone') {
          cached = await loadCache(template);
        }
        try {        
          if (!cached) {
            result = await postData(request);
            if (style === 'Stand-alone' && retentionSettings.useCache && result) {
              const resCache = await saveCache(template, initPrompt, prompt, result.data.output.content);
            }
          }
          else {
            result = {
              message: 'Caching has done successfully.',
              data: {
                input: request,
                output: {
                  role: 'assistant',
                  content: cached.output
                }
              }
            };
          }
        } catch (error) {
            console.error('Failed to post data for:');
        }
      }
      else {
        result = {
          message: 'Artifact skipped by criteria.',
          data: {
            input: request,
            output: {
              role: 'assistant',
              content: ''
            }
          }
        };
      }
      results.push(result);
    }
    return results;
}

exports.runTest = async (experiments) => {
  let expList = experiments;
  let chatHistory = [];
  let results = [];
  
  for (let i in experiments) {
    const experiment = await ExperimentModel.findById(experiments[i].experiment).exec();
    if (!experiment) {
      break;
    }
    const result = await processExperiment(experiment, chatHistory);
    
    if (!result) {
      break;
    }

    chatHistory = [];
    for (let j in result) {
      chatHistory[j] = [];
      for (let k in result[j].data.input.messages) {
        chatHistory[j].push(result[j].data.input.messages[k]);
      }
      chatHistory[j].push(result[j].data.output);
    }
    results.push(result);
  }
  return results;
}