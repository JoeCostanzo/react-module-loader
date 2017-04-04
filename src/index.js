import React from 'react';

// TODO: Make each input more explicitly indicate required params / specs
// TODO: error messaging if mis-called

let results = {};
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
          results[k] = {};
          const ind = mounted[astKeyName].length
            && (mounted[astKeyName].findIndex(obj => obj.name === k));
          if (
            typeof ind === 'number'
            && mounted[astKeyName][ind]
          ) {
            results[k].description = ind
              && (mounted[astKeyName][ind].description)
              && (mounted[astKeyName][ind].description) || 'none';
            results[k].params = mounted[astKeyName][ind].params && (mounted[astKeyName][ind].params.length) ? {} : 'none';
            if (
              typeof results[k].params === 'object'
            ) {
              mounted[astKeyName][ind].params.map((p, i) => {
                results[k].params[`p${i}_types`] = p && (p.type)
                && (p.type.names) ? p.type.names : 'none';
              });
            }
          }

        }
      });
    }
    this.state = { results };

    this.flexHandler = this.flexHandler.bind(this);
  };

  callFunc(
    e, k,
    { mounted, functionsKeyName } = this.props,
    { results: res } = this.state
  ) {
    if (e) {
      e.preventDefault && (e.preventDefault());
      if (e) {
        res[k].return = mounted[functionsKeyName][k]();
        return this.setState({ res });
      }
    }
  }

  flexHandler(
    e, k, t, pi,
    { mounted, functionsKeyName } = this.props,
    { results: res } = this.state
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
    const { results: res } = this.state;
    return (
      <div className='App'>
        <h1>React Module Loader</h1>
        {Object.keys(results).map((k, i) => {
          return (
            <div key={i}>
              <ul>
                <li><h3>Function name: {k}</h3></li>
                <li><strong>Description:</strong> {results[k].description}</li>
                <div>
                  {results[k].params != undefined && (results[k].params === 'none' ? (
                    <li><input type='submit' onClick={(e) => this.callFunc(e, k)}/></li>
                  ) : (
                    Object.keys(results[k].params).map((p, pi) => {
                      return (
                        p && (results[k].params[p].length) ? (results[k].params[p].map((t, ti) => {
                          t = t.toLowerCase();
                          return (
                            <li key={ti}>
                              <p>
                                Parameter {pi}:&nbsp;
                                <input
                                  type={t === 'string' || t === 'array' ? 'text' : 'number'}
                                  onChange={(e) => this.flexHandler(e, k, t, pi)}/>
                                <span> (type: {t})</span>
                              </p>
                            </li>
                          );
                        })) : null
                      );
                    })
                  ))}
                </div>
                <li>
                  {res[k] && (res[k].return) && (
                    <p>
                      <span>Returned value:&nbsp;</span>
                      <strong>{res[k].return}</strong>
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
