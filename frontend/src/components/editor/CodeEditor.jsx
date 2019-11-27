import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/theme/solarized_dark';
const ace = require('brace');
const Range = ace.acequire('ace/range').Range;

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineHighlightId: undefined,
    }
  }

  componentDidMount() {
    this.aceEditor.editor.getSession().setMode(this.props.highlighter);
  }

  componentDidUpdate(prevProps) {
    if (this.props.code === '') {
      this.aceEditor.editor.focus();
    }
    if (this.props.isReadOnly) {
      this.aceEditor.editor.renderer.$cursorLayer.element.style.display = "none"
    } else {
      this.aceEditor.editor.renderer.$cursorLayer.element.style.display = "inline-block"
    }
    if (this.props.highlightedLine !== undefined && this.props.highlightedLine !== prevProps.highlightedLine) {
      if (prevProps.highlightedLine !== undefined && this.state.lineHighlightId !== undefined) {
        this.aceEditor.editor.getSession().removeMarker(this.state.lineHighlightId);
      }
      const line = this.props.highlightedLine;
      const lineHighlightId = this.aceEditor.editor.getSession().addMarker(
        new Range(line, 0, line),
        "editorLine--highlighted",
        "fullLine",
        true
      );

      this.setState(({lineHighlightId}));
    }

    if (this.props.highlightedLine === undefined && this.state.lineHighlightId !== undefined) {
      this.aceEditor.editor.getSession().removeMarker(this.state.lineHighlightId);
      this.setState(({lineHighlightId: undefined}));
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
        highlightActiveLine={!this.props.isReadOnly}
      />
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string,
  onChange: PropTypes.func,
  highlighter: PropTypes.object.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  highlightedLine: PropTypes.number,
};

CodeEditor.defaultProps = {
  code: '',
  onChange: null,
  isReadOnly: false,
};
