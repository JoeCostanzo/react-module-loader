import React from 'react';
const log = console.log;
// TODO: Make each input more explicitly indicate required params / specs
// TODO: error messaging if mis-called
// TODO: perhaps need attention for handling 'object' type param functions

let astFacts = {};
let keptValues = {};

class ReactModuleLoader extends React.Component {
  constructor(props) {
    super(props);
    let { mounted, functionsKeyName, astKeyName } = this.props;
    if (
      mounted
      && functionsKeyName
      && mounted[functionsKeyName]
      && astKeyName
      && mounted[astKeyName]
    ) {
      Object.keys(mounted[functionsKeyName]).map((k, i) => {
        if (k) {
          astFacts[k] = {};
          const ind = mounted[astKeyName].length
            && (mounted[astKeyName].findIndex(obj => obj.name === k));
          if (
            typeof ind === 'number'
            && mounted[astKeyName][ind]
          ) {
            astFacts[k] = {...mounted[astKeyName][ind]};
            !astFacts[k].description && (astFacts[k].description = 'none');
            !astFacts[k].params || !astFacts[k].params.length && (astFacts[k].params = 'none');
          }

        }
      });
    }
    this.state = { astFacts };

    this.moduleFuncCaller = this.moduleFuncCaller.bind(this);
  };

  callFunc(
    e, k,
    { mounted, functionsKeyName } = this.props,
    { astFacts: res } = this.state
  ) {
    if (e) {
      e.preventDefault && (e.preventDefault());
      if (e) {
        res[k].return = mounted[functionsKeyName][k]();
        return this.setState({ res });
      }
    }
  }

  moduleFuncCaller(
    e, k, t, pi,
    { mounted, functionsKeyName } = this.props,
    { astFacts: res } = this.state
  ) {
    if (e) {
      e.preventDefault && (e.preventDefault());
      if (k && t && e.target && e.target.value) {
        let val = e.target.value;
        const args = val => typeof pi === 'number' && (pi > -1)
          ? new Array(keptValues[k] && (keptValues[k].length) || pi + 1).fill().map((_, i) => {
          if (i === pi) {
            return val;
          }
          if (keptValues[k] && keptValues[k][i] != undefined) {
            return keptValues[k][i];
          }
          return _;
        }) : [val];

        const keepValue = _val => {
          if (keptValues[k]) {
            return keptValues[k][pi] = _val;
          }
          keptValues[k] = new Array(pi + 1).fill();
          keptValues[k][pi] = _val;
        };

        if (t === 'array') {
          if (
            val.length
            && (val = val.split(''))
            && (Array.isArray(val))
          ) {
            keepValue([...val]);
            res[k].return = mounted[functionsKeyName][k](...args(val));
            return this.setState({ res });
          }
        }
        if (t === 'string') {
          if (
            val.length
            && (typeof val === 'string')
          ) {
            keepValue(val);
            res[k].return = mounted[functionsKeyName][k](...args(val));
            return this.setState({ res });
          }
        }
        if (t === 'number') {
          if (
            val = Number(val)
          ) {
            keepValue(val);
            res[k].return = mounted[functionsKeyName][k](...args(val));
            return this.setState({ res });
          }
        }
        if (t === 'int') {
          if (
            val = parseInt(val, 10)
          ) {
            keepValue(val);
            res[k].return = mounted[functionsKeyName][k](...args(val));
            return this.setState({ res });
          }
        }
      }
    }
  };

  componentDidMount() {
    // some logic here - we only test if the method is called
  }

  render() {
    const { astFacts: ast } = this.state;
    const paramDisplay = ({ fnKey, type, endElemIndex, param, paramIndex }) => (
      <li key={endElemIndex}>
        <p>
          Parameter {paramIndex}:<br/>
          Name:&nbsp;{param.name}<br/>
          Desc:&nbsp;{param.description}<br/>
          <input
            type={type === 'string' || type === 'array' ? 'text' : 'number'}
            onChange={(e) => this.moduleFuncCaller(e, fnKey, type, paramIndex)}/>
          <span> (type: {type})</span>
        </p>
      </li>
    );
    return (
      <div className='App'>
        <h1>React Module Loader</h1>
        {Object.keys(astFacts).map((fnKey, fnKeyIndex) => {
          return (
            <div key={fnKeyIndex}>
              <ul>
                <li><h3>Function name: {fnKey}</h3></li>
                <li><strong>Description:</strong> {astFacts[fnKey].description}</li>
                <div>
                  {astFacts[fnKey].params == undefined || !astFacts[fnKey].hasOwnProperty('params') ? (
                    <li><input type='submit' onClick={(e) => this.callFunc(e, fnKey)}/></li>
                  ) : (
                    Object.keys(astFacts[fnKey].params).map((paramKey, paramIndex) => {
                      if (
                        astFacts[fnKey].params[paramKey] && astFacts[fnKey].params[paramKey].type
                        && astFacts[fnKey].params[paramKey].type.names && astFacts[fnKey].params[paramKey].type.names.length
                      ) {
                        return astFacts[fnKey].params[paramKey].type.names.map((type, endElemIndex) => {
                          type = type.toLowerCase();
                          return (
                            paramDisplay({fnKey, type, endElemIndex, param: astFacts[fnKey].params[paramKey], paramIndex})
                          );
                        });
                      }
                      return (
                        <h3 key={paramIndex}>Warn: Something went wrong. Param has no defined 'type'.</h3>
                      );
                    })
                  )}
                </div>
                <li>
                  {ast[fnKey] && (ast[fnKey].return) && (
                    <p>
                      <span>Returned value:&nbsp;</span>
                      <strong>{ast[fnKey].return}</strong>
                    </p>
                  )}
                </li>
              </ul>
              <hr className='flex'/>
            </div>
          );
        })}
      </div>
    )
  }
}

ReactModuleLoader.defaultProps = {
  mounted: 'object',
  functionsKeyName: 'string',
  astKeyName: 'string'
};

export default ReactModuleLoader;

/**
 * Created by joec on 4/4/2017.
 */
