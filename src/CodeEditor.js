import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { saveAs } from 'file-saver';


class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      isLocked: false,
    };
  }

  handleChange = (newCode) => {
    this.setState({ code: newCode });
  };

  handleCopy = () => {
    const { code } = this.state;
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  handleSave = () => {
    const { code } = this.state;
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'code.txt');
  };

  toggleLock = () => {
    this.setState((prevState) => ({
      isLocked: !prevState.isLocked,
    }));
  };

  render() {
    const { isLocked, code } = this.state;

    return (
      <div>
        
        <AceEditor className='editor'
          mode="javascript"
          theme="monokai"
          onChange={this.handleChange}
          name="code-editor"
          editorProps={{ $blockScrolling: Infinity }}
          value={code}
          fontSize={14}
          height="400px"
          width="41%"
          readOnly={isLocked}
          
        />
        
        <div>
          <button className='button' onClick={this.handleCopy} disabled={isLocked}>
            Copy
          </button>
          <button className='button' onClick={this.handleSave} disabled={isLocked}>
            Save
          </button>
          <button className='button' onClick={this.toggleLock}>
            {isLocked ? 'Unlock' : 'Lock'}
          </button>
        </div>
      </div>
      
    );
  }
}

export default CodeEditor;
