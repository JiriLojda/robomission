import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/theme/solarized_dark';


export default class CodeEditor extends React.Component {
  componentDidMount() {
    this.aceEditor.editor.getSession().setMode(this.props.highlighter);
  }

  componentDidUpdate() {
    if (this.props.code === '') {
      this.aceEditor.editor.focus();
    }
  }

  render() {
    return (
      <AceEditor
        ref={(ref) => { this.aceEditor = ref; }}
        value={this.props.code}
        onChange={this.props.onChange}
        mode="text"
        theme="solarized_dark"
        fontSize={18}
        focus={true}
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="100%"
        style={{ display: 'inline-block', marginBottom: '-5px' }}
        readOnly={this.props.isReadOnly}
      />
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string,
  onChange: PropTypes.func,
  highlighter: PropTypes.object.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};

CodeEditor.defaultProps = {
  code: '',
  onChange: null,
  isReadOnly: false,
};
